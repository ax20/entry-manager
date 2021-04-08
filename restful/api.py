from flask import Flask, request, render_template

api = Flask(__name__)
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@api.route('/')
def index():
    return render_template('index.html')

# Import here to avoid circular import
from restful.entry import list_names

# List all individuals & cars
@api.route('/v1/<EntryType>/all', methods=['GET'])
def list_entry_names(EntryType):
    reply = list_names(EntryType)

    return reply

# List all data for specified car/individual
# @api.route('/v1/<EntryType>/<Selector>/all', methods=['GET'])