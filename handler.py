from flask import jsonify
import json
from config import api
from  datetime import  datetime
from database import FuelEntry, GymEntry, DB, create_txn, delete_txn

def calculate_time_diffrence(hour_a, hour_b, minute_a, minute_b):
    if (hour_a == hour_b):
        return minute_b-minute_a
    else:
        return ((hour_b - hour_a) * 60 + (60 * minute_a) + minute_b)

def calculate_distance_travelled(mileage, carName):
    entries = FuelEntry.query.filter_by(carName=carName).order_by(sqlalchemy.desc(FuelEntry.date)).all()
    if len(entries) > 0:
        mileage_latest = entries[-1].mileage
        return (int(mileage) - int(mileage_latest))
    else:
        return 0

def calculate_mpg(distance, gas):
    return round((distance/gas), 2)

def set_date(date):
    if date == "null":
        return datetime.utcnow()
    else:
        delta = datetime.utcnow()-datetime.now()
        j = date.split('/')
        return datetime(int(j[2]), int(j[1]), int(j[0]), 0, 0, 0) + delta

def calculate_calories(time):
    rate = 520 # with a bmi of 23  you expend ~520 calories at the gym of medium/intense workout
    return (time/60) * time

def data_request(Model, Name):
    reply = []

    if Model == "Fuel":
        entries = FuelEntry.query.filter_by(carName=Name).all()

        for entry in entries:

            item = {
                    "id": entry.entry_id,
                    "carName":Name,
                    "date": entry.date,
                    "mileage": entry.mileage,
                    "distanceTravelledBetweenEntry": entry.distanceTravelledBetweenEntry,
                    "gasTotal": entry.gasTotal,
                    "priceTotal": entry.priceTotal,
                    "MPG": entry.MPG
                }
            
            reply.append(item)
    
    elif Model == "Gym":
        entries = GymEntry.query.filter_by(individualName=Name).all()
        
        for entry in entries:
            
            item = {
                "id": entry.entry_id,
                "individualName":Name,
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
        return "204"
    
    return jsonify(reply)

def data_new(Model, Name, json):

    # authorization
    if json.get('secret') == None or json.get('secret') != api['token']:
        return "Unauthorized"

    # fuel entry
    if Model == "Fuel":
        item = FuelEntry(
            carName = Name,
            date = set_date(json['date']),
            mileage = json['mileage'],
            distanceTravelledBetweenEntry = calculate_distance_travelled(mileage, Name),
            gasTotal = json['gasTotal'],
            priceTotal = json['priceTotal'],
            MPG = calculate_mpg(calculate_distance_travelled(mileage, Name), gasTotal)
        )
    
    elif Model == "Gym":

        time_spent = calculate_time_diffrence(startTime[0:1], endTime[0:1], startTime[2:3], endTime[2:3])

        item = GymEntry(
            individualName=Name,
            date = set_date(json['date']),
            bodyPhotoABS = json['bodyPhotoABS'],
            individualWeight = json['individualWeight'],
            startTime = json['startTime '],
            endTime = json['endTime'],
            calculate_calories = calculate_calories(time_spent)
        )
    else:
        return "422"
    
    create_txn(item)
    return "Created " + Model + " => " + item.entry_id

def list_names(Model):
    reply = {
        "fuel": {},
        "gym": {}
    }
    gym_names = []
    fuel_names = []

    if Model == "Fuel":
        data = FuelEntry.query.all()
        
        if len(data) > 1:
            for entry in data:
                name = entry.carName
                if name not in fuel_names:
                    fuel_names.append(name)
                else:
                    continue

    elif Model == "Gym":
        data = GymEntry.query.all()
        
        if len(data) > 1:
            for entry in data:
                name = entry.individualName
                if name not in gym_names:
                    gym_names.append(name)
                else:
                    continue
    else:
        return "422"
                
    reply['fuel'] = fuel_names
    reply['gym'] = gym_names

    if len(reply) == 0:
        return "204"

    return jsonify(reply)

# TODO: Next commit
def data_update(Model, Name, json):
    return ""

# TODO: Next commit
def data_delete(Model, Name, json):
    return ""