// listFiles.js
var google = require('googleapis')

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
