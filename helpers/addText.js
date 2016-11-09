module.exports = addText

function addText (text, inputString, callback) {
  text = text + '\n' + inputString
  if(text === '') {
    var emptyString = 'File is empty throw an error'
    callback(emptyString)
  }
  callback(null, text)
}
