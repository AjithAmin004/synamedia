# Interview Assignment 

Hotel Room Booking System

•	Booking Room API:

1.Users can book a room by providing their name, contact details, check-in date, and check-out date.

2.Assign the room automatically based on availability.

3.Return a confirmation with booking details including room number, guest name, and stay duration.

• View Booking Details API:

1.Retrieve the details of a guest's room booking by providing their email address.

•	View All Guests in the Hotel API:

1.Return a list of all the guests currently staying in the hotel, including their room numbers.

•	Cancel Room Booking API:
1.Allow a guest to cancel their booking by providing their email and room details.

•	Modify Booking API:

1.Allow a guest to modify their check-in or check-out date by providing their email and booking details.

## Installation

Use NPM package manager to install Packages.

```bash
npm install
```

## Copy ENV example to ENV file and add mongodb connection

## Insert data to 'rooms' collection (you can use below data as sample)


```json
[{
  "_id": {
    "$oid": "679a76907bf3402f5bd44e9f"
  },
  "roomNumber": {
    "$numberDecimal": "100"
  },
  "available": true
},
{
  "_id": {
    "$oid": "679a77237bf3402f5bd44ea0"
  },
  "roomNumber": {
    "$numberDecimal": "101"
  },
  "available": true
}]
```

## Routes and expected input

POST: /book - name, mail, checkInDate, checkOutDate - pass in body and maintain proper values

```json
{
  "name": "Ajith",
  "mail": "test6@mail.com",
  "checkInDate": "2025-02-21",
  "checkOutDate": "2025-02-22"
}
```
GET: /book - pass "mail" in query

[127.0.0.1:3000/book/?mail=test6@mail.com]()

DELETE : /book - pass "mail" in body
```json
{
  "mail": "test6@mail.com"
}
```

PUT : /book - mail, newCheckInDate, newCheckOutDate - pass in body
```json
{
  "mail": "test6@mail.com",
  "checkInDate": "2025-02-21",
  "checkOutDate": "2025-02-22"
}
```

GET : /book/viewGuests - no input
