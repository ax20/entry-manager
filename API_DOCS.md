# Flask RESTful API

<<<<<<< HEAD
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
},
...
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
=======
Method:  `GET, POST`
<br>Type: JSON
<br>Expected Respone Code: 200
<br>Example `POST` request to `/api/v1/Fuel/Car1`
```
{
    "date": "04/30/2021",
    "mileage_at_entry": 73444,
    "txn_cost": 45.10,
    "txn_gas_pumped": 30.10,
    "auth_token": "super secret ;)"
},
...
```
*NOTE: auth_token is the token from your settings file*
<br>
Example `GET` response from `/api/v1/Fuel/Car1`
```
{
    "id": 1,
    "car_name": "Car1",
    "date": "04/30/2021",
    "mileage_at_entry": 73444,
    "distance_from_last": 310,
    "txn_cost": 45.10,
    "txn_gas_pumped": 30.10,
    "mpg": 8.7
},
>>>>>>> main
...
```
---
Method:  `GET`
<br>Type: JSON
<br>Expected Respone Code: 200
<<<<<<< HEAD
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
=======
<br>Example response from `/api/v1/list_names`
```
{
    "fuel": [
        "Car1",
        "Car2",
        "Car3"
    ],
    "gym": [
        "Individual_1",
        "Individual_2",
        "Individual_3"
    ]
}
>>>>>>> main
```