import api from '../api'
import * as actions from '../actions'
import { user } from './schema'

export const USERS_REQUEST = 'USERS_REQUEST'
export const USERS_SUCCESS = 'USERS_SUCCESS'
export const USERS_FAILURE = 'USERS_FAILURE'
export const TOKEN_REQUEST = 'TOKEN_REQUEST'
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS'
export const TOKEN_FAILURE = 'TOKEN_FAILURE'
export const SET_TOKEN = 'SET_TOKEN'

const usersRequest = actions.REQUEST(USERS_REQUEST)
const usersSuccess = actions.SUCCESS(USERS_SUCCESS)
const usersFailure = actions.FAILURE(USERS_FAILURE)
const tokenRequest = actions.REQUEST(TOKEN_REQUEST)
const tokenSuccess = actions.SUCCESS(TOKEN_SUCCESS)
const tokenFailure = actions.FAILURE(TOKEN_FAILURE)

export const getUsers = () => (dispatch) => {
  dispatch(usersRequest())
  return api({
    url: '/users/'
  })
    .then(actions.normalizeEntities([ user ]))
    .then(normalised => dispatch(usersSuccess(normalised)))
    .catch(error => dispatch(usersFailure(error)))
}

export const getToken = (username, password) => (dispatch) => {
  dispatch(tokenRequest())
  return api({
    url: '/auth/token',
    method: 'post',
    data: { username, password }
  })
    .then(json => dispatch(tokenSuccess(json)))
    .catch(error => dispatch(tokenFailure(error)))
}

export const setToken = token => ({
  type: SET_TOKEN,
  payload: token
})
