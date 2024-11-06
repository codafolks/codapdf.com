import jwt
import os
import requests
from fastapi import HTTPException
from constants.constants import LICENSE
from dotenv import load_dotenv
# Load .env file if it exists
load_dotenv()

def validate_authorization(authorization: str):
  if not authorization.startswith("Bearer "):
      raise HTTPException(status_code=401, detail="Invalid authorization header format")
  token = authorization.split("Bearer ")[1]
  if not token:
    raise HTTPException(status_code=401, detail="No token provided")
  # check with the API if the user is allowed to use the service
  # the api should return the correct license type 
  # if the user is not allowed to use the service, return 401
  ENDPOINT_VALIDATE_TOKEN=os.environ.get('ENDPOINT_VALIDATE_TOKEN')
  response = requests.post(ENDPOINT_VALIDATE_TOKEN, headers={'Authorization': f'Bearer {token}'}).json()
  user_license = response.get('license')
  if user_license not in LICENSE:
    raise HTTPException(detail='Unauthorized: Invalid license')
  return user_license
 
    

