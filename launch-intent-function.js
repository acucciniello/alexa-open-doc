module.exports = LaunchIntentFunction

// Purpose: To Launch the skill and Let the user know what the options are.
// param (in): intent: given by Alexa, allows code to access parts of the intent request
// param (in): session: given by Alexa, allows code to access parts of the session in the Lambda request
// param (out): request: allows the user to change the response by Alexa

function LaunchIntentFunction (intent, session, response) {
  var output = 'Welcome to Edit Docs.  You can list your files, create files, or edit a document from your Google Drive account.  To start using the skill, say Alexa, ask edit docs to list my files please!'
  response.ask(output)
  return
}
