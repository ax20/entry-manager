from restful.postgres import txn_create, postgres
from flask import jsonify
from restful.configuration import ADMIN_TOKEN
from restful.data_models import FuelEntry, GymEntry
from datetime import datetime
import sqlalchemy

def time_dif(h1,m1,h2,m2):
    if(h1 == h2):
        return m2-m1
    else:
        return ((h2-h1-1)*60 + (60-m1) + m2)

def new_item(EntryType, Selector, JSON):

    if JSON.get('secret') == None or JSON.get('secret') != ADMIN_TOKEN:
        return "Unauthorized access"
    
    if EntryType == "Fuel":

        # Calcualte date if not provided
        if JSON['date'] == "":
            JSON['date'] = datetime.utcnow()
        else:
            utc_delta = datetime.utcnow()-datetime.now()
            x = JSON['date'].split('/')
            JSON['date'] = datetime(int(x[2]), int(x[1]), int(x[0]), 0, 0, 0) + utc_delta
        
        data_1 = FuelEntry.query.filter_by(carName=Selector).order_by(sqlalchemy.desc(FuelEntry.date)).all()
        
        # Calcualte Distance Travelled
        if len(data_1) > 0:
            mlg_last = data_1[-1].mileage
            JSON['distanceTravelledBetweenEntry'] = int(JSON['mileage']) - int(mlg_last)
        else:
            JSON['distanceTravelledBetweenEntry'] = 0

        # Calculate MPG
        JSON['MPG'] = int(JSON['distanceTravelledBetweenEntry'])/int(JSON['gasTotal'])

        item = FuelEntry(
            carName = Selector,
            date = JSON['date'],
            mileage = JSON['mileage'],
            distanceTravelledBetweenEntry = JSON['distanceTravelledBetweenEntry'],
            gasTotal = JSON['gasTotal'],
            priceTotal = JSON['priceTotal'],
            MPG = JSON['MPG']
        )
    
    elif EntryType == "Gym":

        if JSON['date'] == "":
            JSON['date'] = datetime.utcnow()
        else:
            utc_delta = datetime.utcnow()-datetime.now()
            x = JSON['date'].split('/')
            JSON['date'] = datetime(int(x[2]), int(x[1]), int(x[0]), 0, 0, 0) + utc_delta
        
        # 15:13
        # 16:12
        # 520 cal/hour
        start = JSON['startTime'].replace(":", "")
        end = JSON['endTime'].replace(":", "")
        hrs = time_dif(int(start[:2]),int(start[3:4]), int(end[:2]),int(end[3:4]))
        JSON['caloriesExpended'] = hrs * 534

        item = GymEntry(
            date = JSON['date'],
            individualName = Selector,
            bodyPhotoABS = JSON['bodyPhotoABS'],
            individualWeight = JSON['individualWeight'],
            startTime = JSON['startTime'],
            endTime = JSON['startTime'],
            caloriesExpended = JSON['caloriesExpended']
        )
    
    else:
        return "422"

    txn_create(item)
    
    return "Created entry"

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
        
        else:
            return "422"
        
        if len(reply) == 0:
            return f"No data for {Selector} in table {EntryType}"
        
        return jsonify(reply)

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

    else:
        return "422"
                
    reply.append(names)

    if len(reply) == 0:
        return "No data in tables"

    return jsonify(reply)