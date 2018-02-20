import Immutable from 'seamless-immutable'

import createReducer from '%/services/createReducer'

import { LIGHTS } from './actions'
// import lightsJson from './lights.json'

const initialState = Immutable({
  // data: lightsJson,
  data: {},
  fetching: false
})

const reducer = createReducer(initialState, {
  [LIGHTS.REQUEST]: state => {
    return state.set('fetching', true)
  },
  [LIGHTS.SUCCESS]: (state, { payload }) => {
    return state.set('fetching', false).set('data', payload)
  },
  [LIGHTS.FAILURE]: (state, { payload }) => {
    return state.set('fetching', false).set('data', {})
  }
})

export default reducer
