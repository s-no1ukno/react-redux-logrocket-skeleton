import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import LogRocket from 'logrocket'
import { Provider } from 'react-redux'
import promise from 'redux-promise-middleware'
import { UserReducer } from 'features/user'
import withProvider from './withProvider'

/**
 * Create root reducer, containing
 * all features of the application
 */
const rootReducer = combineReducers({
  user: UserReducer,
})

/**
 * Initialize Redux Dev Tools,
 * if they are installed in browser.
 */
/* eslint-disable no-underscore-dangle */
/** Use Redux compose, if browser doesn't have Redux devtools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
/* eslint-enable */

/** Create Redux store with root reducer and middleware included */
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promise, LogRocket.reduxMiddleware()))
)

/**
 * Create HOC, which wraps given Component with Redux Provider
 */
export default withProvider({ store, Provider })
