## API Endpoints (Users)

#### NOTE: For all endpoints below, the base URL is: https://water-my-plants-203.herokuapp.com/api

### Authentication Endpoints:

- ### 1 :
  - /auth/register - creates a new user in database.
  - Method: POST
  - Sample Payload:

```js
{
  "username": "BPN", (Required Field)
  "password": "123456", (Required Field)
  "phoneNumber": "123-444-1234" (Optional Field)
}
```

        Sample Response:

```js
{
  "message": "User Created"
}
```

- ### 2 :
  - /auth/login - user login feature, upon successful login will return a token
  - Method: POST
  - Sample Payload:

```js
{
  "username": "BPN", (Required Fied)
  "password": "123456" (Required Field)
}
```

    Sample Response:

```js
{
  "message": "Welcome, BPN",
  "user_id": 6,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6IkJQTiIsInBhc3N3b3JkIjoiJDJhJDEwJHJwRHJlYnRXMDdnaUJsOUp4Qmd5enVwdWI"
}
```

### User Endpoints: (Note: Requires auth token to be passed as bearer token)

- ### 1 :
  - /users/:id - retrieves user information
  - Method: GET
  - Sample Response:

```js
{
  "user_id": 6,
  "username": "BPN",
  "password": "$2a$10$iS5dMEva6f/G8b5ofX1TFuv.fvZvKCaR8sunxUj4TeIPgZ7UOzMUa",
  "phoneNumber": "1530-750-0799"
}
```

- ### 2 :
  - /users/:id - updates user information
  - Method: PUT
  - Sample Payload:

```js
{
  "password": "123456",
  "phoneNumber": "123-456-18181"
}
```

Sample Response:

```js
{
  "message":"User Updated Successfully"
}
```

### Plants Endpoints: (Note: Requires auth token to be passed as bearer token)

NOTE: When sending image of a plant to the server the file upload input field should be named "plantImg". The uploaded image will be saved on the server and can be accessed from the front end using base url: https://water-my-plants-203.herokuapp.com/images/ + image value of the plant record.<br/>
For instance if the image value for plant with plant_id 2 is "6/default1619575024780.jpg" the image src value will be "https://water-my-plants-203.herokuapp.com/images/6/default1619575024780.jpg".<br/>
If no file is sent the default image src value should be "https://water-my-plants-203.herokuapp.com/images/default/default.jpg" where "default/default.jpg" is the default image value of a specified plant record.

- ### 1 :
  - /plants/:plant_id - retrieves plant information based on specified plant_id
  - Method: GET
  - Sample Response:

```js
{
    "plant_id": 2,
    "nickname": "Updated Lotus",
    "species": "Updated Species",
    "h2oFrequency": 11,
    "image": "6/lotus1619579242697.jpg",
    "user_id": 6
}
```

- ### 2 :
  - /plants/:user_id/plants - returns an array of plants created by a specific user based on specified user_id
  - Method: GET
  - Sample Response

```js
[
  {
    plant_id: 9,
    nickname: "Test Nickname",
    species: "Test Species",
    h2oFrequency: 4,
    image: "6/default1619575024780.jpg",
    user_id: 6,
  },
  {
    plant_id: 10,
    nickname: "Test Nickname 1",
    species: "Test Species 1",
    h2oFrequency: 5,
    image: "default/default.jpg",
    user_id: 6,
  },
];
```

- ### 3 :
  - /plants/:user_id/plants - adds new plant created by a user in the database
  - Method: POST
  - Sample Payload:

```js
{
  "nickname": "Jasmin",
  "species": "flower",
  "h2oFrequency": 11
}
```

Sample Response:

```js
{
  "message": "Plant created successfully."
}
```

- ### 4 :
  - /plants/:plant_id - updates an existing plant based on plant id
  - Method: PUT
  - Sample Payload:

```js
{
  "nickname": "JasminE",
  "species": "flower",
  "h2oFrequency": 20
}
```

Sample Response:

```js
{
  "message": "Plant 3 was successfully updated."
}
```

- ### 5 :
  - /plants/:plant_id - deletes an existing plant based on plant id
  - Method: DELETE

Sample Response:

```js
{
  "message": "Plant 3 was successfully deleted."
}
```
