import asyncio
from actions.cache_client import cache_client
from utils.logger import logger


async def update_script_tags_with_content(results, script_map, soup):
  """
  Updates <script> tags with fetched JavaScript content and caches the data.

  Args:
    results (list): List of tuples containing script content and error messages.
    script_map (dict): Mapping from script URLs to their corresponding <script> tags.
  """
  cache_tasks = []
  for (content, error), src in zip(results, script_map.keys()):
    script = script_map[src]
    if content and not error:
      # Create a new inline <script> tag using soup
      new_script_tag = soup.new_tag("script")
      new_script_tag.string = content
      script.replace_with(new_script_tag)
      logger.info(f"Replaced external script '{src}' with inline JavaScript content.")
      # Store the JavaScript content in cache with an expiry
      cache_tasks.append(cache_client.set(cache_client.generate_key(src), content))
    else:
      logger.warning(f"Failed to process script '{src}'. Skipping replacement.")
  if cache_tasks:
    try:
      await asyncio.gather(*cache_tasks)
    except Exception as e:
      logger.error(f"Error setting cache: {e} in update_script_tags_with_content")