var google = require('googleapis')

module.exports = createFile

// Purpose: To create a file of different types (document, sheet, presentation)
// param(in):     auth: Authentication information of user
// param(in): fileName: The name of the file that you want to create
// param(in):     mime: The mime type of the file you want to create
// param(in): callback: A function that handles the error or returns the name of the file that was created
function createFile (auth, fileName, mime, callback) {
  var fileMetadata = {
    'name': fileName,
    'mimeType': mime
  }
  var service = google.drive('v3')
  service.files.create({
    auth: auth,
    resource: fileMetadata,
    fields: 'createdTime, name, mimeType'
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

