from restful.postgres import txn_create, postgres
from flask import jsonify
from restful.configuration import ADMIN_TOKEN
from restful.data_models import FuelEntry, GymEntry

def fetch_item_for(EntryType, Selector):

        reply = []

        if EntryType == "Fuel":
            entries = FuelEntry.query.filter_by(carName=Selector).all()

            for entry in entries:
                item = {
                    "carName":Selector,
                    "date": entry.date,
                    "mileage": entry.mileage,
                    "distanceTravelledBetweenEntry": entry.distanceTravelledBetweenEntry,
                    "gasTotal": entry.gasTotal,
                    "priceTotal": entry.priceTotal,
                    "MPG": entry.MPG
                }
                reply.append(item)
        
        elif EntryType == "Gym":
            entries = GymEntry.query.filter_by(individualName=Selector).all()

            for entry in entries:
                item = {
                    "individualName":Selector,
                    "date": entry.date,
                    "bodyPhotoABS": entry.bodyPhotoABS,
                    "individualWeight": entry.individualWeight,
                    "startTime": entry.startTime,
                    "endTime": entry.endTime,
                    "caloriesExpended": entry.caloriesExpended
                }
                reply.append(item)
        
        if len(reply) == 0:
            return f"No data for {Selector} in table {EntryType}"
        
        return reply

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