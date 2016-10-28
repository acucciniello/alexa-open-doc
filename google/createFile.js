var google = require('googleapis')

module.exports = createFile

function createFile (auth, fileName, callback) {
  var fileMetadata = {
    'name': fileName
  }
  var service = google.drive('v3')
  service.files.create({
    auth: auth,
    resource: fileMetadata,
    fields: 'createdTime, name'
  }, function (err, file) {
    if (err) {
      var apiError = 'The API return an error: ' + err
      callback(apiError)
      return
    }
    var fileName = file.name.toString()
    callback(null, fileName)
  })
}
