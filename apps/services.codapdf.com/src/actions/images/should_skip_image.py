from urllib.parse import urlparse
from utils.logger import logger


def should_skip_image(src: str) -> bool:
  """
  Determines whether an image should be skipped based on its 'src' attribute.

  Args:
    src (str): The 'src' attribute of the <img> tag.

  Returns:
    bool: True if the image should be skipped, False otherwise.
  """
  if not src:
    logger.warning("Found <img> tag without 'src' attribute. Skipping.")
    return True
  if src.startswith('data:'):
    logger.info("Image is already a Base64 data URL. Skipping.")
    return True
  parsed_src = urlparse(src)
  if not parsed_src.scheme or not parsed_src.netloc:
    logger.warning(f"Image with src '{src}' is a relative URL. Skipping as no base_url is provided.")
    return True
  if parsed_src.scheme not in ['http', 'https']:
    logger.warning(f"Image with src '{src}' does not use HTTP/HTTPS scheme. Skipping.")
    return True
  return False