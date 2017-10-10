import api from '../api'
import * as actions from '../actions'
import { user } from './schema'

export const USERS_REQUEST = 'USERS_REQUEST'
export const USERS_SUCCESS = 'USERS_SUCCESS'
export const USERS_FAILURE = 'USERS_FAILURE'
export const CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST'
export const CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS'
export const CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE'
export const TOKEN_REQUEST = 'TOKEN_REQUEST'
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS'
export const TOKEN_FAILURE = 'TOKEN_FAILURE'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_USER = 'SET_USER'

const usersRequest = actions.REQUEST(USERS_REQUEST)
const usersSuccess = actions.SUCCESS(USERS_SUCCESS)
const usersFailure = actions.FAILURE(USERS_FAILURE)
const getCurrentUserRequest = actions.REQUEST(CURRENT_USER_REQUEST)
const getCurrentUserSuccess = actions.SUCCESS(CURRENT_USER_SUCCESS)
const getCurrentUserFailure = actions.FAILURE(CURRENT_USER_FAILURE)
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

export const getCurrentUser = () => (dispatch) => {
  dispatch(getCurrentUserRequest())
  return api({
    url: '/users/me/'
  })
    .then(actions.normalizeEntities({ user }))
    .then(normalised => dispatch(getCurrentUserSuccess(normalised)))
    .catch(error => dispatch(getCurrentUserFailure(error)))
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

export const setUser = user => ({
  type: SET_USER,
  payload: user
})
