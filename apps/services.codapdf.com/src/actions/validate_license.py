from flask import make_response
from actions.check_for_javascript import check_for_javascript
from actions.check_for_images import check_for_images

def validate_license(html, user_license):
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
      return make_response('Forbidden: Your license does not support converting HTML with images and JavaScript', 403)
  elif has_javascript:
    if user_license not in ALLOWED_JAVASCRIPT:
      return make_response('Forbidden: Your license does not support converting HTML with JavaScript', 403)
  elif has_images and user_license not in ALLOWED_IMAGES:
    return make_response('Forbidden: Your license does not support converting HTML with images', 403)
  return None