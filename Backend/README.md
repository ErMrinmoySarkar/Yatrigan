# Backend API

## Register User

Creates a new user account and returns an authentication token.

### Endpoint

```http
POST /users/register
```

## Login Captain

Authenticates an existing captain and returns a JWT token.

### Endpoint

```http
POST /captains/login
| `fullname.lastname` | String | No | At least 3 characters when provided |
| `email` | String | Yes | Must be a valid email address |
| `password` | String | Yes | At least 6 characters |

Example:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Successful response

**Status:** `201 Created`

Returns a JSON object containing the generated authentication token and the created user:

```json
{
  "token": "<jwt-token>",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Validation error

**Status:** `400 Bad Request`

Returned when one or more request fields fail validation. The response contains an `errors` array:

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Password must have 6 characters or more",
      "path": "password",
      "location": "body"
    }
  ]
}
```

## Login User

Authenticates an existing user and returns a JWT token.

### Endpoint

```http
POST /users/login
```

### Request body

The request must use JSON and include the following fields:

| Field | Type | Required | Requirements |
| --- | --- | --- | --- |
| `email` | String | Yes | Must be a valid email address |
| `password` | String | Yes | At least 6 characters |

Example:

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Successful response

**Status:** `200 OK`

Returns a JSON object containing the generated authentication token and the authenticated user:

```json
{
  "token": "<jwt-token>",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Validation error

**Status:** `400 Bad Request`

Returned when one or more request fields fail validation. The response contains an `errors` array:

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Password must have 6 characters or more",
      "path": "password",
      "location": "body"
    }
  ]
}
```

### Invalid credentials

**Status:** `401 Unauthorized`

Returned when the email does not exist or the password is incorrect:

```json
{
  "message": "Invalid email or password"
}
```

## Get User Profile

Retrieves the authenticated user profile.

### Endpoint

```http
GET /users/profile
```

### Authentication

This route requires a valid JWT token. The backend accepts the token in either:

- the `token` cookie, or
- the `Authorization` header as `Bearer <jwt-token>`

### Example request

```bash
url http://localhost:4000/users/profile \
  -H "Authorization: Bearer <jwt-token>"
```

Or with cookie:

```bash
url http://localhost:4000/users/profile \
  --cookie "token=<jwt-token>"
```

### Successful response

**Status:** `200 OK`

```json
{
  "_id": "64d1c2f0dbf02d3a4dca5b1a",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "createdAt": "2026-09-24T10:00:00.000Z",
  "updatedAt": "2026-09-24T10:00:00.000Z"
}
```

### Unauthorized response

**Status:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

## Logout User

Logs the current user out by clearing the auth cookie and blacklisting the JWT token.

### Endpoint

```http
GET /users/logout
```

### Authentication

This route requires a valid JWT token. The backend accepts the token in either:

- the `token` cookie, or
- the `Authorization` header as `Bearer <jwt-token>`

### Example request

```bash
url http://localhost:4000/users/logout \
  -H "Authorization: Bearer <jwt-token>"
```

Or with cookie:

```bash
url http://localhost:4000/users/logout \
  --cookie "token=<jwt-token>"
```

### Successful response

**Status:** `200 OK`

```json
{
  "message": "Logout successful"
}
```

### Unauthorized response

**Status:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

### Notes

- Send the request with `Content-Type: application/json` for login and registration.
- The password is hashed before it is stored.
- The controller currently returns the created user document; because the document is newly created, verify that the hashed password is removed before exposing this response publicly.
- A valid `JWT_SECRET` environment variable is required to generate the token.
- The route is mounted under `/users`, so the complete URL depends on the backend server host and port.

## Register Captain

Creates a new captain account and returns an authentication token.

### Endpoint

```http
POST /captains/register
```

### Request body

The request must use JSON and include the following fields:

| Field | Type | Required | Requirements |
| --- | --- | --- | --- |
| `fullname.firstname` | String | Yes | At least 3 characters |
| `fullname.lastname` | String | Yes | At least 3 characters |
| `email` | String | Yes | Must be a valid email address |
| `password` | String | Yes | At least 6 characters |
| `vehicle.color` | String | Yes | At least 3 characters |
| `vehicle.plate` | String | Yes | At least 3 characters |
| `vehicle.capacity` | Number | Yes | Must be an integer greater than or equal to 1 |
| `vehicle.vehicleType` | String | Yes | Must be one of: `car`, `bike`, `auto` |

Example:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "black",
    "plate": "ABC-1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Successful response

**Status:** `201 Created`

Returns a JSON object containing the generated authentication token and the created captain:

```json
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "64d1c2f0dbf02d3a4dca5b1a",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

### Validation error

**Status:** `400 Bad Request`

Returned when one or more request fields fail validation. The response contains an `errors` array:

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Password must be at least 6 characters",
      "path": "password",
      "location": "body"
    }
  ]
}
```

### Captain already exists

**Status:** `400 Bad Request`

Returned when a captain with the same email address already exists:

```json
{
  "message": "Captain already exists"
}
```

### Example request

```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "secret123",
    "vehicle": {
      "color": "black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

## Login Captain

Authenticates an existing captain and returns a JWT token.

### Endpoint

```http
POST /captains/login
```

### Request body

The request must use JSON and include `email` and `password`.

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Successful response

**Status:** `200 OK`

```json
{
  "token": "<jwt-token>",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

### Validation error

**Status:** `400 Bad Request`

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Password must be at least 6 characters",
      "path": "password",
      "location": "body"
    }
  ]
}
```

### Invalid credentials

**Status:** `401 Unauthorized`

```json
{
  "message": "Invalid email or password"
}
```

## Get Captain Profile

Retrieves the authenticated captain profile.

### Endpoint

```http
GET /captains/profile
```

### Authentication

This route requires a valid JWT token in either the `token` cookie or the `Authorization` header as `Bearer <jwt-token>`.

### Example request

```bash
curl http://localhost:4000/captains/profile \
  -H "Authorization: Bearer <jwt-token>"
```

### Successful response

**Status:** `200 OK`

```json
{
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

### Unauthorized response

**Status:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

## Logout Captain

Logs the current captain out by clearing the auth cookie and blacklisting the JWT token.

### Endpoint

```http
GET /captains/logout
```

### Authentication

This route requires a valid JWT token in either the `token` cookie or the `Authorization` header as `Bearer <jwt-token>`.

### Example request

```bash
curl http://localhost:4000/captains/logout \
  -H "Authorization: Bearer <jwt-token>"
```

### Successful response

**Status:** `200 OK`

```json
{
  "message": "Logout successful"
}
```

### Unauthorized response

**Status:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```
