// test.js
var test = require('tape')
var proxyquire = require('proxyquire')
var ListFilesResponseFunction = require('../ListFilesResponseFunction.js')

test('undefined accessToken', function (t) {
  var session = {
    user: {

    }
  }
  var response = {
    tell: function(speech){
      t.equal(speech, 'Token is undefined, please link your account to use this skill ', ' It returns error meesage for undefined token')
      t.end()
    }
  }
  ListFilesResponseFunction(null, session, response)

})
