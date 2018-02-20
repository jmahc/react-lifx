import { applyMiddleware, compose, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'

import createReducer from '@/store/createReducer'

const initialState = {}
const middlewares = [apiMiddleware]

const createStoreWithMiddleware = compose(applyMiddleware(...middlewares))(
  createStore
)

const store = createStoreWithMiddleware(
  createReducer(initialState),
  initialState
)

export default store
