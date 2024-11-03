import asyncio
from actions.images.replace_external_images_with_base64_async import replace_external_images_with_base64_async
from actions.scripts.replace_external_scripts_with_inline_async import replace_external_scripts_with_inline_async
from actions.styles.replace_external_links_with_inline_async import replace_external_links_with_inline_async
from utils.logger import logger

def replace_resources(html: str) -> str:
  """
  Replaces external images, scripts and styles in the HTML with Base64-encoded images, inline scripts and styles respectively.

  Args:
    html (str): The HTML content as a string.
  Returns:
    str: The modified HTML with external images and resources replaced.
  """

  async def run():
    try:
      modified_html = await replace_external_images_with_base64_async(html)
      modified_html = await replace_external_links_with_inline_async(modified_html)
      modified_html = await replace_external_scripts_with_inline_async(modified_html)
      
    except Exception as e:
      logger.error(f"Error replacing resources: {e}")
      modified_html = html
    return modified_html
  return asyncio.run(run())