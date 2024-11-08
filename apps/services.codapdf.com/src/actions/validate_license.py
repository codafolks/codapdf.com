from fastapi import HTTPException
from pydantic import BaseModel
from actions.check_for_javascript import check_for_javascript
from actions.check_for_images import check_for_images

class LicenseException(Exception):
  def __init__(self, message: str):
    self.message = message
    super().__init__(self.message)

  
def validate_license(html:str, user_license:str):
  """
    Only users with the 'pro' or 'enterprise' license can convert HTML with images and/or JavaScript.
    The basic license supports plain HTML content without images but not JavaScript.
    The free license only supports plain HTML content without images and JavaScript.
  """

  has_javascript = check_for_javascript(html)
  has_images = check_for_images(html)

  ALLOWED_JAVASCRIPT = ["PRO","ENTERPRISE"]
  ALLOWED_IMAGES = ["PRO","ENTERPRISE","BASIC"]
  ALLOWED_IMAGES_AND_JAVASCRIPT = ["PRO","ENTERPRISE"]

  if has_javascript and has_images:
    if user_license not in ALLOWED_IMAGES_AND_JAVASCRIPT:
      raise LicenseException("Forbidden: Your license does not support converting HTML with images and JavaScript")
  elif has_javascript:
    if user_license not in ALLOWED_JAVASCRIPT:
      raise LicenseException("Forbidden: Your license does not support converting HTML with JavaScript")
  elif has_images and user_license not in ALLOWED_IMAGES:
    raise LicenseException("Forbidden: Your license does not support converting HTML with images")
  