# Flask Server
FROM ubuntu:latest

MAINTAINER Ashwin Charathsandran "ashwincharath@gmail.com"

RUN apt-get update
RUN apt-get install -y python3 python3-pip

COPY ./requirements.txt /flask_app/requirements.txt

RUN pip3 install --no-cache-dir -r /flask_app/requirements.txt

COPY ./flask /flask_app/

RUN /flask_app/genereate_models.py

ENTRYPOINT [ "python3" ]

RUN export FLASK_APP=flask_app.app
RUN export FLASK_ENV=production

EXPOSE 5000

CMD [ "flask_app/app.py" ]