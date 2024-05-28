import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pandas as pd
import pickle
from Tweets import Tweet

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

model = pickle.load(open("models/stack1.pkl", 'rb'))

@app.get('/')
def sentiment_analysis():
  return {
  	'result': 'Hello World' 
  }

@app.post('/predict')
def sentiment_analysis(data:Tweet):
  data = data.dict()
  # print(data)
  text = data['text']
  # model = data['model']
  print(text)
  # print(model)
  prediction = model.predict([text])
  print(prediction)
  labels = ['anger', 'disgust', 'fear', 'guilt', 'joy', 'love', 'sadness', 'shame', 'surprise']
  return {
    'prediction': labels[prediction[0]]
  }

if __name__ == '__main__':
  uvicorn.run(app, host='127.0.0.1', port=8000)


