var fs = require('fs')
var authorize = require('./google/authorize.js')
var clientSecretsFile = 'client_secret.json'
var createFile = require('./google/createFile.js')
var setMimeType = require('./google/setMimeType.js')

module.exports = CreateFileFunction

function CreateFileFunction (intent, session, response) {
  var accessToken = JSON.stringify(session.user.accessToken)
  var fileToMake = intent.slots.fileName.value
  var fileType = intent.slots.fileType.value
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
        setMimeType(fileType, function (err, mime) {
          if (err) {
            response.tell(err)
            return err
          }
          createFile(oauthClient, fileToMake, mime, function (err, name) {
            var fileCreated = 'We created a file named: '
            if (err) {
              response.tell(err)
              return err
            }
            fileCreated = fileCreated + name
            response.tell(fileCreated)
            return
          })
        })
      })
    }
  })
}
