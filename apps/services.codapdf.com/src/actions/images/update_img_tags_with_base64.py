import base64

from utils.logger import logger
from actions.cache_client import cache_client


def update_img_tags_with_base64(results, img_map):
  """
  Updates <img> tags with Base64 data URLs and caches the data.

  Args:
    results (list): List of tuples containing image content and MIME types.
    img_map (dict): Mapping from image URLs to their corresponding <img> tags.
  """
  
  for (content, mime_type), src in zip(results, img_map.keys()):
    img = img_map[src]
    cache_key = cache_client.generate_key(src)
    if content and mime_type:
      b64_data = base64.b64encode(content).decode('utf-8')
      data_url = f"data:{mime_type};base64,{b64_data}"
      img['src'] = data_url
      logger.info(f"Replaced external image '{src}' with Base64 data URL.")
      # Store the data URL in cache with an expiry
      cache_client.set(cache_key, data_url)
    else:
      logger.warning(f"Failed to process image '{src}'. Skipping replacement.")