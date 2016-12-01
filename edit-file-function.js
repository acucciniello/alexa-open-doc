var fs = require('fs')
var authorize = require('./google/authorize.js')
var clientSecretsFile = 'client_secret.json'
var searchFile = require('./google/search-file.js')
var updateFileNoMD = require('./google/update-file-no-md.js')
var exportFile = require('./google/export-file.js')
var addText = require('./helpers/add-text.js')

module.exports = EditFileFunction

// Purpose: To edit to the end of a file in your google drive
// param (in): intent: given by Alexa, allows code to access parts of the intent request
// param (in): session: given by Alexa, allows code to access parts of the session in the Lambda request
// param (out): request: allows the user to change the response by Alexa
function EditFileFunction (intent, session, response) {
  var accessToken = JSON.stringify(session.user.accessToken)
  var name = intent.slots.fileName.value
  var inputString = intent.slots.inputText.value
  fs.readFile(clientSecretsFile.toString(), function processClientSecrets (err, content) {
    if (err) {
      console.log('Error Loading client secret file: ' + err)
      var secretsError = 'There was an issue reaching the skill'
      response.tell(secretsError)
      return
    } else {
      authorize(JSON.parse(content), accessToken, function (err, oauthClient) {
        if (err) {
          var noOauth = 'You must have a linked account to use this skill. Please use the alexa app to link your account.'
          response.tellWithLinkAccount(noOauth)
          return
        }
        searchFile(oauthClient, name, function (err, id) {
          if (err) {
            response.tell(err)
            return
          }
          exportFile(oauthClient, id, function (err, fileText) {
            if (err) {
              response.tell(err)
              return
            }
            fileText = addText(fileText, inputString)
            updateFileNoMD(oauthClient, id, fileText, function (err, updatedFile) {
              if (err) {
                response.tell(err)
                return
              }
              var fileUpdated = 'We updated the file named ' + updatedFile + ' with your input of ' + inputString
              response.tell(fileUpdated)
              return
            })
          })
        })
      })
    }
  })
}
