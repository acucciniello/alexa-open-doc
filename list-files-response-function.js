// builds a response to Alexa skill interface and
// tells Alexa how to respond to users request
var listFiles = require('./google/list-files.js')
var fs = require('fs')
var authorize = require('./google/authorize.js')
var clientSecretsFile = 'client_secret.json'

module.exports = ListFilesResponseFunction

// Purpose: To list the last ten files in your google drive account
// param (in): intent: given by Alexa, allows code to access parts of the intent request
// param (in): session: given by Alexa, allows code to access parts of the session in the Lambda request
// param (out): request: allows the user to change the response by Alexa

function ListFilesResponseFunction (intent, session, response) {
  var accessToken = JSON.stringify(session.user.accessToken)
  // Read the client_secret.json file for information needed to authorize a user.
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
          return err
        }
        listFiles(oauthClient, function (err, files) {
          var fileNames = 'Here is your list of files: '
          if (err) {
            response.tell(err)
            return err
          }
          for (var i = 0; i < files.length; i++) {
            fileNames = fileNames + ' ' + files[i].name
          }
          // Alexa outputs the file names retrieved from google drive
          response.tell(fileNames)
          return
        })
      })
    }
  })
}
