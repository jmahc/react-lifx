import ApiActionGenerator from '%/services/ApiActionGenerator'
import apiClient from '%/services/apiClient'

const apiAction = new ApiActionGenerator('individual_light')

export const INDIVIDUAL_LIGHT = apiAction('INDIVIDUAL_LIGHT')

// Toggle power for an individual light.
export const toggleLightPower = id => {
  console.log('Firing reques...?', id)

  return apiClient.post(`lights/id:${id}/toggle`, {}, INDIVIDUAL_LIGHT)
}
