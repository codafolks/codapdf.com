bind = "0.0.0.0:3002"
workers = 4
worker_class = "uvicorn.workers.UvicornWorker"
timeout = 60
keepalive = 5
accesslog = "-"
errorlog = "-"
loglevel = "info"
