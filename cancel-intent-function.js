module.exports = CancelIntentFunction

// Purpose: To cancel the skill and close the session
// param (in): intent: given by Alexa, allows code to access parts of the intent request
// param (in): session: given by Alexa, allows code to access parts of the session in the Lambda request
// param (out): request: allows the user to change the response by Alexa

function CancelIntentFunction (intent, session, response) {
  var output = 'Canceling your Request and Exiting Skill'
  response.tell(output)
  return
}

