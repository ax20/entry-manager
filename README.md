<<<<<<< HEAD
# Entry Manager
A collabration project with [David Liang](https://github.com/davidliang2019) in developing a fullstack website with a backend via Flask and a frontend via ReactJS. The project focuses around tracking data related to a vehicle such as MPG and tracking the average amount of calories expended each week by tracking the time at which you go to the gym.

## 1 Installation
### Manual
 - Ensure Python 3.9.4+ & the latest version of PostgresSQL is installed on the machine/virtual environment.
 - Install all required libraries by running `pip install -r requirements.txt`
 - Create a database with PostgresSQL and create a configuration file using [configuration guide](#configuration) and save the file in the working directory.
 - Generate the database models by running [generate_models.py](flask/generate_models.py)
 - Define the following enviornment variables:
   - *FLASK_ENV* by running `export FLASK_ENV=production`
   - *FLASK_APP* by running `export FLASK_APP=flask.app`
 - Start the Flask server by running `flask run`

### Docker
- Ensure the latest version of PostgresSQL is installed on the machine/virtual environment.
- Build the container by running `docker build -t flask_restful .`
- Run the container by running `docker run -p 5000:5000 flask_restful`
## 1.1 Configuration
In order to start working with the flask API you must first create and configure the settings.py file using [the template](.sample/settings.py). Fill in all the required fields with the valid data to start working.

## 1.2 API Documentation
Detailed documentation for the Flask REST API can be found in the [Flask API Documentation](API_DOCS.md).
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all modules listed as dependencies in package.json.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
>>>>>>> parent of 9489630 (reset react branch)
