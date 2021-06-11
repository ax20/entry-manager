# Flask RESTful API

Method:  `POST`
<br>Type: JSON
<br>Expected Respone Code: 200
<br>Example `POST` request to `/create/Car1`
```
{
    "txn_date": "04/30/2021",
    "car_mileage": 73444,
    "txn_total": 45.10,
    "txn_gas_total": 30.10
}
```

*NOTE: auth_token is the token from your settings file*

---
Method:  `GET`
<br>Type: JSON
<br>Expected Respone Code: 200
<br>Example `GET` response from `/view/Car1`
```
{
  "car_mileage": "78199",
  "car_name": "Car1",
  "distance_between_entry": 0,
  "id": 1,
  "txn_date": "Tue, 04 May 2021 17:31:37 GMT",
  "txn_gas_total": 23.76,
  "txn_mpg": 0,
  "txn_total": 34.19
},...
...
```
---
Method:  `GET`
<br>Type: JSON
<br>Expected Respone Code: 200
<br>Example response from `/list/`
```
[
  "Car1",
  "Car2"
]
```
---
Method:  `PUT`
<br>Type: JSON
<br>Expected Respone Code: 200
<br>Example request body from `/update/1`
```
{
  "id": 1,
  "car_name": "Car1",
  "car_mileage": "71499",
  "distance_between_entry": 30,
  "txn_total": 60.11,
  "txn_gas_total": 50.01,
  "txn_mpg": 11.11
}
```
Expected response from `/update/1`
```
Updated Entry #1
```
---
Method:  `DELETE`
<br>Type: JSON
<br>Expected Respone Code: 200
Example response from `/delete/1/invalid_entry`
```
Deleted Entry #1
Reason: invalid_entry
