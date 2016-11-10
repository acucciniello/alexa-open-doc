module.exports = setMimeType

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
