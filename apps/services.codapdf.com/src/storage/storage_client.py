import boto3
import os
from utils.logger import logger
class StorageClient:
  def __init__(self, content_type='application/pdf', acl='public-read', directory='pdfs'):
    self.content_type = content_type
    self.acl = acl
    self.directory = directory
    self.bucket_name = None
    self.storage_url_domain = None
    
  def set_directory(self, directory):
    self.directory = directory
    
  def set_content_type(self, content_type):
    self.content_type = content_type

  def set_acl(self, acl):
    self.acl = acl
    
  def check_file_exist(self, filename):
    try:
      client = self.get_client()
      client.head_object(Bucket=self.bucket_name, Key=f"{self.directory}/{filename}")
      logger.info("Object exists.")
      return True
    except Exception as e:
      logger.error(f"Error downloading file: {e}")
      return False
      
  def get_client(self):
    # Retrieve storage configuration from environment variables
    STORAGE_ENDPOINT = os.environ.get('STORAGE_ENDPOINT')  # R2 Endpoint
    STORAGE_ACCESS_KEY_ID = os.environ.get('STORAGE_ACCESS_KEY_ID')
    STORAGE_SECRET_ACCESS_KEY = os.environ.get('STORAGE_SECRET_ACCESS_KEY')
    STORAGE_BUCKET_NAME = os.environ.get('STORAGE_BUCKET_NAME')
    STORAGE_URL_DOMAIN = os.environ.get('STORAGE_URL_DOMAIN')

    if not all([STORAGE_ENDPOINT, STORAGE_ACCESS_KEY_ID,
        STORAGE_SECRET_ACCESS_KEY, STORAGE_BUCKET_NAME, STORAGE_URL_DOMAIN]):
      raise ValueError('Storage configuration is incomplete.')
  
    self.bucket_name = STORAGE_BUCKET_NAME
    self.storage_url_domain = STORAGE_URL_DOMAIN
    # Create a session and client for S3-compatible storage (Cloudflare R2)
    session = boto3.session.Session()
    client = session.client(
      's3',
      endpoint_url=STORAGE_ENDPOINT,
      aws_access_key_id=STORAGE_ACCESS_KEY_ID,
      aws_secret_access_key=STORAGE_SECRET_ACCESS_KEY
    )
    return client
  
  def download_file_string(self, filename):
    try:
      key = f"{self.directory}/{filename}"
      client = self.get_client()
      file_obj = client.get_object(Bucket=self.bucket_name, Key=key)
      return file_obj['Body'].read().decode('utf-8')
    except Exception as e:
      logger.error(f"Error downloading file: {e}")
      return None
  
  def upload_file(self,file, filename):
    key = f"{self.directory}/{filename}"
    try:
      # Upload the file
      client = self.get_client()
      client.upload_fileobj(
        Fileobj=file,
        Bucket=self.bucket_name,
        Key=key,
        ExtraArgs={'ContentType':self.content_type, 'ACL':self.acl}
      )
      file_url = f"{self.storage_url_domain}/{self.directory}/{filename}"
      return file_url
    except Exception as e:
      logger.error(f"Error uploading file: {e}")
      return None
