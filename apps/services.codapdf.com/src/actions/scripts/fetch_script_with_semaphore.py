
import aiohttp
import asyncio
from actions.scripts.fetch_script import fetch_script
async def fetch_script_with_semaphore(session: aiohttp.ClientSession, url: str, semaphore: asyncio.Semaphore):
  """
  Fetches a script with concurrency control using semaphore.

  Args:
    session (aiohttp.ClientSession): The HTTP session for making requests.
    url (str): The script URL.
    semaphore (asyncio.Semaphore): Semaphore to limit concurrent fetches.

  Returns:
    tuple: (content in str, None) or (None, error message) on failure.
  """
  async with semaphore:
    return await fetch_script(session, url)