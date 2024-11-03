# Configure logging at the beginning of your script
import os
import logging
import logging.handlers
# Configure logging with rotation
logger = logging.getLogger()
logger.setLevel(logging.INFO)

ENVIRONMENT = os.environ.get('ENVIRONMENT', 'development')
if ENVIRONMENT != 'production':
  handler = logging.handlers.RotatingFileHandler('logs.log', maxBytes=100000, backupCount=5)
  formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
  handler.setFormatter(formatter)

  logger.addHandler(handler)
  logger.addHandler(logging.StreamHandler())
