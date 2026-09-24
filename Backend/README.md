# Backend API

## Register User

Creates a new user account and returns an authentication token.

### Endpoint

```http
POST /users/register
```

### Request body

The request must use JSON and include the following fields:

| Field | Type | Required | Requirements |
| --- | --- | --- | --- |
| `fullname.firstname` | String | Yes | At least 3 characters |
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

### Notes

- Send the request with `Content-Type: application/json`.
- The password is hashed before it is stored.
- The controller currently returns the created user document; because the document is newly created, verify that the hashed password is removed before exposing this response publicly.
- A valid `JWT_SECRET` environment variable is required to generate the token.
- The route is mounted under `/users`, so the complete URL depends on the backend server host and port.
