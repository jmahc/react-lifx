import axios from 'axios'

const axi = axios.create({
  baseURL: 'https://api.lifx.com/v1/',
  // timeout: 1000,
  headers: {
    Authorization: `Bearer ${process.env.LIFX_TOKEN}`
  }
})

const toggleGroupLights = groupId =>
  axi
    .post(`/lights/group_id:${groupId}/toggle`)
    .then(response => response)
    .catch(error => console.log('ERROR', error))

const getLights = () =>
  axi
    .get('/lights/all')
    .then(response => response)
    .catch(error => console.log('ERROR', error))

const getIndividualLight = lightId =>
  axi
    .get(`/lights/id:${lightId}`)
    .then(response => response)
    .catch(error => console.log('ERROR', error))

const toggleAllLights = () =>
  axi
    .post('/lights/all/toggle')
    .then(response => response)
    .catch(error => console.log('ERROR', error))

const toggleIndividualLights = lightId =>
  axi
    .post(`/lights/id:${lightId}/toggle`)
    .then(response => response)
    .catch(error => console.log('ERROR', error))

export {
  axi,
  getIndividualLight,
  getLights,
  toggleAllLights,
  toggleGroupLights,
  toggleIndividualLights
}
