"""
Name: Main App
Description: Brings all the classes together and hosts the server and handles all requests
Dependencies:
- Flask (The app that runs the server)
- Config (To fetch the url location of the API)
"""
from flask import Flask, request, render_template
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os.path, hashlib, random, string
from config import api, app, database

API = Flask(__name__)
API.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# CORS bypass
bypassees = app['cors-bypass']
CORS(API, resources={r"/*": bypassees})

# routes
@API.route(api['location'])
def index():
    return render_template('index.htm', title=app['name'] + " v" + app['version'])

from handler import data_new, data_request, list_names

@API.route(api['location'] + "<Model>/<Name>", methods=['GET', 'POST'])
def handle_data(Model, Name):
    
    if request.method == "POST":
        return data_new(Model, Name, request.get_json())
    elif request.method == "GET":
        return data_request(Model, Name)
    else:
        return "405"

@API.route(api['location'] + "<Model>/list", methods=['GET'])
def list_model_names(Model):
    return list_names(Model)

@API.route(api['location'] + "upload", methods=['POST'])
def upload_image():
    
    UPLOAD_FOLDER = 'static/media/pictures'
    ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
    if 'file' not in request.files:
        print('No file part')
    file = request.files['file']
    if file.filename == '':
        print('No selected file')
    if file:
        if os.path.splitext(file.filename)[1][1:] in ALLOWED_EXTENSIONS:
           fn = file.filename + "_".join(random.choices(string.ascii_uppercase + string.digits, k=10))
           fn = hashlib.md5(fn.encode()).hexdigest()
           filename = secure_filename(fn + "." + os.path.splitext(file.filename)[1][1:])
           file.save(os.path.join(UPLOAD_FOLDER, filename))
           path = os.path.dirname(os.path.abspath(__file__)).replace(chr(92), chr(47)) + chr( 47) + os.path.join(UPLOAD_FOLDER, filename)
           return path
    
    return "Could not upload file"
    # return """<h1>Upload new File</h1><form enctype=multipart/form-data method=post><input type="file" name="file"> <input type=submit></form>"""