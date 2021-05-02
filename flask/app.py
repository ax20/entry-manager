from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        return "POST Request"
    elif request.method == "GET":
        return "GET Request"

@app.route("/<int:Id>/<string:Type>", methods=["GET"])
def dynamic_url(Id,Type):
    return f"ID: {Id}<br>Type: {Type}"