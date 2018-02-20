import Immutable from 'seamless-immutable'

import createReducer from '%/services/createReducer'

import { INDIVIDUAL_LIGHT } from './actions'

const initialState = Immutable({
  success: false,
  toggling: false
})

const reducer = createReducer(initialState, {
  [INDIVIDUAL_LIGHT.REQUEST]: state => {
    console.log('Inidivudal light REQUEST')
    return state.set('toggling', true)
  },
  [INDIVIDUAL_LIGHT.SUCCESS]: (state, { payload }) => {
    console.log('Individual light SUCCESS payload: ', payload)
    return state.set('toggling', false).set('success', true)
  },
  [INDIVIDUAL_LIGHT.FAILURE]: (state, { payload }) => {
    console.log('Individual light FAIL payload: ', payload)
    return state.set('toggling', false).set('success', false)
  }
})

export default reducer
