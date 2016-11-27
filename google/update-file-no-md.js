var google = require('googleapis')

module.exports = updateFileNoMD

// Purpose: To reupload the file to your google drive, after the text has been added
// param(in):     auth: Authentication information of user
// param(in):       id: The id of the file that you want to update
// param(in):     file: The text of the file that will be placed in the new updated file
// param(in): callback: A function that handles the error or returns the name of the file that was updated
function updateFileNoMD (auth, id, file, callback) {
  var service = google.drive('v3')
  service.files.update({
    fileId: id,
    media: {
      mimeType: 'text/plain',
      body: file
    },
    auth: auth
  }, function (err, response) {
    if (err) {
      return callback(err)
    }
    return callback(null, response.name)
  })
}
