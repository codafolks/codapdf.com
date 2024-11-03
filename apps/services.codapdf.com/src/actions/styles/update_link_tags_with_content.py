from utils.logger import logger
from actions.cache_client import cache_client
import asyncio

async def update_link_tags_with_content(results, link_map, soup):
  """
  Updates <link> tags with fetched CSS content and caches the data.

  Args:
    results (list): List of tuples containing CSS content and error messages.
    link_map (dict): Mapping from stylesheet URLs to their corresponding <link> tags.
    soup (BeautifulSoup): The BeautifulSoup object for creating new tags.
  """
  
  cache_tasks = []
  for (content, error), href in zip(results, link_map.keys()):
    link = link_map[href]
    if content and not error:
      try:
        # Create a new inline <style> tag using soup
        new_style_tag = soup.new_tag("style")
        new_style_tag.string = content
        link.replace_with(new_style_tag)
        logger.info(f"Replaced external stylesheet '{href}' with inline CSS content.")
        # Store the CSS content in cache with an expiry
        cache_key = cache_client.generate_key(href)
        cache_tasks.append(cache_client.set(cache_key,content))

      except Exception as e:
        logger.error(f"Error replacing link tag for '{href}': {e}")
    else:
        logger.warning(f"Failed to process stylesheet '{href}'. Skipping replacement.")
  if cache_tasks:
    try:
      await asyncio.gather(*cache_tasks)
    except Exception as e:
      logger.error(f"Error setting cache: {e} in update_link_tags_with_content")