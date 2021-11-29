import Amplify from '@aws-amplify/core'
import { Auth } from '@aws-amplify/auth'

import Storage from '@aws-amplify/storage'
import config from './config'

export function configAmplify() {
  const awsConfig = {
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    },
  }

  Amplify.configure(awsConfig)
  Auth.configure(awsConfig)
}

export function SetS3Config(bucket, level) {
  Storage.configure({
    bucket,
    level,
    region: 'us-east-1',
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  })
}
