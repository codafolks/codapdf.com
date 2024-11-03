import jwt
import os
import requests
from flask import request, make_response
from constants.constants import LICENSE


def validate_authorization():
  auth_header = request.headers.get('Authorization')
  if not auth_header or not auth_header.startswith('Bearer'):
    return make_response('Unauthorized', 401)
  token = auth_header.replace('Bearer ', '')
  if not token:
    return make_response('Unauthorized: No token provided', 401)
  # check with the API if the user is allowed to use the service
  # the api should return the correct license type 
  # if the user is not allowed to use the service, return 401
  ENDPOINT_VALIDATE_TOKEN = os.environ.get('ENDPOINT_VALIDATE_TOKEN')
  response = requests.post(ENDPOINT_VALIDATE_TOKEN, headers={'Authorization': f'Bearer {token}'}).json()
  user_license = response.get('license')
  if user_license not in LICENSE:
    return make_response('Unauthorized: Invalid license', 401)
  try:
    request.user = {
      'license': response.get('license') 
    }
    return None
  except jwt.ExpiredSignatureError:
    return make_response('Unauthorized: Token has expired', 401)
  except jwt.InvalidAudienceError:
    return make_response('Unauthorized: Invalid audience', 401)
  except jwt.InvalidIssuerError:
    return make_response('Unauthorized: Invalid issuer', 401)
  except jwt.InvalidTokenError as e:
    return make_response(f'Unauthorized: Invalid token ({str(e)})', 401)
    
def parse_request_data():
  """
  Parses and validates the JSON data from the request.

  Returns:
    dict: A dictionary containing the parsed data.

  Raises:
    ValueError: If required data is missing or invalid.
  """
  # Parse JSON data from the request body
  data = request.get_json()
  if not data:
      raise ValueError('No JSON data provided')

  html_template = data.get('html')
  if not html_template:
      raise ValueError('No HTML template provided')

  body = data.get('body', {})
  data_variables = body.get('data', {})
    
  return {
    'html_template': html_template,
    'data_variables': data_variables,
  }
