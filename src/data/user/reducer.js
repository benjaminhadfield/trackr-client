import * as actionTypes from './actions'

const initialState = {
  entities: {
    users: {}
  },
  token: '',
  name: '',
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.USERS_SUCCESS:
      return {
        ...state,
        entities: action.payload.entities,
        loading: false
      }
    case actionTypes.USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case actionTypes.TOKEN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        loading: false,
        error: null
      }
    case actionTypes.TOKEN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}
