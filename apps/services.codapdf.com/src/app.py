import sys
import os
import threading
from fastapi import FastAPI, Header, Request, Response, HTTPException
from prometheus_client import Counter, Summary, Gauge, REGISTRY

from actions.validate_authorization import validate_authorization;
from actions.parse_request_data import parse_request_data;
from controllers.html_converter_controller import html_converter_controller
from actions.html_pdf_converter import HTMLToPDFConverter
from utils.logger import logger

src_path = os.path.abspath(os.path.dirname(__file__))
sys.path.append(src_path)

REQUEST_COUNTER = Counter('total_requests', 'Total API Requests')
REQUEST_LATENCY = Summary('request_latency_seconds', 'Request latency')
ERROR_COUNTER = Counter('error_requests', 'Total Error Requests')
UNIQUE_USERS = Gauge('unique_users', 'Number of Unique Users')
BANDWIDTH_USED = Counter('bandwidth_used_bytes', 'Total Bandwidth Used')
REQUESTS_PER_SECOND = Counter('requests_per_second', 'Requests per Second')
PEAK_RPS = Gauge('peak_requests_per_second', 'Peak Requests per Second')

def collect_metrics():
  metrics_data = {}
  for metric_family in REGISTRY.collect():
    for sample in metric_family.samples:
      metric_name = sample.name
      metric_value = sample.value
      metrics_data[metric_name] = metric_value
  return metrics_data

converter = HTMLToPDFConverter()
# Define the lifespan function
async def app_lifespan(app: FastAPI):
  """
  Lifespan context manager for startup and shutdown events.
  """
  logger.info("Starting up...")
  await converter.start()  # Start the browser
  yield
  logger.info("Shutting down...")
  await converter.stop()   # 

app = FastAPI(lifespan=app_lifespan)

@app.get('/')
async def index():
  return Response(content='Welcome to the <CodaPDF /> API', media_type='text/html')

@app.get('/api/v1/healthcheck',)
async def healthcheck():
  return Response(content='OK', media_type='text/plain')


@REQUEST_LATENCY.time()
@app.post('/api/v1/html2pdf')
async def html2pdf(request: Request, authorization: str = Header(None)):
  REQUEST_COUNTER.inc()
  REQUESTS_PER_SECOND.inc() 
  payload = await request.json()
  try:
    user_license = validate_authorization(authorization)
    data = parse_request_data(payload)
    response = await html_converter_controller(
      html=data["html_template"],
      data= data["data_variables"],
      user_license=user_license,
      converter=converter
    )
    BANDWIDTH_USED.inc(len(response))
    return response
  except HTTPException as error:
    ERROR_COUNTER.inc()
    return error
  except ValueError as ve:
    ERROR_COUNTER.inc()
    return HTTPException(detail=f'Bad Request: {str(ve)}', status_code=400)
  except Exception as e:
    ERROR_COUNTER.inc()
    return HTTPException(detail=f'Internal Server Error: {str(e)}', status_code=500)
  
@app.get('/metrics')
def metrics():
  metrics_data = collect_metrics()
  return metrics_data

peak_rps_value = 0

def reset_rps_counter():
  global peak_rps_value
  current_rps = REQUESTS_PER_SECOND._value.get()
  if current_rps > peak_rps_value:
    peak_rps_value = current_rps
    PEAK_RPS.set(peak_rps_value)
  REQUESTS_PER_SECOND._value.set(0)
  threading.Timer(1.0, reset_rps_counter).start()
reset_rps_counter()
