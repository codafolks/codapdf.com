import psycopg2
import os
from utils.logger import logger
from dotenv import load_dotenv
load_dotenv()

def insert_api_metric(data):
    db_url = os.getenv('DATABASE_URL')
    if not db_url:
      raise ValueError("DATABASE_URL environment variable is not set")
    
    insert_query = '''
    INSERT INTO public."apiMetrics" (
      "userId" , 
      "endpoint" , 
      "responseTimeMs", 
      "statusCode", 
      "dataTransferredBytes", 
      "error"
    )
    VALUES (%s, %s, %s, %s, %s, %s)
    '''
    try:
      conn = psycopg2.connect(db_url)
      cursor = conn.cursor()
      cursor.execute(insert_query, (
        int(data.get('userId')),
        data.get('endpoint'),
        data.get('responseTimeMs'),
        data.get('statusCode'),
        data.get('dataTransferredBytes'),
        data.get('error')
      ))
      conn.commit()
      logger.info("Metric inserted successfully.")

    except (Exception, psycopg2.DatabaseError) as error:
      logger.error(f"Error while inserting metric: {error}")
      conn.rollback()
    finally:
      if conn:
        cursor.close()
        conn.close()
