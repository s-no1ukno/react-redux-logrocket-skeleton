const API_CONFIG = {
  uri: '',
}

// staging url
console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV)
console.log('process.env.TARGET_ENV :>> ', process.env.TARGET_ENV)

// development url
if (process.env.TARGET_ENV === 'development' || process.env.NODE_ENV === 'dev')
  API_CONFIG.uri = ''

// qa url
if (process.env.TARGET_ENV === 'staging') API_CONFIG.uri = ''

// prod url
if (process.env.TARGET_ENV === 'production') API_CONFIG.uri = ''

export default API_CONFIG
