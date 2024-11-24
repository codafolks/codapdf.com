import os
import hashlib
import json
import re
from typing import Optional
from utils.logger import logger
from datetime import datetime
class CacheManager:
  def __init__(self, chunk_size=1024):
    self.cache_dir = self.create_cache_folder()
    self.chunk_size = chunk_size
      
  def create_cache_folder(self):
    # Get the root directory of the application
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    folder_name = '.cache'
    # Create the full path of the new folder
    folder_path = os.path.join(root_dir, folder_name)
    
    # Check if the folder already exists, if not, create it
    if not os.path.exists(folder_path):
      os.makedirs(folder_path)
      logger.info(f"Folder '{folder_name}' created at {folder_path}")
    return folder_path

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
    """Saves the content in chunks associated with the key."""
    
    # I am pessimitic, so I will create the cache folder again
    self.cache_dir = self.create_cache_folder()
    
    # Check if the content is already cached
    metadata_filename = f"metadata_{key}.json"
    metadata_path = os.path.join(self.cache_dir, metadata_filename)
    if os.path.exists(metadata_path):
      logger.info(f"Content with key {key} is already cached.")
      return key

    # Break the content into chunks
    chunks = [content[i:i+self.chunk_size] for i in range(0, len(content), self.chunk_size)]
    chunk_filenames = []

    # Save each chunk to a file
    for idx, chunk in enumerate(chunks):
      chunk_hash = hashlib.sha256(chunk.encode('utf-8')).hexdigest()
      chunk_filename = f"chunk_{idx}_{chunk_hash}"
      chunk_path = os.path.join(self.cache_dir, chunk_filename)

      # Write the chunk to a file
      with open(chunk_path, 'w', encoding='utf-8') as f:
        f.write(chunk)
      chunk_filenames.append(chunk_filename)

    # by regex check if the content is a pdf url
    # url: https://www.example.com/pdfs/{uuid}.pdf
    is_pdf_url = False
    if re.match(r"^(http|https)://", content) and content.endswith('.pdf'):
      is_pdf_url = True
      
    # Save metadata to reconstruct the content later
    metadata = {
      'chunk_files': chunk_filenames,
      'created_at': datetime.now().isoformat(),
      'updated_at': datetime.now().isoformat(),
      'content_size': len(content),
      'is_pdf_url': is_pdf_url
    }
    
    with open(metadata_path, 'w', encoding='utf-8') as f:
      json.dump(metadata, f)
    logger.info(f"Content saved with key: {key}")
    return key

  def get(self, key: str) -> Optional[str]:
    """Retrieves the content associated with the key."""
    # Load the metadata file
    metadata_filename = f"metadata_{key}.json"
    metadata_path = os.path.join(self.cache_dir, metadata_filename)
    if not os.path.exists(metadata_path):
      logger.info(f"No content found for key: {key}")
      return None

    with open(metadata_path, 'r', encoding='utf-8') as f:
      metadata = json.load(f)
      # Update the metadata file
      metadata['updated_at'] = datetime.now().isoformat()
      with open(metadata_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f)

    # Reconstruct the content from the chunks
    content = ''
    for chunk_filename in metadata['chunk_files']:
      chunk_path = os.path.join(self.cache_dir, chunk_filename)
      if not os.path.exists(chunk_path):
        logger.info(f"Chunk file {chunk_filename} not found.")
        return None
      with open(chunk_path, 'r', encoding='utf-8') as f:
        chunk = f.read()
        content += chunk
    return content
cache_client = CacheManager()