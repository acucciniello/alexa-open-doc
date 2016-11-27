var google = require('googleapis')

module.exports = searchFile

// Purpose: To search for a file in your google drive
// param(in):     auth: Authentication information of user
// param(in):     name: The name of the file that you want to update
// param(in): callback: A function that handles the error or returns the id of the file that was found
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
      var errMsg = 'There was an error finding the file, please try again'
      return callback(errMsg)
    } else if (res.files.length > 1) {
      // Occurs when more than one file is found
      // This is to prevent the user from updating
      // all files found in the search and limit it to one
      var tooMany = 'We found more than one file,  Try to be more specific with the file name'
      return callback(tooMany)
    } else if (res.files.length < 1) {
      var noFileFound = 'There were no files that matched this inquiry'
      return callback(noFileFound)
    } else {
      var file = res.files[0]
      return callback(null, file.id)
    }
  })
}
