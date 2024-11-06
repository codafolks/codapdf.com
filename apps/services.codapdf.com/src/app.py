import sys
import os
from actions.validate_authorization import validate_authorization;
from actions.parse_request_data import parse_request_data;

src_path = os.path.abspath(os.path.dirname(__file__))
sys.path.append(src_path)


from fastapi import FastAPI, Header, Request, HTTPException
from prometheus_client import make_asgi_app 
from controllers.html_converter_controller import html_converter_controller


app = FastAPI()

@app.get('/')
async def index():
  return "How are you doing?"

@app.get('/api/v1/healthcheck',)
async def healthcheck():
  return "I'm alive"

@app.post('/api/v1/html2pdf')
async def html2pdf(request: Request, authorization: str = Header(None)):
  payload = await request.json()
  try:
    user_license = validate_authorization(authorization)
    request_data = parse_request_data(payload)
    result = await html_converter_controller(request_data,user_license)
    return result
  except HTTPException as error:
    return error
  except ValueError as ve:
    return HTTPException(detail=f'Bad Request: {str(ve)}', status_code=400)
  

# Using multiprocess collector for registry
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)