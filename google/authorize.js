// authorize.js
var GoogleAuth = require('google-auth-library')

// Purpose: To set the credentials from the client_secret.json and checks if the token is valid
// param(in): credentials: Authentication information of user from client_secret.json
// param(in):       token: The access token received from the lambda request and google
// param(in):    callback: A function that handles the error or returns the authentication information
module.exports = function authorize (credentials, token, callback) {
  var clientSecret = credentials.web.client_secret
  var clientId = credentials.web.client_id
  var redirectUrl = credentials.web.redirect_uris[0]
  var auth = new GoogleAuth()
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)
  // Check if we have previously stored a token
  oauth2Client.setCredentials({
    access_token: token
  })
  if (token === undefined) {
    var undefinedToken = 'Token is undefined, please link the skill'
    return callback(undefinedToken)
  }
  return callback(null, oauth2Client)
}
