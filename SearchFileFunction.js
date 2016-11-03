var fs = require('fs')
var authorize = require('./google/authorize.js')
var clientSecretsFile = 'client_secret.json'
var searchFile = require('./google/searchFile.js')

module.exports = SearchFileFunction

function SearchFileFunction (intent, session, response) {
  var accessToken = JSON.stringify(session.user.accessToken)
  var name = intent.slots.fileName.value
  fs.readFile(clientSecretsFile.toString(), function processClientSecrets (err, content) {
    if (err) {
      console.log('Error Loading client secret file: ' + err)
      var secretsError = 'There was an issue reaching the skill'
      response.tell(secretsError)
      return
    } else {
      authorize(JSON.parse(content), accessToken, function (err, oauthClient) {
        if (err) {
          var noOauth = 'We failed getting an oauthClient'
          response.tell(noOauth)
          return err
        }
        searchFile(oauthClient, name, function (err, id) {
          if (err) {
            response.tell(err)
            return err
          }
          response.tell(id)
          return
        })
      })
    }
  })
}
