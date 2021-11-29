import aws4 from 'aws4'

const mamApis = [
  new RegExp('https://(dv|qa|pd)-fot-tiles.s3.amazonaws.com/'),
  new RegExp('https://my-asset-map-data.s3.amazonaws.com/'),
  new RegExp('https://rg91b1juf3.execute-api.us-east-1.amazonaws.com/'),
  new RegExp('https://egd4avkav9.execute-api.us-east-1.amazonaws.com/'),
  new RegExp('https://99qya3ubuj.execute-api.us-east-1.amazonaws.com/'), // qa
]

function apiCheck(url) {
  return mamApis.map(mamApi => mamApi.test(url)).includes(true)
}

function signRequest(
  url,
  method = 'GET',
  body = null,
  contentType = null
  // resourceType = null
) {
  const urlObj = new URL(url)
  const opts = {
    host: urlObj.host,
    path: urlObj.pathname + urlObj.search,
  }

  if (body !== null && method !== 'GET') {
    opts.body = body
    opts.method = method
    opts.headers = {
      'Content-Type': contentType,
    }
  }
  if (method === 'DELETE' || method === 'GET') {
    opts.method = method
  }

  if (apiCheck(url)) {
    opts.region = 'us-east-1'
    if (new RegExp('.*.?s3.amazonaws.com').test(opts.host)) {
      opts.service = 's3'
    } else {
      opts.service = 'execute-api'
    }

    // credentials set in getCurrentSession_fulfilled of user reducer
    const accessKeyId = localStorage.getItem('accessKeyId')
    const secretAccessKey = localStorage.getItem('secretAccessKey')
    const sessionToken = localStorage.getItem('sessionToken')

    aws4.sign(opts, {
      secretAccessKey,
      accessKeyId,
      sessionToken,
    })
  }
  const headers = opts.headers || {}

  if ('Host' in headers) {
    delete headers.Host // consider an unsafe header by browsers
  }
  if ('Content-Length' in headers) {
    delete headers['Content-Length'] // consider an unsafe header by browsers
  }
  return { url, headers, opts }
}

function addQueryVar(url, key, value) {
  const encodedKey = encodeURI(key)
  const encodedValue = encodeURI(value)

  const querySplit = url.split('?')
  const urlRoot = querySplit[0]
  let query = ''
  // eslint-disable-next-line prefer-destructuring
  if (querySplit.length === 2) query = querySplit[1]

  const kvp = query.split('&')

  let i = kvp.length
  let x

  // eslint-disable-next-line no-plusplus
  while (i--) {
    x = kvp[i].split('=')

    if (x[0] === encodedKey) {
      x[1] = encodedValue
      kvp[i] = x.join('=')
      break
    }
  }

  if (i < 0) {
    kvp[kvp.length] = [encodedKey, encodedValue].join('=')
  }

  return `${urlRoot}?${kvp.join('&')}`.replace('?&', '?')
}

export { apiCheck, signRequest, addQueryVar }
