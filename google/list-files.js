  // listFiles.js
var google = require('googleapis')

// Purpose: To list the last ten used files to your google drive
// param(in):     auth: Authentication information of user
// param(in): callback: A function that handles the error or returns the names of the files that were last edited
module.exports = function listFiles (auth, callback) {
  var service = google.drive('v3')
  service.files.list({
    auth: auth,
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)'
  }, function (err, response) {
    if (err) {
      var apiError = 'The API return an error: ' + err
      callback(apiError)
      return
    }
    var files = response.files
    if (files.length === 0) {
      var noFilesFound = 'No files found.'
      callback(noFilesFound)
    } else {
      callback(null, files)
    }
  })
}
