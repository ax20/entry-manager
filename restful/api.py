from flask import Flask, request, render_template

api = Flask(__name__)
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@api.route('/')
def index():
    return render_template('index.html')

