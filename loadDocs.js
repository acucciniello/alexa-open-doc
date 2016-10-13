// docs.js

var fs = require('fs')
var authorize = require('./google/authorize.js')
var listFiles = require('./google/listFiles.js')

module.exports = function loadDocs (clientSecretsFile, accessToken, SPEECH, fillOutput, sendResponseCB) {
  fs.readFile(clientSecretsFile.toString(), function processClientSecrets (err, content) {
    if (err) {
      console.log('Error Loading client secret file: ' + err)
      return
    } else {
      authorize(JSON.parse(content), listFiles, accessToken, SPEECH, fillOutput, sendResponseCB)
    }
  })
}

