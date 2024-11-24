import asyncio
async def fetch_stylesheets_concurrently(tasks):
  """
  Fetches stylesheets concurrently.

  Args:
    session (aiohttp.ClientSession): The HTTP session for making requests.
    tasks (list): List of coroutine tasks to fetch stylesheets.

  Returns:
    list: Results of fetched stylesheets.
  """
  return await asyncio.gather(*tasks)