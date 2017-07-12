const _ = require('lodash')

module.exports = {
  template: './templates',
  input: './swagger.yaml',
  output: './dist',
  language: '.cs',
  // adding data on global
  data: {

  },
  // adding functions on global
  functions: {
    _: require('lodash')
  }
}
