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
		//console.log(accessToken);
		//SPEECH = "Here is your access token: " + accessToken;
		//console.log(JSON.parse(content));
		//callback(SPEECH);
		authorize(JSON.parse(content), listFiles, accessToken, SPEECH, fillOutput, sendResponseCB);
	});
}
>// Load client secrets from a local file.


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
 function authorize(credentials, listFilesFunction, token, speech, callback, sendResponseCB){
 	var clientSecret = credentials.web.client_secret;
 	var clientId = credentials.web.client_id;
 	var redirectUrl = credentials.web.redirect_uris[4];
 	var auth = new googleAuth();
 	var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
 	//Check if we have previously stored a token
	if(token == undefined) {
		speech = "token is undefined, please link your accound to use this skill";
		console.log(speech);
		sendResponseCB(speech);
	}
	else{
		speech = "Here is your access token: " + token;
		
		oauth2Client.credentials = JSON.parse(token);
		console.log(oauth2Client.credentials);

		sendResponseCB(speech);
		//listFilesFunction(oauth2Client, callback);
	}
 }

 /**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
 function getNewToken(oauth2Client, callback){
 	var authUrl = oauth2Client.generateAuthUrl({
 		access_type: 'offline',
 		scope: SCOPES
 	});
 	console.log('Authorize this app by visiting this url: ', authUrl);
 	var r1 = readline.createInterface({
 		input: process.stdin,
 		output: process.stdout
 	});
 	r1.question('Enter the code from that page here: ', function(code){
 		r1.close();
 		oauth2Client.getToken(code, function(err, token) {
 			if (err) {
 				console.log('Error while trying to retrieve access token', err);
 				return;
 			}
 			oauth2Client.credentials = token;
 			storeToken(token);
 			callback(oauth2Client);
 		});
 	});
 }

 /**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
 function storeToken(token) {
 	try {
 		fs.mkdirSync(TOKEN_DIR);
 	} catch (err) {
 		if(err.code != 'EEXIST') {
 			throw err;
 		}
 	}
 	fs.writeFile(TOKEN_PATH, JSON.stringify(token));
 	console.log('Token stored to ' + TOKEN_PATH);
 }

 /**
 * Lists the names and IDs of up to 100 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
 function listFiles(auth) {
 	var service = google.drive('v3');
 	service.files.list({
 		auth: auth,
 		pageSize: 10,
 		fields: "nextPageToken, files(id, name)"
 	}, function(err, response){
 		if(err) {
 			console.log(TOKEN_PATH);
 			console.log('The API return an error: ' + err);
 			return;
 		}
 		files = response.files;
 		if ( files.length == 0) {
 			console.log(' No files found.');
 			callback(err);
 		} else {
 			console.log('Files:');
		    for (var i = 0; i < files.length; i++) {
		      var file = files[i];
		      console.log('%s (%s)', file.name, file.id);
		    }
 		}
 	});
 }

