import aiohttp
from bs4 import BeautifulSoup

from actions.images.process_img_tags import process_img_tags
from actions.images.fetch_images_concurrently import fetch_images_concurrently
from actions.images.update_img_tags_with_base64 import update_img_tags_with_base64


async def replace_external_images_with_base64_async(html: str) -> str:
  """
  Asynchronously replaces all external <img> tag sources in the provided HTML with Base64-encoded data URLs.
  Utilizes DragonflyDB for caching image data to optimize performance.

  Args:
    html (str): The HTML content as a string.

  Returns:
    str: The modified HTML with external images embedded as Base64 data URLs.
  """
  soup = BeautifulSoup(html, 'html.parser')
  img_tags = soup.find_all('img')
  async with aiohttp.ClientSession() as session:
    tasks, img_map = await process_img_tags(img_tags, session)
    if tasks:
      results = await fetch_images_concurrently(tasks)
      update_img_tags_with_base64(results, img_map)
  return str(soup)
