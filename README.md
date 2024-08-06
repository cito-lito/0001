##

vegetable-based recipe generator. Based on seasonal vegetables, and city location. Should return a recipe in the following format:

```json
{
  "name": "string",
  "duration_in_minutes": "number",
  "portions": "number",
  "ingredients": [
    {
      "name": "string",
      "quantity": "number",
      "unit": "string"
    }
  ],
  "steps": [
    {
      "description": "string"
    }
  ]
}
```

### run locally

- install dependencies with `npm i`
- run the server with `npm start`
- run the tests with `npm test`

### run with docker
- run the docker daemon
- using docker-compose, run `docker-compose up`

THE hardcoded api key in the docker-compose file is NOT valid. You will need to replace it with your own api key, or pass it in as an env variable.

### test when running with docker:
```bash
curl -X GET "http://localhost:8080/api/v1/recipe?month=august&city=barcelona" -H "Accept: application/json"
```