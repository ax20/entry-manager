"""
Name: Database Manager
Description: Connects and handles all transactions between the database
Dependencies:
- Flask (The app that runs the server)
- Config (To fetch the url location of the API)
"""

# To fix cirucular import
# from config import database
from api import API, database
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import  datetime

# database url
url = "postgresql://" + database['username'] + ":" + database['password'] + "@" + database['ip'] + "/" + database['name']
API.config['SQLALCHEMY_DATABASE_URI'] = url
DB = SQLAlchemy(API)

# models
class FuelEntry(DB.Model):
    __tablename__ = "fuel_entries"
    __tableargs__ = {'extend_existing': True} # Adds the ability to add more tables if required later on

    entry_id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(DateTime, default=datetime.utcnow)
    carName = Column(String, nullable=False)
    mileage = Column(Integer, nullable=False)
    distanceTravelledBetweenEntry = Column(Integer, nullable=False)
    gasTotal = Column(Float, nullable=False)
    priceTotal = Column(Float, nullable=False)
    MPG = Column(Float, nullable=False)

    def __init(self, date, carName, mileage, distanceTravelledBetweenEntry, gasTotal, priceTotal, MPG):
    
        self.date = date
        self.carName = carName
        self.mileage = mileage
        self.distanceTravelledBetweenEntry = distanceTravelledBetweenEntry
        self.gasTotal = gasTotal
        self.priceTotal = priceTotal
        self.MPG = MPG

class GymEntry(DB.Model):
    __tablename__ = "gym_entries"
    __tableargs__ = {'extend_existing': True}

    entry_id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(DateTime, default=datetime.utcnow)
    individualName = Column(String, nullable=False)
    bodyPhotoABS = Column(String, nullable=False)
    individualWeight = Column(Float, nullable=False)
    startTime = Column(DateTime, nullable=False)
    endTime = Column(DateTime, nullable=False)
    caloriesExpended = Column(Float, nullable=False)

    def __init(self, date, individualName, bodyPhotoABS, individualWeight, startTime, endTime, caloriesExpended):
        
        self.date = date
        self.individualName = individualName
        self.bodyPhotoABS = bodyPhotoABS
        self.individualWeight = individualWeight
        self.startTime = startTime
        self.endTime = endTime
        self.caloriesExpended = caloriesExpended

# transaction handlers
def create_txn(Model):
    try:
        DB.session.add(Model)
        DB.session.commit()
    except:
        print("Unable to create entry.")

def delete_txn(Model):
    try:
        DB.session.commit()
    except:
        print("Unable to edit entry.")
