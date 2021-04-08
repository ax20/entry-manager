from restful.postgres import txn_create, postgres
from flask import jsonify
from restful.configuration import ADMIN_TOKEN
from restful.data_models import FuelEntry, GymEntry

def list_names(EntryType):
    
    reply = []

    if EntryType == "Fuel":
        data = FuelEntry.query.all()
        names = {}
        
        if len(data) > 1:
            for entry in data:
                name = entry.carName
                if name in names:
                    names.append(name)
                else:
                    continue

    elif EntryType == "Gym":
        data = GymEntry.query.all()
        names = {}
        
        if len(data) > 1:
            for entry in data:
                name = entry.individualName
                if name not in names:
                    names.append(name)
                else:
                    continue
                
    reply.append(names)

    if len(reply) == 0:
        return "No data in tables"

    return jsonify(reply)