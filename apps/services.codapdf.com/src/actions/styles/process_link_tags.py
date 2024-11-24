from actions.styles.fetch_stylesheet_with_semaphore import fetch_stylesheet_with_semaphore
from actions.styles.should_skip_link import should_skip_link
from actions.cache_client import cache_client
from utils.logger import logger

async def process_link_tags(link_tags, soup, semaphore):
  """
  Processes <link> tags to prepare tasks for fetching stylesheets.

  Args:
    link_tags (list): List of <link> tags.
    session (aiohttp.ClientSession): The HTTP session for making requests.
    soup (BeautifulSoup): The BeautifulSoup object for creating new tags.
    semaphore (asyncio.Semaphore): Semaphore to limit concurrent fetches.

  Returns:
    list: List of coroutine tasks to fetch stylesheets.
    dict: Mapping from stylesheet URLs to their corresponding <link> tags.
  """
  tasks = []
  link_map = {}
  for link in link_tags:
    rel, href = get_rel_and_href(link)
    if should_skip_link(rel, href):
      continue
    cache_key = cache_client.generate_key(href)
    cached_data = cache_client.get(cache_key)
    if cached_data:
      replace_with_cached_css(soup, link, cached_data, href)
      continue  # Move to the next link
    if href not in link_map:
      link_map[href] = link
      # Limit concurrent fetches using semaphore
      tasks.append(fetch_stylesheet_with_semaphore(href, semaphore))
  return tasks, link_map

def get_rel_and_href(link):
  rel = link.get('rel')
  href = link.get('href')
  if not rel:
    rel = ''
  if isinstance(rel, list):
    rel = ' '.join(rel)
  return rel, href

def get_cached_data(cache_key, href):
  try:
    cached_data = cache_client.get(cache_key)
  except Exception as e:
    logger.error(f"Error accessing cache for '{href}': {e}")
    cached_data = None
  return cached_data

def replace_with_cached_css(soup, link, cached_data, href):
  try:
    css_content = cached_data
    new_style_tag = soup.new_tag("style")
    new_style_tag.string = css_content
    link.replace_with(new_style_tag)
    logger.info(f"Cache hit for '{href}'. Replaced with cached CSS content.")
  except Exception as e:
    logger.error(f"Error decoding cached data for '{href}': {e}")