// builds a response to Alexa skill interface and
// tells Alexa how to respond to users request
var listFiles = require('./google/listFiles.js')
var fs = require('fs')
var authorize = require('./google/authorize.js')
var clientSecretsFile = 'client_secret.json'

module.exports = ListFilesResponseFunction

function ListFilesResponseFunction (intent, session, response) {
  var accessToken = JSON.stringify(session.user.accessToken)
  if (accessToken === undefined) {
    var undefinedToken = 'Token is undefined, please link your account to use this skill '
    response.tell(undefinedToken)
    return
  }
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
        listFiles(oauthClient, function (err, files) {
          var fileNames = 'Here is your list of files: '
          if (err) {
            response.tell(err)
            return err
          }
          for (var i = 0; i < files.length; i++) {
            fileNames = fileNames + ' ' + files[i].name
          }
          response.tell(fileNames)
        })
      })
    }
  })
}