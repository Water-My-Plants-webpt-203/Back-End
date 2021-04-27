## API Endpoints (Users)

#### NOTE: For all endpoints below, the base URL is: https://water-my-plants-203.herokuapp.com/api

- Authentication Endpoints:

  - 1:
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

  - 2:
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

- User Endpoints: (Note: Requires auth token to be passed as bearer token)

  - 1:
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

  - 2:
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
