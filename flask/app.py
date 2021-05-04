from flask import request, jsonify
import json, os.path, random, string, hashlib
from werkzeug.utils import secure_filename
from extensions import app
from database import Entry, create_txn, db
import traceback # debug
from settings import IMAGE_FOLDER, IMAGE_EXTENSIONS
from handle import process_new, process_query, process_update, process_delete, process_list

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        return "POST Request"
    elif request.method == "GET":
        return "GET Request"
    
    return "error 422"

@app.route("/create/<string:Name>", methods=["POST"])
def create_entry(Name):
    response = process_new(Name, request.get_json())
    return jsonify(response)

@app.route("/view/<string:Name>", methods=["GET"])
def read_entries(Name):
    response = process_query(Name)
    return jsonify(response)
    
@app.route("/update/<int:Id>", methods=["PUT"])
def update_entry(Id):
    response = process_update(Id, request.get_json())
    return jsonify(response)

@app.route("/delete/<int:Id>/<string:Reason>", methods=["DELETE"])
def delete_entry(Id, Reason):
    response = process_delete(Id, Reason)
    return jsonify(response)

@app.route("/list/", methods=["GET"])
def list_names():
    response = process_list()
    return jsonify(response)

@app.route("/upload/", methods=['POST', 'GET'])
def upload_image():
    if request.method == "POST":
        if 'file' not in request.files:
            return "No file part provided"
        image = request.files['file']
        if image.filename == "":
            return "No file provided"
        if image:
            if os.path.splitext(image.filename)[1][1:] in IMAGE_EXTENSIONS:
                fn = image.filename + "_".join(random.choices(string.ascii_uppercase + string.digits, k=10))
                fn = hashlib.md5(fn.encode()).hexdigest()
                filename = secure_filename(fn + "." + os.path.splitext(image.filename)[1][1:])
                image.save(os.path.join(IMAGE_FOLDER, filename))
                path = os.path.dirname(os.path.abspath(__file__)).replace(chr(92), chr(47)) + chr( 47) + os.path.join(IMAGE_FOLDER, filename)
                return path
        return "Could not upload file"
    else:
        return """<h1>Upload new File</h1><form enctype=multipart/form-data method=post><input type="file" name="file"><input type=submit></form>"""

if __name__ == "__main__":
    app.run()