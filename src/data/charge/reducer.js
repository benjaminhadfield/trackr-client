import * as actionTypes from './actions'

const initialState = {
  entities: {
    charge: {}
  },
  order: [],
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHARGES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.CHARGES_SUCCESS:
      return {
        ...state,
        entities: action.payload.entities,
        order: action.payload.result,
        loading: false
      }
    default:
      return state
  }
}
