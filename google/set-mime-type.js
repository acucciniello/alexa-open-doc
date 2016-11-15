module.exports = setMimeType

// Purpose: To determine what type of file  to create by translating the voice input to mimeType
// param(in): fileType: Voice input from the user as to what type of file they would like to create
// param(in): callback: A function that handles the error or returns the type of file to create
function setMimeType (fileType, callback) {
  var mimeType = ''
  switch (fileType) {
    case 'doc' :
      mimeType = 'application/vnd.google-apps.document'
      break
    case 'document' :
      mimeType = 'application/vnd.google-apps.document'
      break
    case 'sheet':
      mimeType = 'application/vnd.google-apps.spreadsheet'
      break
    case 'spreadsheet' :
      mimeType = 'application/vnd.google-apps.spreadsheet'
      break
    case 'powerpoint' :
      mimeType = 'application/vnd.google-apps.presentation'
      break
    case 'presentation' :
      mimeType = 'application/vnd.google-apps.presentation'
      break
    case 'folder' :
      mimeType = 'application/vnd.google-apps.folder'
      break
    case 'file' :
      mimeType = 'application/vnd.google-apps.document'
      break
    default:
      mimeType = ''
  }
  if (mimeType === '') {
    var noMimeType = 'We failed to understand the mime type of the file'
    callback(noMimeType)
    return
  }
  callback(null, mimeType)
  return
}
