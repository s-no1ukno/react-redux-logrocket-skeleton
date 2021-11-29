// eslint-disable no-param-reassign

import { createReducer } from 'utils'
import { ActionTypes } from './actionTypes'

const initialState = {
  type: null,
  message: null,
}

const AlertReducer = createReducer(initialState, {
  // * show alert
  [ActionTypes.showAlert]: (state, action) => {
    const { type, message } = action.payload
    // eslint-disable-next-line
    state.type = type
    state.message = message
  },
})

export default AlertReducer
