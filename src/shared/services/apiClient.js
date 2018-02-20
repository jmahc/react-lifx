import queryString from 'query-string'
import { CALL_API, getJSON } from 'redux-api-middleware'
import Immutable from 'seamless-immutable'

const apiClient = {
  get: (...args) => fireRequest('GET', ...args),
  post: (...args) => fireRequest('POST', ...args),
  put: (...args) => fireRequest('PUT', ...args),
  delete: (...args) => fireRequest('DELETE', ...args)
}

const BASE_URL = process.env.API_URL

const fireRequest = (method, uri = '', data = {}, action) => {
  let body = null
  let endpoint = `${BASE_URL}/${uri}`
  console.log('Fire request with endpoint: ', endpoint)

  let headers = {
    Authorization: `Bearer ${process.env.LIFX_TOKEN}`,
    'Content-Type': 'application/json'
  }

  console.log('Headers is: ', headers)
  console.log('Endpoint is: ', endpoint)
  console.log('Method is: ', method)

  // Just in case a falsey value gets through.
  if (!data) {
    data = {}
  }

  console.log('Data is now..', data)
  // Convert immutable data to normal JS
  if (Immutable.isImmutable(data)) {
    data = Immutable.asMutable(data)
  }

  console.log('Data is now...?', data)

  // // Remove the token from the `data` object.
  // Reflect.deleteProperty(data, 'token')

  // Convert data to query string for GET requests.
  method === 'GET'
    ? (endpoint += queryString.stringify(data))
    : (body = JSON.stringify(data))

  console.log('Body is', body)

  return {
    [CALL_API]: {
      endpoint,
      method,
      body,
      headers,
      types: [
        action.REQUEST,
        {
          type: action.SUCCESS,
          payload: (action, state, res) => {
            console.log('success')
            const contentType = res.headers.get('Content-Type')

            if (contentType && ~contentType.indexOf('json')) {
              return getJSON(res).then(jsonResponse => Immutable(jsonResponse))
            }
          }
        },
        {
          type: action.FAILURE,
          payload: (action, state, res) => {
            console.log('fail')
            const contentType = res.headers.get('Content-Type')

            if (contentType && ~contentType.indexOf('json')) {
              return getJSON(res).then(jsonResponse =>
                Immutable({
                  status: res.status,
                  message:
                    jsonResponse.error || 'Looks like something went wrong…'
                })
              )
            }
          }
        }
      ]
    }
  }
}

export default apiClient
