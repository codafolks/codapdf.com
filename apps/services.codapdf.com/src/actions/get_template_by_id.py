from storage.storage_client import StorageClient
def get_template_by_id(template_id: str) -> str:
  client = StorageClient(content_type='text/html', directory=f'templates/{template_id}')
  template_content = client.download_file_string("final-template.html")
  if not template_content:
    raise ValueError(f"No template found for ID: {template_id}")
  return template_content
  
  
  
  