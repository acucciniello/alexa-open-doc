var fs = require('fs')
var authorize = require('./google/authorize.js')
var clientSecretsFile = 'client_secret.json'
var createFile = require('./google/create-file.js')
var setMimeType = require('./google/set-mime-type.js')
var winston = require('winston')
require('winston-loggly-bulk')

winston.add(winston.transports.Loggly, {
  token: '9174ae8d-8205-4eeb-aa4e-96577486d880',
  subdomain: 'acucciniello',
  tags: ['Winston-NodeJS'],
  json: true
})

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
      var secretsError = 'There was an issue reaching the skill'
      winston.log('info', 'There was an issue reaching the skill')
      response.tell(secretsError)
      return
    } else {
      authorize(JSON.parse(content), accessToken, function (err, oauthClient) {
        if (err) {
          var noOauth = 'You must have a linked account to use this skill. Please use the alexa app to link your account.'
          winston.log('info', 'Failed to auth')
          response.tellWithLinkAccount(noOauth)
          return err
        }
        setMimeType(fileType, function (err, mime) {
          if (err) {
            winston.log('info', 'Failed to get MIME Type of file')
            response.tell(err)
            return err
          }
          createFile(oauthClient, fileToMake, mime, function (err, name) {
            var fileCreated = 'We created a file named: '
            if (err) {
              winston.log('info', 'Failed to create file')
              response.tell(err)
              return err
            }
            fileCreated = fileCreated + name
            winston.log('info', 'We created a file')
            response.tell(fileCreated)
            return
          })
        })
      })
    }
  })
}
