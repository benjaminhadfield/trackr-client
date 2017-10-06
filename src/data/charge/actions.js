import api from '../api'
import * as actions from '../actions'
import { charge } from './schema'

export const CHARGES_REQUEST = 'CHARGES_REQUEST'
export const CHARGES_SUCCESS = 'CHARGES_SUCCESS'
export const CHARGES_FAILURE = 'CHARGES_FAILURE'
export const CREATE_CHARGE_REQUEST = 'CREATE_CHARGE_REQUEST'
export const CREATE_CHARGE_SUCCESS = 'CREATE_CHARGE_SUCCESS'
export const CREATE_CHARGE_FAILURE = 'CREATE_CHARGE_FAILURE'

const chargesRequest = actions.REQUEST(CHARGES_REQUEST)
const chargesSuccess = actions.SUCCESS(CHARGES_SUCCESS)
const chargesFailure = actions.FAILURE(CHARGES_FAILURE)
const createChargeRequest = actions.REQUEST(CREATE_CHARGE_REQUEST)
const createChargeSuccess = actions.SUCCESS(CREATE_CHARGE_SUCCESS)
const createChargeFailure = actions.FAILURE(CREATE_CHARGE_FAILURE)

export const getCharges = () => (dispatch) => {
  dispatch(chargesRequest())
  api({
    url: '/charges/'
  })
    .then(actions.normalizeEntities([ charge ]))
    .then(normalised => dispatch(chargesSuccess(normalised)))
    .catch(error => chargesFailure(error))
}

export const createCharge = ({ value, splitWith, title, message }) => (dispatch) => {
  dispatch(createChargeRequest())
  api({
    url: '/charges/',
    method: 'post',
    data: {
      value,
      split_with: splitWith,
      title,
      message
    }
  })
    .then(json => dispatch(createChargeSuccess()))
    .catch(error => dispatch(createChargeFailure(error)))
}
