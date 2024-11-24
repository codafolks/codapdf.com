from urllib.parse import urlparse
from utils.logger import logger

def should_skip_link(rel: str, href: str) -> bool:
  """
  Determines whether a <link> tag should be skipped based on its 'rel' and 'href' attributes.

  Args:
    rel (str): The 'rel' attribute of the <link> tag.
    href (str): The 'href' attribute of the <link> tag.

  Returns:
    bool: True if the link should be skipped, False otherwise.
  """
  if not href:
    logger.warning("Found <link> tag without 'href' attribute. Skipping.")
    return True
  if rel != 'stylesheet':
    logger.info(f"<link> tag with rel='{rel}' is not a stylesheet. Skipping.")
    return True
  if href.startswith('data:'):
    logger.info(f"<link> tag with href '{href}' is already inline or a data URL. Skipping.")
    return True
  parsed_href = urlparse(href)
  if not parsed_href.scheme or not parsed_href.netloc:
    logger.warning(f"<link> tag with href '{href}' is a relative URL. Skipping as no base_url is provided.")
    return True
  if parsed_href.scheme not in ['http', 'https']:
    logger.warning(f"<link> tag with href '{href}' does not use HTTP/HTTPS scheme. Skipping.")
    return True
  return False
