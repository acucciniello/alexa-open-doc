var google = require('googleapis')

module.exports = exportFile

function exportFile (auth, id, callback) {
  var service = google.drive('v3')
  service.files.export({
    fileId: id,
    mimeType: 'text/plain',
    auth: auth
  }, function (err, response) {
    if (err) {
      callback(err)
      return
    }
    callback(null, response)
    return
  })
}
