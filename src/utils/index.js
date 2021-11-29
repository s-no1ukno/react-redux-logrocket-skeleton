import { produce } from 'immer'

export const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) => {
  // eslint-disable-next-line
  if (handlers.hasOwnProperty(action.type)) {
    const test = produce(state, draft => {
      const handler = handlers[action.type]
      return handler(draft, action)
    })
    // eslint-disable-next-line
    console.log(`CREATE REDUCER - ${action.type}`, initialState, test)
    return test
  }
  return state
}

export { default as asyncFetch } from './asyncFetch'
