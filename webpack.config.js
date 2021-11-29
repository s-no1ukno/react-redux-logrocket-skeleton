const merge = require('webpack-merge')
const common = require('./webpack/webpack.common')

const envs = {
  development: 'dev',
  staging: 'qa',
  production: 'prod',
}
const env = envs[process.env.TARGET_ENV || 'development']

/* eslint-disable global-require,import/no-dynamic-require */
const envConfig = require(`./webpack/webpack.${env}.js`)

module.exports = merge(common, envConfig)
