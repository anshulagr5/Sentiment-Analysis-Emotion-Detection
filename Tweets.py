from pydantic import BaseModel

class Tweet(BaseModel):
  text: str
  model: str