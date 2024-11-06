from pydantic import BaseModel
from typing import Coroutine, Any

class ParseResult(BaseModel):
  html_template: str
  data_variables: dict

def parse_request_data(payload: Coroutine[Any, Any, Any]) -> ParseResult:
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
  if not html_template:
    raise ValueError('No HTML template provided')
  data_variables = payload.get('data', {})
  return {
    'html_template': html_template,
    'data_variables': data_variables,
  }