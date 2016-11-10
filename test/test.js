// test.js
var test = require('tape')
// var proxyquire = require('proxyquire')
var ListFilesResponseFunction = require('../list-files-response-function.js')

test('failed to read client secrets file', function (t) {
  var session = {
    user: {

    }
  }
  var response = {
    tell: function (speech) {
      t.equal(speech, 'There was an issue reaching the skill', ' It returns error meesage for undefined token')
      t.end()
    }
  }
  ListFilesResponseFunction(null, session, response)
})
