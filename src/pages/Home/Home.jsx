import React from 'react'

// * redux imports
import { useAPI as useUserAPI } from 'features/user'

// * Component imports

// * Style Imports
import scss from './Home.module.scss'

const Home = () => {
  /*
  ------------------------------------------------------------------
  COMPONENT STATE AND SETUP
  ------------------------------------------------------------------
  */
  const { account } = useUserAPI()

  // * State

  /*
   * ------------------------------------------------------------------
   * HANLDER FUNCTIONS
   * ------------------------------------------------------------------
   */

  /*
   * ------------------------------------------------------------------
   * EFFECTS
   * ------------------------------------------------------------------
   */

  /*
   * ------------------------------------------------------------------
   * RENDER METHOD
   * ------------------------------------------------------------------
   */

  return <h1>Hello World, React App Running Successfully!</h1>
}

export default Home
