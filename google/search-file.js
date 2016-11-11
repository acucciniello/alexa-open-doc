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
      return callback(errMsg)
    } else if (res.files.length > 1) {
      var tooMany = 'We found more than one file,  Try to be more specific with the file name'
      return callback(tooMany)
      // return
    } else {
      var file = res.files[0]
      callback(null, file.id)
      return
    }
  })
}
