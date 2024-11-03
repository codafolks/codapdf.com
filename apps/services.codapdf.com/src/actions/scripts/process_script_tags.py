from actions.scripts.should_skip_script import should_skip_script
from actions.cache_client import cache_client
from actions.scripts.fetch_script_with_semaphore import fetch_script_with_semaphore
from utils.logger import logger



async def process_script_tags(script_tags, session, soup, semaphore):
  """
  Processes <script> tags to prepare tasks for fetching scripts.

  Args:
    script_tags (list): List of <script> tags.
    session (aiohttp.ClientSession): The HTTP session for making requests.
  Returns:
    list: List of coroutine tasks to fetch scripts.
    dict: Mapping from script URLs to their corresponding <script> tags.
  """
  
  tasks = []
  script_map = {}
  cached_data = None
  for script in script_tags:
    src = script.get('src')
    if should_skip_script(src):
      continue
    cache_key = cache_client.generate_key(src)
    try:
      cached_data = cache_client.get(cache_key)
    except Exception as e:
      logger.error(f"Error accessing cache for '{src}': {e}")
      cached_data = None
    if cached_data:
      # Cache Hit: Use the cached JavaScript content
      script_content = cached_data
      new_script_tag = soup.new_tag("script")
      new_script_tag.string = script_content
      script.replace_with(new_script_tag)
      logger.info(f"Cache hit for '{src}'. Replaced with cached JavaScript content.")
      continue  # Move to the next script
    if src not in script_map:
      script_map[src] = script
      # Limit concurrent fetches using semaphore
      tasks.append(fetch_script_with_semaphore(session, src, semaphore))
  return tasks, script_map
