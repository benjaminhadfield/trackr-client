import api from '../api'
import * as actions from '../actions'
import { charge } from './schema'

export const CHARGES_REQUEST = 'CHARGES_REQUEST'
export const CHARGES_SUCCESS = 'CHARGES_SUCCESS'
export const CHARGES_FAILURE = 'CHARGES_FAILURE'

const chargeRequest = actions.REQUEST(CHARGES_REQUEST)
const chargeSuccess = actions.SUCCESS(CHARGES_SUCCESS)
const chargeFailure = actions.FAILURE(CHARGES_FAILURE)

export const getCharges = () => (dispatch) => {
  dispatch(chargeRequest())
  api({
    url: '/charges/'
  })
    .then(actions.normalizeEntities([ charge ]))
    .then(normalised => dispatch(chargeSuccess(normalised)))
    .catch(error => chargeFailure(error))
}
