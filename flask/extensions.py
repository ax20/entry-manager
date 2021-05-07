from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

SQLAlchemy = SQLAlchemy
sqlalchemy = sqlalchemy