from fastapi import FastAPI
import EnglishEssayModel
from starlette.responses import JSONResponse
import random
from pydantic import BaseModel

app = FastAPI()


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
    
@app.get("/") 
async def root(): 
    return {"message": "Hello World"} 

@app.post("/predict")
async def get_scores(text:Text):
    #predict
    result = EnglishEssayModel.predict(text.text)
    returnValue = {
        "result_id" : random.randint(10000000, 99999999),
        "full_text" : text,
        "cohesion" : result[0],
        "syntax" : result[1],
        "vocabulary" : result[2],
        "phraseology" : result[3],
        "grammar" : result[4],
        "conventions" : result[5]
        }
    return returnValue
