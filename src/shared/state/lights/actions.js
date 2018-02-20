import ApiActionGenerator from '%/services/ApiActionGenerator'
import apiClient from '%/services/apiClient'

const apiAction = new ApiActionGenerator('lights')

// API actions that include (REQUEST, SUCCESS, FAILURE, TRIGGER).
export const LIGHTS = apiAction('LIGHTS')

// These will hit the API.
export const getLights = () => apiClient.get('lights/all', null, LIGHTS)
