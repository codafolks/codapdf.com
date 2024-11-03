import io
import hashlib
from typing import Optional
from utils.logger import logger
from storage.storage_client import StorageClient

class CacheStorage:
  def __init__(self, chunk_size=1024):
    self.chunk_size = chunk_size
    self.storage_client = StorageClient(
      content_type='application/octet-stream',
      directory='.cache'
    )
  def generate_key(self, content: str) -> str:
    """Generates a unique key for the content without saving chunks."""
    # Break the content into chunks
    chunks = [content[i:i+self.chunk_size] for i in range(0, len(content), self.chunk_size)]
    # Generate a hash for each chunk
    chunk_hashes = [hashlib.sha256(chunk.encode('utf-8')).hexdigest() for chunk in chunks]
    # Combine the chunk hashes to create a final key
    combined_hash_input = ''.join(chunk_hashes)
    combined_hash = hashlib.sha256(combined_hash_input.encode('utf-8')).hexdigest()
    return combined_hash

  def set(self, key: str, content: str):
    self.storage_client.upload_file(io.BytesIO(content.encode('utf-8')), key)
    logger.info(f"Content saved with key: {key}")
    return key

  def get(self, key: str) -> Optional[str]:
    file_exist = self.storage_client.check_file_exist(key)
    if not file_exist:
      logger.info(f"No content found for key: {key}")
    content = self.storage_client.download_file_string(key)
    if not content:
      logger.info(f"Error downloading content for key: {key}")
      return None
    logger.info(f"Content found for key: {key} with content: {content}")
    return content
cache_storage = CacheStorage()