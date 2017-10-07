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
    case actionTypes.CHARGES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case actionTypes.MARK_AS_PAID_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          charges: { ...state.entities.charges, [action.payload.result.id]: action.payload.result }
        }
      }
    case actionTypes.MARK_AS_PAID_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
