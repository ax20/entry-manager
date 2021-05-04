from extensions import sqlalchemy
from database import Entry, create_txn, db
import datetime
import traceback # for debug

def get_date(txn_date):
    
    if txn_date != "" and txn_date != "null":
        delta = datetime.datetime.utcnow()-datetime.datetime.now()
        j = txn_date.split('/')
        return datetime.datetime(int(j[2]), int(j[1]), int(j[0]), 0, 0, 0) + delta
    
    return datetime.datetime.utcnow()

def calculate_distance_travelled(mileage, car_name):
    entries = Entry.query.filter_by(car_name=car_name).order_by(sqlalchemy.desc(Entry.txn_date)).all()
    if len(entries) > 0:
        mileage_ltst = entries[0].car_mileage
        return (int(mileage) - int(mileage_ltst))
    return 0

def calcualte_mpg(distance_between_entry, txn_gas_total):
    if distance_between_entry != 0:
        return round((distance_between_entry/txn_gas_total), 2)
    return 0

def process_new(car_name, json_body):
    
    date = get_date(json_body['txn_date'])
    distance_between_entry = calculate_distance_travelled(json_body['car_mileage'], car_name)
    txn_mpg = calcualte_mpg(distance_between_entry, json_body['txn_gas_total'])

    entry = Entry(
        car_name = car_name,
        car_mileage = json_body['car_mileage'],
        distance_between_entry = distance_between_entry,
        txn_date = date,
        txn_total = json_body['txn_total'],
        txn_gas_total = json_body['txn_gas_total'],
        txn_mpg = txn_mpg
    )

    create_txn(entry)

    return "Created Entry #" + str(entry.id)

def process_query(car_name):
    response = []
    entries = Entry.query.filter_by(car_name=car_name).all()

    for item in entries:
        entry = {
            "id": item.id,
            "car_name" : item.car_name,
            "car_mileage" : item.car_mileage,
            "distance_between_entry" : item.distance_between_entry,
            "txn_date": item.txn_date,
            "txn_total" : item.txn_total,
            "txn_gas_total" : item.txn_gas_total,
            "txn_mpg" : item.txn_mpg
        }
        response.append(entry)
    
    if len(response) == 0:
        return "204"
    return response

def process_update(id, json_body):
    
    try:
        entry = Entry.query.filter(Entry.id == id).first()
        entry.car_name = json_body['car_name']
        entry.car_mileage = json_body['car_mileage']
        entry.distance_between_entry = json_body['distance_between_entry']
        entry.txn_total = json_body['txn_total']
        entry.txn_gas_total = json_body['txn_gas_total']
        entry.txn_mpg = json_body['txn_mpg']
        db.session.flush()
        db.session.commit()
        
        return "Updated Entry #" + str(id)
    except:
        traceback.print_exc()
        return "Could not update values for Entry #" + str(id)

# TODO Add logging reason as to why delete query was called
def process_delete(Id, Reason):
    try:
        Entry.query.filter_by(id=Id).delete()
        db.session.commit()
        return "Deleted Entry #" + str(Id) + "<br>Reason: " + Reason
    except:
        return "Could not delete Entry #" + str(Id)

def process_list():
    names = []
    query = Entry.query.all()
    
    if len(query) > 0:
        for entry in query:
            name = entry.car_name
            
            if name not in names:
                names.append(name)
            else:
                continue
        return names
    else:
        return "No data found"