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
    result = {
        "result_id" : random.randint(10000000, 99999999),
        "full_text" : text,
        "cohesion" : result[0],
        "syntax" : result[1],
        "vocabulary" : result[2],
        "phraseology" : result[3],
        "grammar" : result[4],
        "conventions" : result[5]
        }
    average = {
        "cohesion" : 3.13,
        "syntax" : 3.03,
        "vocabulary" : 3.24,
        "phraseology" : 3.12,
        "grammar" : 3.03,
        "conventions" : 3.08
        }
    returnValue={
        "result" : result,
        "average" : average
        }
    return returnValue
