import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Auth } from 'aws-amplify'
import API_CONFIG from 'config/api_url'
import asyncFetch from 'utils/asyncFetch'
import { useAPI as useUserAPI } from 'features/user'
import { useActions as useAlertActions } from 'features/alert'
import { ActionTypes } from './actionTypes'

const useActions = () => {
  const dispatch = useDispatch()
  const { pool, account } = useUserAPI()
  const { showAlert } = useAlertActions()

  const signupUser = useCallback(
    ({ email: username }) => {
      dispatch({
        type: ActionTypes.signupUser,
        payload: Auth.signUp({ username }),
      })
    },
    [dispatch]
  )

  const getCurrentSession = useCallback(() => {
    dispatch({
      type: ActionTypes.getCurrentSession,
      payload: Auth.currentSession(),
    })
  }, [dispatch])

  const getCurrentCredentials = useCallback(() => {
    dispatch({
      type: ActionTypes.getCurrentCredentials,
      payload: Auth.currentCredentials(),
    })
  }, [dispatch])

  const getCurrentDBUser = useCallback(
    cognitoUUID => {
      const url = `${API_CONFIG.uri}init`
      const method = 'POST'
      const body = {
        cognitoUUID,
      }

      const fetchObjects = [{ url, method, body }]

      dispatch({
        type: ActionTypes.getCurrentDBUser,
        payload: asyncFetch({ pool, account, fetchObjects, showAlert }),
      })
    },
    [dispatch]
  )

  const listUserAccounts = useCallback(() => {
    const url = `${API_CONFIG.uri}user/accounts`
    const method = 'POST'
    const body = {}
    const fetchObjects = [{ url, method, body }]

    dispatch({
      type: ActionTypes.listUserAccounts,
      payload: asyncFetch({ pool, account, fetchObjects, showAlert }),
    })
  }, [dispatch])

  const confirmSignUp = useCallback(
    ({ email, confirmationCode }) => {
      dispatch({
        type: ActionTypes.confirmSignUp,
        payload: Auth.confirmSignUp(email, confirmationCode),
      })
    },
    [dispatch]
  )

  const loginUser = useCallback(
    ({ email, password }) => {
      dispatch({
        type: ActionTypes.loginUser,
        payload: Auth.signIn(email, password),
      })
    },
    [dispatch]
  )

  const tempLoginUser = useCallback(
    email => {
      dispatch({
        type: ActionTypes.tempLoginUser,
        payload: Auth.signIn(email, 'MyAssetMapDMS1!'),
      })
    },
    [dispatch]
  )

  const logoutUser = useCallback(() => {
    dispatch({
      type: ActionTypes.logoutUser,
      payload: Auth.signOut(),
    })
  }, [dispatch])

  const forgotPassword = useCallback(
    email => {
      dispatch({
        type: ActionTypes.forgotPassword,
        payload: Auth.forgotPassword(email),
      })
    },
    [dispatch]
  )

  const forgotPasswordSubmit = useCallback(
    (email, code, password) => {
      dispatch({
        type: ActionTypes.forgotPasswordSubmit,
        payload: Auth.forgotPasswordSubmit(email, code, password),
      })
    },
    [dispatch]
  )

  const changePassword = useCallback(
    (cognitoUserObject, oldPass, newPass) => {
      dispatch({
        type: ActionTypes.changePassword,
        payload: Auth.changePassword(cognitoUserObject, oldPass, newPass),
      })
    },
    [dispatch]
  )

  const updateCurrentUser = useCallback(
    /**
     * ACTION Updates a user in the database
     *
     */
    userObject => {
      const url = `${API_CONFIG.uri}user/update`
      const method = 'POST'
      const body = { options: userObject }

      const fetchObjects = [{ url, method, body }]

      dispatch({
        type: ActionTypes.updateCurrentUser,
        payload: asyncFetch({ pool, account, fetchObjects, showAlert }),
      })
    },
    [dispatch]
  )

  const getCogAuthUser = useCallback(() => {
    dispatch({
      type: ActionTypes.getCogAuthUser,
      payload: Auth.currentAuthenticatedUser(),
    })
  }, [dispatch])

  /**
   * Takes the user
   */

  const updateCogPassword = useCallback(
    ({ user, password }) => {
      dispatch({
        type: ActionTypes.updateCognitoPw,
        payload: Auth.completeNewPassword(user, password),
      })
    },
    [dispatch]
  )

  const resendCogEmail = useCallback(
    email => {
      console.log('ACTION EMAIL', email)
      dispatch({
        type: ActionTypes.cognitoResendEmail,
        payload: Auth.resendSignUp(email),
      })
    },
    [dispatch]
  )

  const resetErrorState = useCallback(() => {
    dispatch({
      type: ActionTypes.resetErrorState,
      payload: null,
    })
  }, [dispatch])

  const updateUserAccount = useCallback(
    targetAccountID => {
      const url = `${API_CONFIG.uri}user/account/update`
      const method = 'POST'
      const body = { id: targetAccountID }

      const fetchObjects = [{ url, method, body }]

      dispatch({
        type: ActionTypes.updateUserAccount,
        payload: asyncFetch({ pool, account, fetchObjects, showAlert }),
      })
    },
    [dispatch]
  )

  return {
    signupUser,
    getCurrentSession,
    getCurrentCredentials,
    listUserAccounts,
    confirmSignUp,
    getCogAuthUser,
    loginUser,
    tempLoginUser,
    logoutUser,
    forgotPassword,
    forgotPasswordSubmit,
    changePassword,
    updateCurrentUser,
    getCurrentDBUser,
    updateCogPassword,
    resendCogEmail,
    resetErrorState,
    updateUserAccount,
  }
}

export default useActions
