module.exports = HelpIntentFunction

// Purpose: To provide the user with more information on how to use the skill
// param (in): intent: given by Alexa, allows code to access parts of the intent request
// param (in): session: given by Alexa, allows code to access parts of the session in the Lambda request
// param (out): request: allows the user to change the response by Alexa

function HelpIntentFunction (intent, session, response) {
  var begin = 'This is a skill that allows you to Edit your Google Drive Files in your Respective Google Drive Account. '
  var useListFiles = 'In order to list your files from your drive, please say Alexa, ask edit docs list my files please. '
  var useCreateFiles = 'In order to create a file, simply say Alexa, ask edit docs to create a document called Sample. '
  var useEditFiles = 'In order to add text to the end of a document, say Alexa, ask edit docs to update Sample with the following sample text. '
  var question = 'What would you like to do ?'
  var output = begin + useListFiles + useCreateFiles + useEditFiles + question
  response.ask(output)
  return
}

