from extensions import app, SQLAlchemy
from datetime import datetime
from sqlalchemy import String, Integer, Column, Float, DateTime
from settings import DATABASE
import traceback # debug

database_url = f"postgresql://{DATABASE['username']}:{DATABASE['password']}@{DATABASE['ip']}/{DATABASE['name']}"
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
db = SQLAlchemy(app)

# models
class Entry(db.Model):
    __tablename__ = "entries_fuel"
    __tableargs__ = {'extend_existing': True} # Adds the ability to add more tables if required later on

    id = Column(Integer, primary_key=True, autoincrement=True)
    car_name = Column(String, nullable=False)
    car_mileage = Column(String, nullable=False)
    distance_between_entry = Column(Integer, nullable=False)
    txn_date = Column(DateTime, default=datetime.utcnow)
    txn_total = Column(Float, nullable=False)
    txn_gas_total = Column(Float, nullable=False)
    txn_mpg = Column(Float, nullable=False)

    def __init(self, car_name, car_mileage, distance_between_entry, txn_date, txn_total, txn_gas_total, txn_mpg):
        self.car_name = car_name
        self.car_mileage = car_mileage
        self.distance_between_entry = distance_between_entry
        self.txn_date = txn_date
        self.txn_total = txn_total
        self.txn_gas_total = txn_gas_total
        self.txn_mpg = txn_mpg

def create_txn(model):
    try:
        db.session.add(model)
        db.session.commit()
    except:
        traceback.print_exc() # debug
        print("fatal: unable to create model")