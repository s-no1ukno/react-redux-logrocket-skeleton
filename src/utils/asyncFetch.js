/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
import PropTypes from 'prop-types'
import { addQueryVar, signRequest } from './api'

/**
 * Function used to asynchronously fetch multiple items in a row, only returning once ALL fetches have been completed.
 * Can also be used to paginate results.
 *
 * @param  {Object} pool - user pool object returned from cognito
 * @param  {Array} fetchObjects - array of objects for request { url, method, body }
 * @param {Function} showAlert - showAlert hook
 *
 * @example
 * ```js
 * asyncFetch({ userPool, fetchObjects })
 * ```
 */
const asyncFetch = ({
  pool,
  account = null,
  fetchObjects,
  showAlert = null,
}) => {
  const getAuth = async url => {
    let cogID
    if (pool.idToken) cogID = pool.idToken.payload.sub
    if (pool.attributes) cogID = pool.attributes.sub

    if (account === null) {
      const userUrl = addQueryVar(url, 'userID', cogID)
      return userUrl
    }

    const userUrl = addQueryVar(url, 'userID', cogID)
    const urlWithAccount = addQueryVar(userUrl, 'accountID', account.ID)
    return urlWithAccount
  }

  const doFetch = async (userUrl, params) => {
    const contentType = 'application/json'
    let options

    if (params.method === 'GET') {
      options = {
        method: params.method,
        headers: signRequest(userUrl).headers,
      }
    } else if (params.method === 'POST') {
      options = {
        method: params.method,
        body: JSON.stringify(params.body),
        headers: signRequest(
          userUrl,
          params.method,
          JSON.stringify(params.body),
          contentType
        ).headers,
      }
    }
    const response = await fetch(userUrl, options).catch(err => {
      throw new Error(err)
    })

    const json = await response.json()
    if (!json.success)
      showAlert(
        'error',
        typeof json.data === 'string'
          ? `${json.message} :: ${json.data}`
          : json.message
      )
    if (json.success && json.message !== '') showAlert('success', json.message)
    return json
  }

  const processFetchObjects = fetchObjs =>
    new Promise((resolve, reject) => {
      console.log('fetchObjects: ', fetchObjs)
      const promises = fetchObjs.map(async obj => {
        if (obj.paginate) {
          let responseData = []
          let keepGoing = true
          let start = 0

          while (keepGoing) {
            let userUrl = getAuth(obj.url)
            userUrl += `&limit=${obj.paginate}&start=${start}`
            const response = doFetch(userUrl, obj).catch(err =>
              reject(new Error(err))
            )

            if (
              typeof response.data !== 'undefined' &&
              Array.isArray(response.data)
            ) {
              responseData = [...responseData, ...response.data]
            } else {
              keepGoing = false
              return response
            }

            start += obj.paginate
            if (response.data.length < obj.pageinate) {
              keepGoing = false

              // build and return object
              return {
                success: response.success,
                message: response.message,
                data: responseData,
              }
            }

            if (!response.success) keepGoing = false
            if (!response) keepGoing = false
          }
        } else {
          const userUrl = await getAuth(obj.url)
          return doFetch(userUrl, obj)
        }
        return null
      })
      resolve(Promise.all(promises).catch(err => new Error(err)))
    })

  return processFetchObjects(fetchObjects)
}

asyncFetch.propTypes = {
  pool: PropTypes.object.isRequired,
  fetchObjects: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      method: PropTypes.oneOf(['GET', 'POST']).isRequired,
      body: PropTypes.object,
    })
  ).isRequired,
}

export default asyncFetch
