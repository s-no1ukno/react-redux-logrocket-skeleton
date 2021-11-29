/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
// import { transitions, positions, Provider as AlertProvider } from 'react-alert'

// * Pages imports
import Home from 'pages/Home'
import NotFound from 'pages/NotFound'

// * Components imports

// * redux
import { useActions } from 'features/user'

const Router = () => {
  const { getCurrentSession } = useActions()

  // react alert configuration
  // const alertOptions = {
  //   position: positions.BOTTOM_RIGHT,
  //   transition: transitions.SCALE,
  // }

  useEffect(() => {
    getCurrentSession()
  }, [getCurrentSession])

  return (
    <BrowserRouter>
      {/* <AlertProvider template={} {...alertOptions}> */}
      <>
        {/* <Alert /> */}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </>
      {/* </AlertProvider> */}
    </BrowserRouter>
  )
}

export default Router
