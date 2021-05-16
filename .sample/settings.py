import os

APP_NAME = "damocles" # using lowercase is a better practice
APP_VERSION = "1" # round to whole number for better url formatting

# list of origins which are allowed to bypass CORS policy
CORS_WHITELISTED = {
    "origins": {
            "50.98.109.240:5000",
            "localhost:3000"
    }
}

# database information
DATABASE = {
    "ip":"127.0.0.1",
    "name": "database",
    "username": "username", 
    "password": "password"
}

# the address the api will serve on and the token for authentication
API_TOKEN = "super secret ;)"
API_ADDR = f"/{APP_NAME}/v{APP_VERSION}/"
