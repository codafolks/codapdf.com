from bs4 import BeautifulSoup
import re

def check_for_javascript(html_string):
  """
  This function checks if an HTML string contains any JavaScript code.
  
  Args:
  html_string (str): The HTML content as a string.
  
  Returns:
  bool: True if there is JavaScript code, False otherwise.
  """
  soup = BeautifulSoup(html_string, 'html.parser')
  
  # Check for <script> tags
  script_tags = soup.find_all('script')
  
  # Check for inline JavaScript in event handler attributes
  event_handler_attrs = ['onload', 'onclick', 'onchange', 'onsubmit', 'onmouseover', 'onerror']
  inline_js = False
  for attr in event_handler_attrs:
      if soup.find_all(attrs={attr: True}):
          inline_js = True
          break
  return len(script_tags) > 0 or inline_js
