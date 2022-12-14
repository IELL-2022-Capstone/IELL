import torch
from torch.utils.data import Dataset, DataLoader, random_split, SubsetRandomSampler
import numpy as np
import pandas as pd
from transformers import AutoTokenizer, AutoModel, AutoConfig
import re
import tqdm
from sklearn.model_selection import KFold

device = (torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu"))

class EnglishDataset(Dataset):
    def __init__(self, file_name):
        text_df = pd.read_csv(file_name)
        
        self.x = text_df.iloc[:, 1].values
        self.y = text_df.iloc[:, 2:].values
        self.n_samples = self.x.shape[0]
        
        self.x = preprocessing(self.x)
        self.tokenized = tokenize_text(self.x)
        
    def __getitem__(self, index):
        inputs = {
            "input_ids": torch.tensor(self.tokenized[index]["input_ids"], dtype=torch.long, device=device),
            "attention_mask": torch.tensor(self.tokenized[index]["attention_mask"], dtype=torch.long, device=device)
        }
        targets = torch.tensor(self.y[index], dtype=torch.float32)
        return inputs, targets
    
    def __len__(self):
        return self.n_samples

def preprocessing(text):
    result = []
    for content in text:
        content = re.sub(r"\n"," ", content)
        # 틀린 문법도 포함해야하므로 전처리 끝
        result.append(content)
    return result
    
def tokenize_text(text):
    tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
    tokenized_text = []
    for content in text:
        tokenized = tokenizer.encode_plus(content,
                                          add_special_tokens=True,
                                          padding="max_length",
                                          truncation=True,
                                          max_length=512,
                                          return_attention_mask=True)
        tokenized_text.append(tokenized)
    return tokenized_text

class MeanPooling(torch.nn.Module):
    def __init__(self):
        super(MeanPooling, self).__init__()
  
    def forward(self, last_hidden_state, attention_mask):
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(last_hidden_state.size()).float()
        sum_embeddings = torch.sum(last_hidden_state * input_mask_expanded, dim=1)
        sum_mask = input_mask_expanded.sum(1)
        sum_mask = torch.clamp(sum_mask, min=1e-9)
        mean_embeddings = sum_embeddings / sum_mask
        return mean_embeddings

class DeBERTaClass(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.deberta_config = AutoConfig.from_pretrained("microsoft/deberta-v3-base")
        self.deberta_config.update(
            {
                "hidden_dropout": 0.,
                "hidden_dropout_prob": 0.,
                "attention_dropout": 0.,
                "attention_probs_dropout_prob": 0,
                "add_pooling_layer": False,
                "output_hidden_states": True,
            })
        self.deberta = AutoModel.from_pretrained("microsoft/deberta-v3-base", config=self.deberta_config)
        self.mean_pooling = MeanPooling()
        self.linear = torch.nn.Linear(self.deberta.config.hidden_size, 6)
        
    def forward(self, inputs):
        deberta_output = self.deberta(**inputs)
        outputs = self.mean_pooling(deberta_output['last_hidden_state'], inputs['attention_mask'])
        outputs = self.linear(outputs)
        return outputs

def RMSE(labels, preds):
    colwise_rmse = torch.sqrt(torch.mean((labels.to(device) - preds.to(device)) ** 2, dim=0)).to(device)
    mean_rmse = torch.mean(colwise_rmse).to(device)
    return colwise_rmse, mean_rmse

def train():
    dataset = EnglishDataset("train.csv")
    splits = KFold(n_splits=5, shuffle=True, random_state=42)

    #hyperparams
    epochs = 10
    lr = 1e-5

    #training
    n_total_steps = len(dataset)
    train_loss = []
    valid_loss = []
    
    for fold, (train_index, valid_index) in enumerate(splits.split(np.arange(len(dataset)))):

        model = DeBERTaClass().to(device)

        train_sampler = SubsetRandomSampler(train_index)
        valid_sampler = SubsetRandomSampler(valid_index)

        dataloader = DataLoader(dataset, batch_size=8, sampler=train_sampler)
        valid_dataloader = DataLoader(dataset, batch_size=8, sampler=valid_sampler)
        
        # loss, optimizer
        loss_fn = torch.nn.SmoothL1Loss(reduction="mean")
        optimizer = torch.optim.AdamW(model.parameters(), lr=lr)
        train_loss.append([])
        valid_loss.append(torch.tensor([0., 0., 0., 0., 0., 0.], device=device))
        valid_loss_sum = []
        
        for epoch in range(epochs):
            progress = tqdm.tqdm(dataloader, total=len(dataloader))
            for i, (inputs, targets) in enumerate(progress): 
                #forward
                outputs = model(inputs).to(device)
                loss = loss_fn(outputs, targets.to(device)) # dim=(1, 6), 1
                train_loss[fold].append(loss)
                                
                #backward
                loss.backward()
                optimizer.step()
                optimizer.zero_grad()

                del inputs, targets, outputs, loss
            
            # validate
            with torch.no_grad():
                val_loss_sum = 0
                valid_progress = tqdm.tqdm(valid_dataloader, total=len(valid_dataloader))
                for i, (inputs, targets) in enumerate(valid_progress):
                    outputs = model(inputs).to(device)
                    
                    colwise_loss, loss = RMSE(outputs, targets) # dim=(1, 6), 1
                    valid_loss[fold] += colwise_loss
                    val_loss_sum += loss
                    
                    del inputs, targets, outputs, loss

            print(f"epoch {epoch+1} / {epochs}, train loss = {sum(train_loss[fold]) / (len(dataloader) * (epoch + 1))}")
            print(f"epoch {epoch+1} / {epochs}, valid loss = {valid_loss[fold] / (len(valid_dataloader) * (epoch + 1))}")

            if ((epoch != 0) and (valid_loss_sum[-1] < val_loss_sum)):
                break
            else:
                valid_loss_sum.append(val_loss_sum)
                torch.save(model.state_dict(), f"checkpoint_{fold}_{epoch}.pth")

        # fold 별 loss
        print(f"fold: {fold}, train loss={sum(train_loss[fold]) / (len(dataloader) * 2)}, validation loss={valid_loss[fold] / (len(valid_dataloader) * 2)}")
    
    #torch.save(model.state_dict(), "trained_weights.pth")

def predict(text):
    model = DeBERTaClass()
    model.load_state_dict(torch.load("checkpoint_2_5.pth", map_location=torch.device('cpu')))
    text = preprocessing([text])
    tokenized = tokenize_text(text)

    inputs = {
        "input_ids": torch.tensor([tokenized[0]["input_ids"]], dtype=torch.long, device=device),
        "token_type_ids": torch.tensor([tokenized[0]["token_type_ids"]], dtype=torch.long, device=device),
        "attention_mask": torch.tensor([tokenized[0]["attention_mask"]], dtype=torch.long, device=device)
        }
    result = model(inputs)

    return result[0].tolist()

#if __name__ == "__main__":
    #torch.multiprocessing.set_start_method('spawn')

    #train()
