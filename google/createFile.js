var google = require('googleapis')

module.exports = createFile

function createFile (auth, callback) {
  var fileMetadata = {
    'name': 'Project plan'
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
