import uuid
import io
from flask import make_response, jsonify, request, render_template_string
from actions.convert_html_to_pdf_playwright_sync import convert_html_to_pdf_playwright_sync
from actions.authorization import parse_request_data, validate_authorization
from actions.validate_license import validate_license
from actions.replace_resources import replace_resources
from actions.minify_html_with_inline import minify_html_with_inline
from actions.cache_client import cache_client
from storage.storage_client import StorageClient
from utils.logger import logger

def html_converter_controller():
    # Validate Authorization header and get user info
  auth_error = validate_authorization()
  if auth_error:
    return auth_error
  user = request.user
  user_license = user.get('license')

  # Parse and validate request data
  try:
    request_data = parse_request_data()
  except ValueError as ve:
    return make_response(f'Bad Request: {str(ve)}', 400)
  
  html_template = request_data['html_template']
  data_variables = request_data['data_variables']
  license_error = validate_license(html_template, user_license)
  if license_error:
    return license_error
  
  # Render the HTML template with data variables
  modified_html = render_template_string(html_template, **data_variables);
  modified_html = minify_html_with_inline(modified_html)
  cache_key = cache_client.generate_key(modified_html)
  cached_pdf_url = cache_client.get(cache_key)
  
  if cached_pdf_url:
    logger.info("Returning cached PDF.")
    response = jsonify({'file_url': cached_pdf_url})
    response.status_code = 200
    return response
  
  modified_html = replace_resources(modified_html)
  
  # Decide which conversion method to use based on license type
  try:
    pdf_bytes = convert_html_to_pdf_playwright_sync(modified_html)
    storage_client = StorageClient()
    # Generate a unique filename
    filename = f"{uuid.uuid4()}.pdf"
    # Upload and get the file URL
    pdf_file = io.BytesIO(pdf_bytes)
    file_url = storage_client.upload_file(pdf_file, filename)
  except Exception as e:
      return make_response(f'Internal Server Error: {str(e)}', 500)
  cache_client.set(cache_key, file_url)
  response = jsonify({'file_url': file_url})
  response.status_code = 200
  return response