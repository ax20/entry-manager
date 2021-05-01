# Flask RESTful API

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
...
```
---
Method:  `GET`
<br>Type: JSON
<br>Expected Respone Code: 200
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
```