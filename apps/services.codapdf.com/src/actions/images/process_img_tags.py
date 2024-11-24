from utils.logger import logger
from actions.images.fetch_image import fetch_image
from actions.images.should_skip_image import should_skip_image
from actions.cache_client import cache_client


async def process_img_tags(img_tags, session):
  """
  Processes <img> tags to prepare tasks for fetching images.

  Args:
    img_tags (list): List of <img> tags.
    session (aiohttp.ClientSession): The HTTP session for making requests.
  Returns:
    list: List of image URLs to fetch.
    dict: Mapping from image URLs to their corresponding <img> tags.
  """
  tasks = []
  img_map = {}
  for img in img_tags:
    src = img.get('src')
    if should_skip_image(src):
      continue
    cache_key = cache_client.generate_key(src)
    cached_data = cache_client.get(cache_key)
    if cached_data:
      # Cache Hit: Use the cached Base64 data
      data_url = cached_data
      img['src'] = data_url
      logger.info(f"Cache hit for '{src}'. Replaced with cached Base64 data URL.")
      continue  # Move to the next image
    if src not in img_map:
      img_map[src] = img
      tasks.append(fetch_image(session, src))
  return tasks, img_map
