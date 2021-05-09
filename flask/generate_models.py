from database import db
import traceback

try:
    db.create_all()
    print("created database models")
except:
    traceback.print_exc()
    print("error most likley to falsley typed information regarding the database")