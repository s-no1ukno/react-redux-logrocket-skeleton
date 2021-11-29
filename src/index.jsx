import React from 'react'
import ReactDOM from 'react-dom'
import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'
import { configAmplify } from 'config/amplify'
import { configFontAwesome } from 'config/font-awesome'
import withReduxFeatures from './withReduxFeatures'
import Router from './Router'
import './index.css'

/** Wrap App component with store providers */
const WrappedApp = withReduxFeatures(Router)

// LogRocket Configuration
if (process.env.NODE_ENV !== 'development')
  setupLogRocketReact(LogRocket.init('myassetmap-dms/dms'))

configAmplify()
configFontAwesome()

ReactDOM.render(<WrappedApp />, document.getElementById('root'))
