import asyncio
import uuid
import io
from jinja2 import Environment, BaseLoader

from actions.convert_html_to_pdf_playwright_async import convert_html_to_pdf_playwright_async
from actions.validate_license import validate_license
from actions.replace_resources import replace_resources
from actions.minify_html_with_inline import minify_html_with_inline
from actions.cache_client import cache_client
from storage.storage_client import StorageClient
from utils.logger import logger

env = Environment(loader=BaseLoader())

async def render_template_string(template_string:str, data:dict):
  template = env.from_string(template_string)
  content = template.render(**data)
  return content

async def html_converter_controller(request_data:dict, user_license:str):
  
  html_template = request_data['html_template']
  data_variables = request_data['data_variables']
  validate_license(html_template, user_license)

  # Render the HTML template with data variables
  modified_html = await render_template_string(html_template, data_variables);
  modified_html = minify_html_with_inline(modified_html)
  cache_key = cache_client.generate_key(modified_html)
  cached_pdf_url = cache_client.get(cache_key)
  
  if cached_pdf_url:
    logger.info("Returning cached PDF.")
    return {
      'file_url': cached_pdf_url,
      'status_code': 200
    }
  
  modified_html = await replace_resources(modified_html)
  # Decide which conversion method to use based on license type
  
  pdf_bytes = await convert_html_to_pdf_playwright_async(modified_html)
  storage_client = StorageClient()
  # Generate a unique filename
  filename = f"{uuid.uuid4()}.pdf"
  # Upload and get the file URL
  pdf_file = io.BytesIO(pdf_bytes)
  file_url = storage_client.upload_file(pdf_file, filename)

  cache_client.set(cache_key, file_url)
  return {
    'file_url': file_url,
    'status_code': 200
  }