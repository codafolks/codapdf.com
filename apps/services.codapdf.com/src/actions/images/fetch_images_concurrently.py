import asyncio
async def fetch_images_concurrently(tasks):
  """
  Fetches images concurrently.

  Args:
    session (aiohttp.ClientSession): The HTTP session for making requests.
    tasks (list): List of coroutine tasks to fetch images.

  Returns:
    list: Results of fetched images.
  """
  return await asyncio.gather(*tasks)
