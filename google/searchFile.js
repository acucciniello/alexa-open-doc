var google = require('googleapis')

module.exports = searchFile

function searchFile (auth, name, callback) {
  var service = google.drive('v3')
  var fileName = 'name contains ' + "'" + name + "'"
  service.files.list({
    auth: auth,
    q: fileName,
    fields: 'nextPageToken, files(id, name)',
    spaces: 'drive'
  }, function (err, res) {
    if (err) {
      var errMsg = 'We are in the error check' + err
      callback(errMsg)
      return
    } else {
      // callback(null, 'We made it into the res: ' + fileName)
      // return
      res.files.forEach(function (file) {
        callback(null, file.id)
        return
      })
      var noMatchingFile = 'We failed to find a matching file'
      callback(noMatchingFile)
      return
    }
  })
}
