# **Entry Manager**
 A web app that tracks and manages data, for example managing fuel efficency and tracking the estimated amount of calories burned in a month by calculating the time spent at the gym.

# Project Goal
> *Understanding RESTful API's and expanding knowledge with Flask and ReactJS to improve my full stack development skills.* 

 ## Technologies
 - [Flask](https://flask.palletsprojects.com/en/1.1.x/) (*Flask is known for it's speed and ease of scalability, as well as it's easy to use rendering methods. I have been studying Python for a long time as well so this was the perfect oppurtunity to put my skills to the test.*)
 - [ReactJS](https://reactjs.org/) (*Very popular in the frontend community, I have seen ReactJS mentioned everywhere and I knew I had to learn it at somepoint, so why not with a bigger project that has real world uses.*)
- [PostgresSQL](https://www.postgresql.org/) (*A newer SQL database system that is recently been gaining popularity, the UI is much cleaner and interactive with the system is easier than MySQL so I decided to go with it. The icon also looks cool*)

## Skills
- Full-Stack Development
- Building RESTful API's
- Database Management
- Structual Project Design
- Github Projects
- Node.js

## Flask

### API Parameters
- GET `/<api name>/v<version>/`
  <br>
  The homepage of the API, displays a message with the name and version of the API.
- GET `/<api name>/v<version>/<Model>/<Name>/`
  <br>
  Example reply for `/<api name>/v<version>/Fuel/Matryx/`
  ```
  [
    {
        "MPG": 0.0, 
        "carName": "Matryx", 
        "date": "Fri, 06 Nov 2020 07:00:00 GMT", 
        "distanceTravelledBetweenEntry": 0, 
        "gasTotal": 69.69, 
        "id": 1, 
        "mileage": 110431, 
        "priceTotal": 45.11
    }, 
    {
        "MPG": 0.0, 
        "carName": "Matryx", 
        "date": "Fri, 06 Nov 2020 07:00:00 GMT", 
        "distanceTravelledBetweenEntry": 0, 
        "gasTotal": 69.69, 
        "id": 2, 
        "mileage": 110431, 
        "priceTotal": 45.11
    },..
  ]
  ```
- POST `/<api name>/v<version>/<Model>/<Name>/`
  <br>
  Example post json body, the secret token can be defined in config.py
  ```
  {
    "secret": "<secret key>",
    "date": "04/05/2020",
    "mileage": 90000,
    "gasTotal": 50.24,
    "priceTotal": 68.76
  }
  ```
- GET `/<api name>/v<version>/<Model>/list`
  <br>
  Example get request of a list of entries
  ```
  {
  "fuel": [
    "Matryx"
  ], 
  "gym": []
  }
  ```
- POST `<api name>/v<version>/upload/`
  <br>
  To upload an image, accepts files submitted by HTML forms (*detailed documentaion will be provided later*) 

### Configuartion File
Modify the data as you want and save as config.py in the working directory
```
app = {
    "name": "damocles",
    "version": "1",
    "debug": True,
    "production": False,
    "cors-bypass": {
        "origins": {
            "50.98.109.240:5000",
            "localhost:300"
        }
    },
    "media_folder": "/static/media/"
}

database = {
    "ip":"127.0.0.1",
    "name": "database",
    "username": "username", 
    "password": "password"
}

api = {
    "token": "super secret thing no one can see",
    "location": "/" + app['name'] + "/v" + app['version'] + "/"
}
```

### Starting Flask Server
In GIT bash enter the following commands:
- Create Python Virutal Enviornment
  <br>`python -m venv <name>`
- Enter virtual enviornment
  <br>`source <name>/Scripts/activate`
- Install dependencies
  <br>`pip install -r requirements.txt`
- Define enviornment variables
  <br>`export FLASK_APP=api`
  <br>For debug mode: `export FLASK_ENV=development`
  <br>For production mode: `export FLASK_ENV=production`
- Start server
  <br>`flask run`
- Visit the server on [http://localhost:5000](http://localhost:5000)