var google = require('googleapis')

module.exports = updateFileNoMD

function updateFileNoMD (auth, id, text, callback) {
  var service = google.drive('v3')
  service.files.update({
    fileId: id,
    media: {
      mimeType: 'text/plain',
      body: text
    },
    auth: auth
  }, function (err, response) {
    if (err) {
      callback(err)
      return
    }
    callback(null, response.name)
    return
  })
}
