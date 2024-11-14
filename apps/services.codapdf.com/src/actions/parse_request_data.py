from pydantic import BaseModel
from actions.get_template_by_id import get_template_by_id
class Result(BaseModel):
  html_template: str
  data_variables: dict
class Payload(BaseModel):
  html: str
  data: dict
  
def parse_request_data(payload: Payload) -> Result:
  """
  Parses and validates the JSON data from the request.

  Returns:
    dict: A dictionary containing the parsed data.

  Raises:
    ValueError: If required data is missing or invalid.
  """
  # Parse JSON data from the request body
  if not payload:
    raise ValueError('No JSON data provided')
  html_template = payload.get('html', '')
  template_id = payload.get('template_id', '')
  
  if template_id:
    html_template = get_template_by_id(template_id)
  if not html_template:
    raise ValueError('No HTML template provided')
  data_variables = payload.get('data', {})
  return {
    'html_template': html_template,
    'data_variables': data_variables,
  }