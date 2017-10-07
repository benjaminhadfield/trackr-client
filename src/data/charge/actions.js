import api from '../api'
import * as actions from '../actions'
import { charge } from './schema'

export const CHARGES_REQUEST = 'CHARGES_REQUEST'
export const CHARGES_SUCCESS = 'CHARGES_SUCCESS'
export const CHARGES_FAILURE = 'CHARGES_FAILURE'
export const CREATE_CHARGE_REQUEST = 'CREATE_CHARGE_REQUEST'
export const CREATE_CHARGE_SUCCESS = 'CREATE_CHARGE_SUCCESS'
export const CREATE_CHARGE_FAILURE = 'CREATE_CHARGE_FAILURE'
export const MARK_AS_PAID_REQUEST = 'MARK_AS_PAID_REQUEST'
export const MARK_AS_PAID_SUCCESS = 'MARK_AS_PAID_SUCCESS'
export const MARK_AS_PAID_FAILURE = 'MARK_AS_PAID_FAILURE'

const chargesRequest = actions.REQUEST(CHARGES_REQUEST)
const chargesSuccess = actions.SUCCESS(CHARGES_SUCCESS)
const chargesFailure = actions.FAILURE(CHARGES_FAILURE)
const createChargeRequest = actions.REQUEST(CREATE_CHARGE_REQUEST)
const createChargeSuccess = actions.SUCCESS(CREATE_CHARGE_SUCCESS)
const createChargeFailure = actions.FAILURE(CREATE_CHARGE_FAILURE)
const markAsPaidRequest = actions.REQUEST(MARK_AS_PAID_REQUEST)
const markAsPaidSuccess = actions.SUCCESS(MARK_AS_PAID_SUCCESS)
const markAsPaidFailure = actions.FAILURE(MARK_AS_PAID_FAILURE)

export const getCharges = () => (dispatch) => {
  dispatch(chargesRequest())
  return api({
    url: '/charges/'
  })
    .then(actions.normalizeEntities([ charge ]))
    .then(normalised => dispatch(chargesSuccess(normalised)))
    .catch(error => chargesFailure(error))
}

export const createCharge = ({ value, splitWith, title, message }) => (dispatch) => {
  dispatch(createChargeRequest())
  return api({
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

export const markAsPaid = (id) => (dispatch) => {
  dispatch(markAsPaidRequest())
  return api({
    url: `/charges/${id}/paid/`
  })
    .then(actions.normalizeEntities({ charge }))
    .then(normalised => dispatch(markAsPaidSuccess(normalised)))
    .catch(error => dispatch(markAsPaidFailure(error)))
}
