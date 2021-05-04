from flask import request, jsonify
import json, os.path, random, string, hashlib
from werkzeug.utils import secure_filename
from extensions import app
from database import Entry, create_txn, db
import traceback # debug
from settings import IMAGE_FOLDER, IMAGE_EXTENSIONS
from handle import process_new

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
    return response

@app.route("/view/<string:Name>", methods=["GET"])
def read_entries(Name):
    result = []
    entries = Entry.query.filter_by(name=Name).all()

    for entry in entries:
        x = {
            "id": entry.id,
            "name": entry.name,
            "description": entry.description
        }
        result.append(x)
    
    return jsonify(result)
    
@app.route("/update/<int:Id>", methods=["PUT"])
def update_entry(Id):
    body = request.get_json()

    try:
        entry = Entry.query.filter(Entry.id == Id).first()
        entry.name = body['name']
        entry.description = body['description']
        db.session.flush()
        db.session.commit()
        
        return "Updated Entry #" + str(Id)
    except:
        return "Could not update values for Entry #" + str(Id)
    
    return "error 422"

@app.route("/delete/<int:Id>", methods=["DELETE"])
def delete_entry(Id):

    try:
        Entry.query.filter_by(id=Id).delete()
        db.session.commit()
        return "Deleted Entry #" + str(Id)

    except:
        return "Could not delete Entry #" + str(Id)
    
    return "error 422"

@app.route("/list/", methods=["GET"])
def list_names():

    names = []
    query = Entry.query.all()
    if len(query) > 0:
        for entry in query:
            name = entry.name
            
            if name not in names:
                names.append(name)
            else:
                continue
        return jsonify(names)
    else:
        return "No data found"
    
    return "error 422"

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