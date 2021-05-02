from flask import request, jsonify
import json
from extensions import app
from database import Entry, create_txn

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        return "POST Request"
    elif request.method == "GET":
        return "GET Request"

@app.route("/create/<string:Name>", methods=["POST"])
def create_entry(Name):
    body = request.get_json()
    entry = Entry(
        name=Name,
        description=body['description']
    )
    create_txn(entry)
    
    return "Created Entry #" + str(entry.id)

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