import axios from 'axios'
import qs from 'qs'
import deepMapKeys from 'deep-map-keys'
import camelCase from 'camel-case'
import snakeCase from 'snake-case'

/**
 * All API requests go through this function before being sent to the server.
 * Perform pre/post-processing here to apply it to every API request.
 *
 * The correct base URL for the environment is prepended to the passed URL.
 *
 * Query params and requests to the server are snake_cased.
 * Responses from the server are camelCased.
 *
 * @param {object} config - An axios config object. The only required parameter is `url`.
 * https://github.com/mzabriskie/axios#request-config
 * @return {Promise}
 */
export default ({ url, ...config }) => axios({
  ...config,
  url: process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_VERSION + url,
  paramsSerializer: params => qs.stringify(deepMapKeys(params, snakeCase)),
  // transformRequest: data => deepMapKeys(data, snakeCase),  // TODO: Add this back in once extract api changes it's expected shape back to snake-case
  transformResponse: (data) => {
    // Only transform data is data exists, otherwise some responses will fail (e.g. HTTP 204).
    if (data) return deepMapKeys(JSON.parse(data), camelCase)
  }
})
