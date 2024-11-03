from playwright.async_api import async_playwright, Error as PlaywrightError
from utils.logger import logger
class HTMLToPDFConverter:
  def __init__(self):
    self.browser = None
    self.playwright = None

  async def start(self):
    """
    Starts the Playwright browser instance.
    """
    if self.playwright is None:
      self.playwright = await async_playwright().start()
    if self.browser is None or self.browser.is_connected():
      self.browser = await self.playwright.chromium.launch(
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
    logger.info("Browser started successfully.")
  async def stop(self):
    """
    Stops the Playwright browser instance.
    """
    if self.browser:
      await self.browser.close()
      logger.info("Browser closed.")
    if self.playwright:
      await self.playwright.stop()
      logger.info("Playwright stopped.")
      
  async def is_open(self):
    if self.browser is None or not self.browser.is_connected():
      return False
    return True
  
  async def convert_html_to_pdf(self, rendered_html):
    """
    Converts HTML content to PDF using a new browser context.
    """
    try:
      # Create a new browser context for each conversion# Check if the browser is connected
      if self.browser is None or self.browser.is_connected():
        logger.info("Browser is not connected. Restarting browser...")
        await self.start()  # Restart the browser
        
      context = await self.browser.new_context()
      page = await context.new_page()
      await page.set_content(rendered_html, wait_until="domcontentloaded")

      # These methods are synchronous; no 'await' needed
      page.set_default_navigation_timeout(5000)
      page.set_default_timeout(5000)
      await page.emulate_media(media="print")

      default_pdf_options = {
        'print_background': True,
        'margin': {
          'top': '0',
          'right': '0',
          'bottom': '0',
          'left': '0'
        }
      }

      pdf_bytes = await page.pdf(**default_pdf_options)
      await page.close()
      await context.close()  # Close the context after conversion
      logger.info("PDF generated successfully.")
      return pdf_bytes
    except PlaywrightError as e:
      logger.error("PDF generation failed.", e)
      raise ValueError(f'PDF generation failed: {e}')
    except Exception as e:
      logger.error("PDF generation failed.", e)
      raise ValueError(f'PDF generation failed: {e}')
