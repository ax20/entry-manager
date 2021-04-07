from configuration import DATABASE_ADDR, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME
from api import api
from flask_sqlalchemy import SQLAlchemy

# Database URL
api.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{DATABASE_ADDR}/{DATABASE_NAME}"
postgres = SQLAlchemy(api)

def txn_create(model):
    postgres.session.add(model)
    postgres.session.commit()