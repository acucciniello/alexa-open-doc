var fs = require('fs')
var authorize = require('./google/authorize.js')
var clientSecretsFile = 'client_secret.json'
var createFile = require('./google/create-file.js')
var setMimeType = require('./google/set-mime-type.js')

module.exports = CreateFileFunction

// Purpose: To create a file in your google drive
// param (in): intent: given by Alexa, allows code to access parts of the intent request
// param (in): session: given by Alexa, allows code to access parts of the session in the Lambda request
// param (out): request: allows the user to change the response by Alexa
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
