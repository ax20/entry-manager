from flask import Flask, request, render_template
from restful.configuration import API_LABEL

api = Flask(__name__)
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


@api.route(f'/{API_LABEL}')
def index():
    return render_template('index.html', title=API_LABEL)

# Import here to avoid circular import
from restful.entry import list_names, fetch_item_for, new_item

# List all individuals & cars
@api.route(f'/{API_LABEL}/v1/<EntryType>/all', methods=['GET'])
def list_entry_names(EntryType):
    reply = list_names(EntryType)
    return reply

# List all data for specified car/individual
@api.route(f'/{API_LABEL}/v1/<EntryType>/<Selector>/', methods=['GET'])
def get_data(EntryType, Selector):
    reply = fetch_item_for(EntryType, Selector)
    return reply

# Create new entries for desired model
@api.route(f'/{API_LABEL}/v1/<EntryType>/<Selector>/', methods=['POST'])
def new_data(EntryType, Selector):
    reply = new_item(EntryType, Selector, request.get_json())
    return reply