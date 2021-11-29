import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
// import useCountValue from './selectors'
import { ActionTypes } from './actionTypes'

const useActions = () => {
  const dispatch = useDispatch()

  const showAlert = useCallback(
    /**
     * @param {'info'|'error'|'success'} type The type of the alert to display
     * @param {string} message The message to be displayed
     */
    (type, message) => {
      dispatch({
        type: ActionTypes.showAlert,
        payload: { type, message },
      })
    },
    [dispatch]
  )
  return { showAlert }
}

export default useActions
