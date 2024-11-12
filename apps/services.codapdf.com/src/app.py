import sys
import os
import threading
import time
import asyncpg
from fastapi import FastAPI, Header, Request, Response, HTTPException
from prometheus_client import Counter, Summary, generate_latest, Gauge, REGISTRY, CONTENT_TYPE_LATEST

from actions.validate_authorization import validate_authorization;
from actions.parse_request_data import parse_request_data;
from controllers.html_converter_controller import html_converter_controller
from actions.html_pdf_converter import HTMLToPDFConverter
from utils.logger import logger
from actions.insert_api_metric import insert_api_metric
src_path = os.path.abspath(os.path.dirname(__file__))
sys.path.append(src_path)

REQUEST_COUNTER = Counter('total_requests', 'Total API Requests',['userId'])
REQUEST_LATENCY = Summary('request_latency_seconds', 'Request latency',['userId'])
ERROR_COUNTER = Counter('error_requests', 'Total Error Requests',['userId'])
BANDWIDTH_USED = Counter('bandwidth_used_bytes', 'Total Bandwidth Used',['userId'])
REQUESTS_PER_SECOND = Counter('requests_per_second', 'Requests per Second',['userId'])
PEAK_RPS = Gauge('peak_requests_per_second', 'Peak Requests per Second',['userId'])
UNIQUE_USERS = Gauge('unique_users', 'Number of Unique Users')

converter = HTMLToPDFConverter()
unique_users_set = set()
unique_users_lock = threading.Lock()
db_pool = None

# Define the lifespan function
async def app_lifespan(app: FastAPI):
  """ 
  Lifespan context manager for startup and shutdown events.
  """
  global db_pool
  logger.info("Starting up...")
  await converter.start()  # Start the browser

  # Initialize the database pool
  db_url = os.getenv('DATABASE_URL')
  if not db_url:
    raise ValueError("DATABASE_URL environment variable is not set")
  db_pool = await asyncpg.create_pool(dsn=db_url)
  logger.info("Database connection pool created.")
  yield
  logger.info("Shutting down...")
  await converter.stop()   # Stop the browser
  await db_pool.close()
  logger.info("Database connection pool closed.")
app = FastAPI(lifespan=app_lifespan)

@app.post('/api/v1/html2pdf')
async def html2pdf(request: Request, authorization: str = Header(None)):
  start_time = time.time()  # Start timing
  userId = 'anonymous'  # Default userId
  try:
    payload = await request.json()
    auth = validate_authorization(authorization)
    user_license = auth['license']
    
    # The userId is used as a label for the metrics
    userId = auth['userId']
    # Increment the total requests counter
    REQUEST_COUNTER.labels(userId=userId).inc()
    
    # Track unique users
    with unique_users_lock:
      if userId not in unique_users_set:
        unique_users_set.add(userId)
        UNIQUE_USERS.set(len(unique_users_set))
        
    data = parse_request_data(payload)
    response = await html_converter_controller(
      html=data["html_template"],
      data= data["data_variables"],
      user_license=user_license,
      converter=converter
    )
    response_size = response.get('pdf_size')
    
    # Calculate response time
    response_time = time.time() - start_time
    REQUEST_LATENCY.labels(userId=userId).observe(response_time)
    
    # Increment bandwidth used
    response_size = response.get('pdf_size')
    BANDWIDTH_USED.labels(userId=userId).inc(response_size)
  
    # Insert metrics into the database
    metric_data = {
      'userId': userId,
      'endpoint': request.url.path,
      'responseTimeMs': response_time * 1000,  # Convert to milliseconds
      'statusCode': 200,  # Success status code
      'dataTransferredBytes': response_size,
      'error': False
    }
    
    logger.info(f"metric_data: {metric_data}")
   
    insert_api_metric(metric_data)
    return response
  except HTTPException as error:
    # Increment error counter
    ERROR_COUNTER.labels(userId=userId).inc()
    response_time = time.time() - start_time
    REQUEST_LATENCY.labels(userId=userId).observe(response_time)

    # Insert error metrics into the database
    metric_data = {
      'userId': userId,
      'endpoint': request.url.path,
      'responseTimeMs': response_time * 1000,
      'statusCode': error.status_code,
      'dataTransferredBytes': 0,
      'error': True
    }
    insert_api_metric(metric_data)
    return error
  except ValueError as ve:
    # Increment error counter
    ERROR_COUNTER.labels(userId=userId).inc()
    response_time = time.time() - start_time
    REQUEST_LATENCY.labels(userId=userId).observe(response_time)
    # Insert error metrics into the database
    metric_data = {
      'userId': userId,
      'endpoint': request.url.path,
      'responseTimeMs': response_time * 1000,
      'statusCode': 400,
      'dataTransferredBytes': 0,
      'error': True
    }
    insert_api_metric(metric_data)
    return HTTPException(detail=f'Bad Request: {str(ve)}', status_code=400)
  except Exception as e:
  # Increment error counter
    ERROR_COUNTER.labels(userId=userId).inc()
    response_time = time.time() - start_time
    REQUEST_LATENCY.labels(userId=userId).observe(response_time)

    # Insert error metrics into the database
    metric_data = {
      'user_id': userId,
      'endpoint': request.url.path,
      'responseTimeMs': response_time * 1000,
      'statusCode': 500,
      'dataTransferredBytes': 0,
      'error': True
    }
    insert_api_metric(metric_data)
    return HTTPException(detail=f'Internal Server Error: {str(e)}', status_code=500)
  
