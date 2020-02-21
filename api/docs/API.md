# Combase API
API for https://comba.se

## Version: 1.0.0


### DELETE /v1/agents/:id

#### DELETE
##### Description:

Deletes an agent

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| ID | controllers/v1/agent/destroy.action.js | UUID of agent to delete | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | No response |

### GET /v1/agents:id

#### GET
##### Description:

Get a specific agent

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| ID | controllers/v1/agent/get.action.js | UUID of the agent to retrieve | Yes | string (uuid) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | JSON representation of the agent | object |

