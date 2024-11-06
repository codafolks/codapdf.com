from playwright.async_api import async_playwright, Error as PlaywrightError

async def convert_html_to_pdf_playwright_async(rendered_html):
    """
    Converts HTML content to PDF using Playwright asynchronously.
    """
    try:
      async with async_playwright() as p:
        browser = await p.chromium.launch(
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
        page = await browser.new_page()
        await page.set_content(rendered_html, wait_until="domcontentloaded")

        # These methods are synchronous; remove 'await'
        page.set_default_navigation_timeout(5000)
        page.set_default_timeout(5000)
        # For some reason, the 'emulate_media' we need to await it
        await page.emulate_media(media="print")

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

        # This method is asynchronous; add 'await'
        pdf_bytes = await page.pdf(**default_pdf_options)

        await browser.close()
        print("PDF generated successfully.")
        return pdf_bytes
    except PlaywrightError as e:
      print("PDF generation failed.", e)
      raise ValueError(f'PDF generation failed: {e}')
    except Exception as e:
      print("PDF generation failed.", e)
      raise ValueError(f'PDF generation failed: {e}')
