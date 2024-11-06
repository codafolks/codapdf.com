import sys
import os

src_path = os.path.abspath(os.path.dirname(__file__))
sys.path.append(src_path)

from flask import Flask, request
from flask_caching import Cache

from controllers.html_converter_controller import html_converter_controller

config = {
  "DEBUG": False,
  "CACHE_TYPE": "SimpleCache",  # Flask-Caching related configs
  "CACHE_DEFAULT_TIMEOUT": 300
}

app = Flask(__name__)

# tell Flask to use the above defined config
app.config.from_mapping(config)
cache = Cache(app)
def make_cache_key():
  """
    A function which is called to derive the key for a computed value.
    The key in this case is the concat value of all the json request
    parameters. Other strategy could to use any hashing function.
    :returns: unique string for which the value should be cached.
  """
  user_data = request.get_json()
  return ",".join([f"{key}={value}" for key, value in user_data.items()])

@app.route('/', methods=['GET'])
def index():
  return "How are you doing?"

@app.route('/api/v1/healthcheck', methods=['GET'])
def healthcheck():
  return "I'm alive"

@app.route('/api/v1/html2pdf', methods=['POST'])
@cache.cached(timeout=5, make_cache_key=make_cache_key)
def html2pdf():
  return html_converter_controller()
