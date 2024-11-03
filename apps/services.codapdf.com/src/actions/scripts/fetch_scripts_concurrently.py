import asyncio
async def fetch_scripts_concurrently(tasks):
  """
  Fetches scripts concurrently.

  Args:
    session (aiohttp.ClientSession): The HTTP session for making requests.
    tasks (list): List of coroutine tasks to fetch scripts.

  Returns:
    list: Results of fetched scripts.
  """
  return await asyncio.gather(*tasks)
