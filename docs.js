//docs.js

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

//If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quikcstart.json
var SCOPES = [ 'https://www.googleapis.com/auth/drive'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quikcstart.json';

module.exports = function loadDocs(clientSecretsFile, accessToken, SPEECH, fillOutput, sendResponseCB) {
	fs.readFile(clientSecretsFile.toString(), function processClientSecrets(err, content) {
		if(err){
			console.log('Error Loading client secret file: ' + err);
			return;
		}
		authorize(JSON.parse(content), listFiles, accessToken, SPEECH, fillOutput, sendResponseCB);
	});
}


 function authorize(credentials, listFilesFunction, token, speech, callback, sendResponseCB){
 	var clientSecret = credentials.web.client_secret;
 	var clientId = credentials.web.client_id;
 	var redirectUrl = credentials.web.redirect_uris[4];
 	var auth = new googleAuth();
 	var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
 	//Check if we have previously stored a token
	if(token == undefined) {
		speech = "token is undefined, please link your account to use this skill";
		sendResponseCB(speech);
	}
	else{
		oauth2Client.setCredentials({
  			access_token: token,
		});
		listFilesFunction(oauth2Client, callback, speech, sendResponseCB);
	}
 }

 function listFiles(auth, callback, speech, sendResponseCB) {
 	var service = google.drive('v3');
 	service.files.list({
 		auth: auth,
 		pageSize: 10,
 		fields: "nextPageToken, files(id, name)"
 	}, function(err, response){
 		if(err) {
 			speech = auth.credentials + '   The API return an error: ' + err;
 			sendResponseCB(speech);
 			console.log('The API return an error: ' + err);
 			return;
 		}
 		files = response.files;
 		if ( files.length == 0) {
 			speech = "No files found.";
 			console.log(' No files found.');
 			sendResponseCB(speech);
 			//callback(err, null, speech, sendResponseCB);
 		} else {
 				speech = "We got access to your files";
 				//sendResponseCB(speech);
 				callback(null, files, speech, sendResponseCB)
 		}
 	});
 }

