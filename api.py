"""
Name: Main App
Description: Brings all the classes together and hosts the server and handles all requests
Dependencies:
- Flask (The app that runs the server)
- Config (To fetch the url location of the API)
"""
from flask import Flask, request, render_template
from config import api, app

# flask instance
API = Flask(__name__)
API.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@API.route(api['location'])
def index():
    return render_template('index.htm', title=app['name'] + " v" + app['version'])
