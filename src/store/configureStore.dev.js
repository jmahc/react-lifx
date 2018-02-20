import { applyMiddleware, compose, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'

import createReducer from '@/store/createReducer'

const initialState = {}
const middlewares = [apiMiddleware]

// Enables the ReduxDevTool Chrome extension, if installed.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(...middlewares)
)(createStore)

const store = createStoreWithMiddleware(
  createReducer(initialState),
  initialState
)

// Enables Webpack hot module replacement for the store.
if (module.hot) {
  module.hot.accept('./createReducer', () => {
    store.replaceReducer(createReducer(initialState))
  })
}

export default store
