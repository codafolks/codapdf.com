## Welcome to \<CodaPDF />

\<CodaPDF /> is an open-source project that allows users to convert HTML templates to PDF files using an API or web application. The project is built with Python, FastAPI, Next.js, and Playwright. It is still in development, but there’s a production version hosted on [codapdf.com](https://codapdf.com).. Feel free to contribute to the project, and let’s make it better together! :smile:

<hr />
### Project Structure

* [app.codapdf.com](./apps/app.codapdf.com) - The Next.js web application that allows users to sign up, log in, and convert HTML to PDF files.

* [services.codapdf.com](./apps/services.codapdf.com) - The Python app that handles the conversion of web pages to PDF files. It is built with FastAPI and uses the [Playwright](https://pypi.org/project/playwright/1.48.0/) library to convert HTML to PDF files.


### Running the project locally

#### Requirements

* Docker
* Docker-compose
* Python 3.8 or higher
* Node.js 14 or higher
* Bun 2.0 or higher

#### Environment Variables

The apps has its own environment variables and to make it easy to start the project locally, there is `.env.example` file for each app directory. To use the environment variables, copy the `.env.example` file to `.env` and fill in the values. Then, go to the root of the repo abd run the docker-compose command to start the services. The [`docker-compose`](./docker-compose.yaml) will build the images and start the services like:

* Postgres
* Redis
* Storage service 

<hr />

### Running services.codapdf.com
```bash
# Navigate to the services.codapdf.com directory
cd apps/services.codapdf.com

# Create a virtual environment
python3 -m venv .venv

# Activate the virtual environment
source .venv/bin/activate

# Install the dependencies
pip install -r requirements.txt

# Install Playwright browsers
playwright install

# Start the services.codapdf.com app
PYTHONPATH=./src uvicorn src.app:app --reload --port 5000

```
If everything goes well, you should be able to access the services.codapdf.com app at `http://0.0.0.0:5000` in your browser successfully.

Note: Ensure that the database and other services are running via Docker Compose before starting the app.
<hr />

### Running app.codapdf.com

```bash
# Navigate to the app.codapdf.com directory
cd apps/app.codapdf.com

# Install the dependencies
bun install

# Ensure the database is running via Docker Compose
docker-compose up -d

# Migrate the database
bun run migration:run

# Start the app.codapdf.com app
bun run dev
```

If everything goes well, you should be able to access the app.codapdf.com app at `http://localhost:3000` in your browser.
Note: If you haven’t installed Bun, you can install it by following the [official installation guide](https://bun.sh/docs/installation).
<hr />

Troubleshooting

### If you encounter issues, consider the following steps:
* Verify Docker Services:
* Run docker-compose ps to check if all services are up and running.
* Check Environment Variables:
* Ensure all necessary variables are correctly set in your .env files.
* Playwright Installation:
* Confirm that Playwright browsers are installed with playwright install.
* Port Conflicts:
* Make sure ports 5000 and 3000 are not occupied by other applications.
* Review Logs:
* Check the terminal output for any error messages during startup.
