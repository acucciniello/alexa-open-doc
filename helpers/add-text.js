module.exports = addText

// Purpose: To append the inputString to the end of the text of the file
// param(in/out):        text: The actual text downloaded from the file the user wants to add to
// param    (in): inputString: The text that the user wants to the end of the file

function addText (text, inputString) {
  text = text + '\n' + inputString
  return text
}
