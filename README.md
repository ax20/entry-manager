# Entry Manager
A collabration project with [David Liang](https://github.com/davidliang2019) in developing a fullstack website with a backend via Flask and a frontend via ReactJS. The project focuses around tracking data related to a vehicle such as MPG and tracking the average amount of calories expended each week by tracking the time at which you go to the gym.

## 1 Installation
 - Ensure Python 3.9.4+ & the latest version of PostgresSQL is installed on the machine/virtual environment.
 - Install all required libraries by running `pip install -r requirements.txt`
 - Create a database with PostgresSQL and create a configuration file using [configuration guide](#configuration) and save the file in the working directory.
 - Generate the database models by running [generate_models.py](flask/generate_models.py)
 - Define the following enviornment variables:
   - *FLASK_ENV* by running `export FLASK_ENV=production`
   - *FLASK_APP* by running `export FLASK_APP=flask.app`
 - Start the Flask server by running `flask run`

## 1.1 Configuration
In order to start working with the flask API you must first create and configure the settings.py file using [the template](.sample/settings_template.py). Fill in all the required fields with the valid data to start working.

## 1.2 API Documentation
Detailed documentation for the Flask REST API can be found in the [Flask API Documentation](API_DOCS.md).