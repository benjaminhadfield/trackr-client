import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './data/reducer'

export default (initialState) => {
  const middleware = [thunk]

  if (process.env.NODE_ENV === 'development') {
    middleware.push(require('redux-logger').default)
  }

  return createStore(
    reducer,
    /* for redux dev-tools, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
  )
}
