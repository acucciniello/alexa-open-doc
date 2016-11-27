var google = require('googleapis')

module.exports = exportFile

// Purpose: To export the file from your google drive to add text to it
// param(in):     auth: Authentication information of user
// param(in):       id: The id of the file that you want to update
// param(in): callback: A function that handles the error or returns the text of the file that was exported
function exportFile (auth, id, callback) {
  var service = google.drive('v3')
  service.files.export({
    fileId: id,
    mimeType: 'text/plain',
    auth: auth
  }, function (err, response) {
    if (err) {
      return callback(err)
    }
    return callback(null, response)
  })
}
