# Use the official Python slim image
FROM python:3.9-slim

ARG DOPPLER_TOKEN
ARG ENVIRONMENT

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Install necessary system dependencies and tools
RUN apt-get update && apt-get install -y --no-install-recommends \
  curl \
  wget \
  gnupg \
  build-essential \
  python3-dev \
  libnss3 \
  libxkbcommon0 \
  libatk-bridge2.0-0 \
  libdrm2 \
  libgbm1 \
  libasound2 \
  libpangocairo-1.0-0 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgtk-3-0 \
  libpango-1.0-0 \
  libcairo2 \
  libxext6 \
  libxfixes3 \
  libxrender1 \
  libxshmfence1 \
  libxtst6 \
  xdg-utils \
  fonts-liberation \
  libfontconfig1 \
  && rm -rf /var/lib/apt/lists/*

# Install Doppler CLI
RUN curl -Ls https://cli.doppler.com/install.sh | sh

# Set working directory
WORKDIR /app

# Copy only requirements.txt first to leverage Docker cache
COPY requirements.txt .

# Upgrade pip and install dependencies
RUN pip install --no-cache-dir --upgrade pip \
  && pip install --no-cache-dir -r requirements.txt

# Install Playwright browsers
RUN playwright install chromium

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (adjust if necessary)
EXPOSE $PORT

# Set environment variables (adjust as needed)
ENV PYTHONPATH=./src
ENV APP_ENV=production

# Command to run the app (adjust based on your app and whether you're using Flask or FastAPI)
CMD ["sh", "-c", "doppler run -p services-codapdf -c ${ENVIRONMENT} -- gunicorn src.app:app --bind 0.0.0.0:$PORT --workers 4 --worker-class uvicorn.workers.UvicornWorker --timeout 300 --graceful-timeout 300 --log-level info"]
