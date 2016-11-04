var fs = require('fs')
var authorize = require('./google/authorize.js')
var clientSecretsFile = 'client_secret.json'
var searchFile = require('./google/searchFile.js')
var updateFileNoMD = require('./google/updateFileNoMD.js')

module.exports = EditFileFunction

function EditFileFunction (intent, session, response) {
  var accessToken = JSON.stringify(session.user.accessToken)
  var name = intent.slots.fileName.value
  var text = intent.slots.inputText.value
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
          updateFileNoMD(oauthClient, id, text, function (err, updatedFile) {
            if (err) {
              response.tell(err)
              return err
            }
            var fileUpdated = 'We updated the file named ' + updatedFile + ' with your input of ' + text
            response.tell(fileUpdated)
            return
          })
        })
      })
    }
  })
}
