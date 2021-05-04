from extensions import sqlalchemy
from database import Entry, create_txn
import datetime

def get_date(txn_date):
    
    if txn_date != "" and txn_date != "null":
        delta = datetime.datetime.utcnow()-datetime.datetime.now()
        j = txn_date.split('/')
        return datetime.datetime(int(j[2]), int(j[1]), int(j[0]), 0, 0, 0) + delta
    
    return datetime.datetime.utcnow()

def calculate_distance_travelled(mileage, car_name):
    entries = Entry.query.filter_by(car_name=car_name).order_by(sqlalchemy.desc(Entry.txn_date)).all()
    if len(entries) > 0:
        mileage_ltst = entries[-1].car_mileage
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