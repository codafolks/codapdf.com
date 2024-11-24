from bs4 import BeautifulSoup

def check_for_images(html_string):
  """
  This function checks if an HTML string contains any <img> tags.
  
  Args:
  html_string (str): The HTML content as a string.
  
  Returns:
  bool: True if there are <img> tags, False otherwise.
  """
  soup = BeautifulSoup(html_string, 'html.parser')
  images = soup.find_all('img')
  return len(images) > 0
