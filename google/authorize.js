//authorize.js
var googleAuth = require('google-auth-library');

module.exports = function authorize(credentials, listFilesFunction, token, speech, callback, sendResponseCB){
 	var clientSecret = credentials.web.client_secret;
 	var clientId = credentials.web.client_id;
 	var redirectUrl = credentials.web.redirect_uris[4];
 	var auth = new googleAuth();
 	var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
 	//Check if we have previously stored a token
 	oauth2Client.setCredentials({
  		access_token: token,
  		refresh_token: 'REFRESH TOKEN HERE'
	});
	if(token == undefined) {
		oauth2Client.refreshAccessToken(function(err, tokens) {
			if(err){
				speech = 'token is undefined, please link your account to use this skill' + err;
				sendResponseCB(speech);
			}
			else{
				oauth2Client.setCredentials({
					access_token: tokens.access_token,
					refresh_token: tokens.refresh_token
				});
				listFilesFunction(oauth2Client, callback, speech, sendResponseCB);
			}
		});
	}
	else{
		listFilesFunction(oauth2Client, callback, speech, sendResponseCB);
	}
 }


