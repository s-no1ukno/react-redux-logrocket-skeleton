import React from 'react'
import { Link } from 'react-router-dom'
import scss from './NotFound.module.scss'

const NotFound = () => (
  <>
    <div className={[scss.errorContainer, scss.errorPage].join(' ')}>
      <div className={scss.error}>
        <div className={scss.errorColumn}>
          <span className={scss.errorHeading}>Oops!</span>
          <span className={scss.errorText}>
            We cannot find the page you are looking for.
          </span>
          <span className={scss.errorText}>Error: Route Not Found!</span>
          <Link className={[scss.errorButton, scss.secondary].join(' ')} to='/'>
            Back to Home/Login
          </Link>
        </div>
        <div className={scss.gridCenter}>
          <div>
            <span className={scss['logo-primary']}>MyAssetMap</span>
            <span className={scss['logo-secondary']}>D.M.S</span>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default NotFound
