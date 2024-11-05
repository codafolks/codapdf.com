# Use the official Python slim image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

ARG RAILWAY_ENVIRONMENT
ARG DOPPLER_TOKEN

ARG DOPPLER_PROJECT="codapdf"
ARG DOPPLER_CONFIG=${RAILWAY_ENVIRONMENT}_services

# Install necessary tools
RUN apt-get update && apt-get install -y curl

# Install Doppler CLI
RUN curl -Ls https://cli.doppler.com/install.sh | sh



# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
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

# Set working directory
WORKDIR /app


# Upgrade pip
RUN pip install --no-cache-dir --upgrade pip

# Copy requirements.txt first to leverage Docker cache
COPY requirements.txt /app/requirements.txt

# Install virtualenv
RUN pip install virtualenv

# Create a virtual environment in the /venv directory
RUN virtualenv /venv

# Activate the virtual environment and install dependencies
RUN /venv/bin/pip install --upgrade pip \
  && /venv/bin/pip install -r requirements.txt

# Add the virtual environment to the PATH
ENV PATH="/venv/bin:$PATH"

# Install Playwright browsers
RUN playwright install chromium

# Authenticate Doppler and export secrets
RUN doppler -p $DOPPLER_PROJECT -c $DOPPLER_CONFIG secrets download --format env --no-file > .env

# Copy all application code
COPY . /app


# Expose the port Flask is running on
EXPOSE 3001


# Set environment variables
ENV PYTHONPATH=./src
ENV FLASK_APP=src.app
ENV FLASK_ENV=production


# Command to run the Flask app
CMD ["gunicorn", "--bind", "0.0.0.0:3001", "app:app"]