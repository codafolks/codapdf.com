
import aiohttp
import asyncio
from actions.styles.fetch_stylesheet import fetch_stylesheet
async def fetch_stylesheet_with_semaphore(session: aiohttp.ClientSession, url: str, semaphore: asyncio.Semaphore):
  """
  Fetches a stylesheet with concurrency control using semaphore.

  Args:
    session (aiohttp.ClientSession): The HTTP session for making requests.
    url (str): The stylesheet URL.
    semaphore (asyncio.Semaphore): Semaphore to limit concurrent fetches.

  Returns:
    tuple: (content in str, None) or (None, error message) on failure.
  """
  async with semaphore:
    return await fetch_stylesheet(session, url)