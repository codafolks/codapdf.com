from playwright.sync_api import sync_playwright
def convert_html_to_pdf_playwright_sync(rendered_html):
  """
  Converts HTML content to PDF using Playwright synchronously.
  """

  with sync_playwright() as p:
    browser = p.chromium.launch(
      headless=True,
      args=[
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
      ]
    )
    page = browser.new_page()
    page.set_content(rendered_html, wait_until="domcontentloaded")
    page.set_default_navigation_timeout(5000)
    page.set_default_timeout(5000)
    page.emulate_media(media="print")
    default_pdf_options = {
      'format': None,
      'print_background': True,
      'margin': {
        'top': '0',
        'right': '0',
        'bottom': '0',
        'left': '0'
      }
    }
    pdf_bytes = page.pdf(**default_pdf_options)
    browser.close()
    return pdf_bytes
