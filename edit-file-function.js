var fs = require('fs')
var authorize = require('./google/authorize.js')
var clientSecretsFile = 'client_secret.json'
var searchFile = require('./google/search-file.js')
var updateFileNoMD = require('./google/update-file-no-md.js')
var exportFile = require('./google/export-file.js')
var addText = require('./helpers/add-text.js')

module.exports = EditFileFunction

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
          var noOauth = 'We failed getting an oauthClient'
          response.tell(noOauth)
          return err
        }
        searchFile(oauthClient, name, function (err, id) {
          if (err) {
            response.tell(err)
            return err
          }
          exportFile(oauthClient, id, function (err, fileText) {
            if (err) {
              response.tell(err)
              return err
            }
            fileText = addText(fileText, inputString)
            response.tell('HEy')
            updateFileNoMD(oauthClient, id, fileText, function (err, updatedFile) {
              if (err) {
                response.tell(err)
                return err
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
