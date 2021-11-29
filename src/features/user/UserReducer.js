/* eslint-disable no-param-reassign */
import { Auth } from 'aws-amplify'
import { createReducer } from 'utils'
import { ActionTypes } from './actionTypes'
// import useUserAPI from './selectors'

const initialState = {
  isLoggedIn: false,
  pool: null,
  dbUser: null,
  currentCredentials: null,
}

const UserReducer = createReducer(initialState, {
  // * signup new user
  [`${ActionTypes.signupUser}_FULFILLED`]: (state, action) => {
    state.newUser = action.payload
  },
  [`${ActionTypes.signupUser}_REJECTED`]: (state, action) => {
    state.hasError = action.payload
  },

  // * confirm signup
  [`${ActionTypes.confirmSignUp}_FULFILLED`]: state => {
    state.userConfirmed = true
  },
  [`${ActionTypes.confirmSignUp}_REJECTED`]: (state, action) => {
    state.hasError = action.payload
  },

  // * get current session
  [`${ActionTypes.getCurrentSession}_PENDING`]: state => {
    state.isLoading = true
  },
  [`${ActionTypes.getCurrentSession}_FULFILLED`]: (state, action) => {
    state.isLoggedIn = true
    state.isLoading = false
    state.pool = action.payload

    Auth.currentCredentials().then(creds => {
      const essential = Auth.essentialCredentials(creds)
      localStorage.setItem('accessKeyId', essential.accessKeyId)
      localStorage.setItem('secretAccessKey', essential.secretAccessKey)
      localStorage.setItem('sessionToken', essential.sessionToken)
      localStorage.setItem('token', action.payload.idToken.jwtToken)
    })
  },
  [`${ActionTypes.getCurrentSession}_REJECTED`]: state => {
    state.isLoggedIn = false
    state.isLoading = false
    // state.hasError = action.payload
  },

  // * get current authenticated user from cognito
  [`${ActionTypes.getCogAuthUser}_FULFILLED`]: (state, action) => {
    state.currentAuthenticatedUser = action.payload
  },
  [`${ActionTypes.getCogAuthUser}_REJECTED`]: (state, action) => {
    state.isLoggedIn = false
    state.hasError = action.payload
  },

  // * get current credentials
  [`${ActionTypes.getCurrentCredentials}_PENDING`]: state => {
    state.isLoading = true
  },
  [`${ActionTypes.getCurrentCredentials}_FULFILLED`]: (state, action) => {
    state.currentCredentials = action.payload
    state.isLoading = false
  },
  [`${ActionTypes.getCurrentCredentials}_REJECTED`]: (state, action) => {
    state.isLoggedIn = false
    state.isLoading = false
    state.hasError = action.payload
  },

  // * login user
  [`${ActionTypes.loginUser}_FULFILLED`]: (state, action) => {
    state.pool = action.payload
    state.isLoggedIn = true
  },
  [`${ActionTypes.loginUser}_REJECTED`]: (state, action) => {
    state.isLoggedIn = false
    state.hasError = action.payload
  },

  // * tempLogin user
  [`${ActionTypes.tempLoginUser}_FULFILLED`]: state => {
    state.isTempLoggedIn = true
  },
  [`${ActionTypes.tempLoginUser}_REJECTED`]: (state, action) => {
    state.hasError = action.payload
  },

  // * logout user
  [`${ActionTypes.logoutUser}_FULFILLED`]: state => {
    state.isLoggedIn = false
    state.pool = null
  },
  [`${ActionTypes.logoutUser}_REJECTED`]: (state, action) => {
    state.hasError = action.payload
  },

  // * reset password submit request
  [`${ActionTypes.forgotPassword}_FULFILLED`]: state => {
    state.resetEmailSent = true
  },
  [`${ActionTypes.forgotPassword}_REJECTED`]: (state, action) => {
    state.hasError = action.payload
  },

  // * reset password submit
  [`${ActionTypes.forgotPasswordSubmit}_FULFILLED`]: state => {
    state.passwordUpdated = true
  },
  [`${ActionTypes.forgotPasswordSubmit}_REJECTED`]: (state, action) => {
    state.hasError = action.payload
  },

  // * change password
  [`${ActionTypes.changePassword}_FULFILLED`]: state => {
    state.passwordChangeSubmitted = true
  },
  [`${ActionTypes.changePassword}_REJECTED`]: (state, action) => {
    state.hasError = action.payload
  },

  // * update user
  [`${ActionTypes.updateCurrentUser}_FULFILLED`]: state => {
    state.userUpdated = true
  },
  [`${ActionTypes.updateCurrentUser}_REJECTED`]: (state, action) => {
    state.hasError = action.payload
  },

  // * get current dbUser
  [`${ActionTypes.getCurrentDBUser}_FULFILLED`]: (state, action) => {
    const [result] = action.payload
    console.log('result :>> ', result)
    if (!result.success) {
      state.hasError = result.message || result.data
    } else {
      const user = result.data
      state.dbUser = user
      if (user.currentAccount) state.account = user.currentAccount
    }
  },
  [`${ActionTypes.getCurrentDBUser}_REJECTED`]: (state, action) => {
    state.isLoggedIn = false
    state.hasError = action.payload
  },

  // * list current users accounts
  [`${ActionTypes.listUserAccounts}_FULFILLED`]: (state, action) => {
    const [result] = action.payload

    state.accounts = result.data
    // If account is invalid, and there are multiple accounts, select first one from list.
    if (!state.account && result.data.length) state.account = result.data[0]
  },
  [`${ActionTypes.listUserAccounts}_REJECTED`]: (state, action) => {
    state.hasError = action.payload
  },

  // * update cognito password
  [`${ActionTypes.updateCognitoPw}_FULFILLED`]: state => {
    state.passwordUpdated = true
  },
  [`${ActionTypes.updateCognitoPw}_REJECTED`]: (state, action) => {
    state.isLoggedIn = false
    state.hasError = action.payload
  },

  // * resend cognito verification email
  [`${ActionTypes.cognitoResendEmail}_FULFILLED`]: state => {
    state.verificationEmailSent = true
  },
  [`${ActionTypes.cognitoResendEmail}_REJECTED`]: (state, action) => {
    state.isLoggedIn = false
    state.hasError = action.payload
  },

  // * reset error state
  [ActionTypes.resetErrorState]: (state, action) => {
    state.hasError = action.payload
  },

  // * update users current account
  [`${ActionTypes.updateUserAccount}_PENDING`]: state => {
    state.isLoading = true
  },
  [`${ActionTypes.updateUserAccount}_FULFILLED`]: (state, action) => {
    const [result] = action.payload
    if (result.success)
      state.updatingUserAccount = state.updatingUserAccount + 1 || 1
    state.isLoading = false
  },
  [`${ActionTypes.updateUserAccount}_REJECTED`]: (state, action) => {
    state.hasError = action.payload
    state.isLoading = false
  },
})

export default UserReducer
