import asyncio
import aiohttp
from bs4 import BeautifulSoup

from actions.styles.process_link_tags import process_link_tags
from actions.styles.update_link_tags_with_content import update_link_tags_with_content
from actions.styles.fetch_stylesheets_concurrently import fetch_stylesheets_concurrently


async def replace_external_links_with_inline_async(html: str) -> str:
  """
  Asynchronously replaces all external <link rel="stylesheet"> tag hrefs in the provided HTML with inline CSS content.
  Utilizes DragonflyDB for caching CSS data to optimize performance.

  Args:
    html (str): The HTML content as a string.
  Returns:
    str: The modified HTML with external stylesheets embedded as inline CSS.
  """
  soup = BeautifulSoup(html, 'html.parser')
  link_tags = soup.find_all('link', rel='stylesheet')
  
  # Initialize a semaphore to limit concurrent fetches (e.g., max 5)
  semaphore = asyncio.Semaphore(5)
  async with aiohttp.ClientSession() as session:
    tasks, link_map = await process_link_tags(link_tags, soup, semaphore)
    if tasks:
      results = await fetch_stylesheets_concurrently(tasks)
      await update_link_tags_with_content(results, link_map, soup)
  return str(soup)