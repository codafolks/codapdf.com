import uuid
import io
from fastapi import HTTPException
from jinja2 import Environment, BaseLoader
from pydantic import BaseModel
from actions.validate_license import validate_license
from actions.replace_resources import replace_resources
from actions.minify_html_with_inline import minify_html_with_inline
from actions.cache_client import cache_client
from storage.storage_client import StorageClient
from utils.logger import logger
from actions.html_pdf_converter import HTMLToPDFConverter

env = Environment(loader=BaseLoader())

class Payload(BaseModel):
  html: str
  data: dict
  user_license: str

async def render_template_string(template_string:str, data:dict):
  template = env.from_string(template_string)
  content = template.render(**data)
  return content

async def html_converter_controller(html:str, data: dict, user_license: str, converter: HTMLToPDFConverter):
  try:
    html_template = html;
    data_variables = data
    logger.info(f"html: {html}")
    logger.info(f"data_variables: {data_variables}")
    validate_license(html=html_template, user_license= user_license)
  
    # Render the HTML template with data variables
    modified_html = await render_template_string(html_template, data_variables);
    logger.info(f"modified_html: {modified_html}")
    modified_html = minify_html_with_inline(modified_html)
    cache_key = cache_client.generate_key(modified_html)
    cached_pdf_url = cache_client.get(cache_key)
    
    if cached_pdf_url:
      logger.info("Returning cached PDF.")
      return {
        'file_url': cached_pdf_url,
      }

    modified_html = await replace_resources(modified_html)
    # Decide which conversion method to use based on license type
    
    pdf_bytes = await converter.convert_html_to_pdf(modified_html)
    storage_client = StorageClient()
    # Generate a unique filename
    filename = f"{uuid.uuid4()}.pdf"
    # Upload and get the file URL
    pdf_file = io.BytesIO(pdf_bytes)
    file_url = storage_client.upload_file(pdf_file, filename)
    cache_client.set(cache_key, file_url)
    return {
      'file_url': file_url,
    }
  except Exception as e:
    logger.error("PDF generation failed.", e)
    raise ValueError("PDF generation failed.", e)