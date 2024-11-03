import aiohttp
import mimetypes
from utils.logger import logger



async def fetch_image(session: aiohttp.ClientSession, url: str):
  """
  Asynchronously fetches image content from a URL.

  Args:
    session (aiohttp.ClientSession): The HTTP session for making requests.
    url (str): The image URL.

  Returns:
    tuple: (content in bytes, MIME type) or (None, None) on failure.
  """
  try:
    async with session.get(url, timeout=10) as response:
      response.raise_for_status()
      content = await response.read()
      mime_type = response.headers.get('Content-Type')
      if not mime_type or not mime_type.startswith('image/'):
        mime_type, _ = mimetypes.guess_type(url)
        if not mime_type or not mime_type.startswith('image/'):
          logger.warning(f"Could not determine MIME type for '{url}'. Skipping.")
          return None, None
      return content, mime_type
  except Exception as e:
    logger.error(f"Failed to fetch image '{url}': {e}")
    return None, None