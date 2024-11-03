import aiohttp
from utils.logger import logger

async def fetch_script(session: aiohttp.ClientSession, url: str):
  """
  Asynchronously fetches JavaScript content from a URL.

  Args:
    session (aiohttp.ClientSession): The HTTP session for making requests.
    url (str): The script URL.

  Returns:
    tuple: (content in str, None) or (None, error message) on failure.
  """
  try:
    async with session.get(url, timeout=10) as response:
      response.raise_for_status()
      content_length = response.headers.get('Content-Length')
      if content_length and int(content_length) > 500000:  # Example threshold: 500KB
        logger.warning(f"Script '{url}' is too large ({content_length} bytes). Skipping.")
        return None, "File too large"
      content = await response.text()
      return content, None
  except Exception as e:
    logger.error(f"Failed to fetch script '{url}': {e}")
    return None, str(e)
