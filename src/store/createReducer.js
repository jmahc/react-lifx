import { reducer as form } from 'redux-form'
import {
  combineReducers,
  routerReducer as routing
} from 'redux-seamless-immutable'

import lights from '%/state/lights/reducer'

import individual from '@/components/lifx/Bulb/state/reducer'

const createReducer = initialState => {
  const mainReducer = combineReducers({
    form,
    // Reducers go here!
    individual,
    lights,
    // Routing always goes last!
    routing
  })

  const rootReducer = (state, action) => mainReducer(state, action)

  return rootReducer
}

export default createReducer
