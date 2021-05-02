# Flask Server
FROM ubuntu:latest

MAINTAINER Ashwin Charathsandran "ashwincharath@gmail.com"

RUN apt-get update
RUN apt-get install -y python3 python3-pip

COPY ./requirements.txt /flask_app/requirements.txt

RUN pip3 install -r /flask_app/requirements.txt

COPY ./flask /flask_app/

ENTRYPOINT [ "python3" ]

RUN export FLASK_APP=flask_app.app
RUN export FLASK_ENV=production

CMD [ "flask_app/app.py" ]