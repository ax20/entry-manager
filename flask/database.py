from extensions import app, SQLAlchemy
from sqlalchemy import String, Integer, Column
from settings import DATABASE

database_url = f"postgresql://{DATABASE['username']}:{DATABASE['password']}@{DATABASE['ip']}/{DATABASE['name']}"
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
db = SQLAlchemy(app)

# models
class Entry(db.Model):
    __tablename__ = "entries"
    __tableargs__ = {'extend_existing': True} # Adds the ability to add more tables if required later on

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)

    def __init(self, name, description):
        self.name = name
        self.description = description
        

def create_txn(model):
    try:
        db.session.add(model)
        db.session.commit()
    except:
        print("fatal: unable to create model")