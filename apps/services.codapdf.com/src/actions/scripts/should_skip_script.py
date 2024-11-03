from urllib.parse import urlparse
from utils.logger import logger

def should_skip_script(src: str) -> bool:
  """
  Determines whether a <script> tag should be skipped based on its 'src' attribute.

  Args:
    src (str): The 'src' attribute of the <script> tag.

  Returns:
    bool: True if the script should be skipped, False otherwise.
  """
  if not src:
    logger.warning("Found <script> tag without 'src' attribute. Skipping.")
    return True
  if src.startswith('data:'):
    logger.info(f"<script> tag with src '{src}' is already inline or a data URL. Skipping.")
    return True
  parsed_src = urlparse(src)
  if not parsed_src.scheme or not parsed_src.netloc:
    logger.warning(f"<script> tag with src '{src}' is a relative URL. Skipping as no base_url is provided.")
    return True
  if parsed_src.scheme not in ['http', 'https']:
    logger.warning(f"<script> tag with src '{src}' does not use HTTP/HTTPS scheme. Skipping.")
    return True
  return False
