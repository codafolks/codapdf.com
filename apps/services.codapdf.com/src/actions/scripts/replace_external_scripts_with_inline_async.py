import asyncio
import aiohttp
from bs4 import BeautifulSoup

from actions.scripts.process_script_tags import process_script_tags
from actions.scripts.fetch_scripts_concurrently import fetch_scripts_concurrently
from actions.scripts.update_script_tags_with_content import update_script_tags_with_content

async def replace_external_scripts_with_inline_async(html: str) -> str:
  """
  Asynchronously replaces all external <script> tag sources in the provided HTML with inline JavaScript content.
  Utilizes DragonflyDB for caching script data to optimize performance.

  Args:
      html (str): The HTML content as a string.
      cache_client (redis_asyncio.Redis): Redis (DragonflyDB) client instance for caching.
      cache_expiry (int, optional): Time-to-live for cached items in seconds. Defaults to 86400 (24 hours).

  Returns:
      str: The modified HTML with external scripts embedded as inline JavaScript.
  """
  soup = BeautifulSoup(html, 'html.parser')
  script_tags = soup.find_all('script')
  # Initialize a semaphore to limit concurrent fetches (e.g., max 5)
  semaphore = asyncio.Semaphore(5)
  async with aiohttp.ClientSession() as session:
    tasks, script_map = await process_script_tags(script_tags, session, soup, semaphore)
    if tasks:
      results = await fetch_scripts_concurrently(tasks)
      await update_script_tags_with_content(results, script_map, soup)
  return str(soup)
