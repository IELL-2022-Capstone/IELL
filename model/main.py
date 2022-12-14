from fastapi import FastAPI
import EnglishEssayModel
import random
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
   CORSMiddleware,
    allow_origins = origins,
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers= ["*"],
)


class Score(BaseModel):
    result_id: int
    full_text: str
    cohesion:float
    syntac:float
    vocabulary:float
    phraseology:float
    grammar:float
    conventions:float

class Text(BaseModel):
    text:str

model = EnglishEssayModel.load_model()

@app.get("/") 
async def root(): 
    return {"message": "Hello World"} 

@app.post("/predict")
async def get_scores(text:Text):
    #predict
    result = EnglishEssayModel.predict(text.text, model)
    returnValue = {
        "resultId" : random.randint(10000000, 99999999),
        "fullText" : text,
        "cohesion" : result[0],
        "syntax" : result[1],
        "vocabulary" : result[2],
        "phraseology" : result[3],
        "grammar" : result[4],
        "conventions" : result[5]
        }
    return returnValue
