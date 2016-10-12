//listFiles.js
var google = require('googleapis');

module.exports =  function listFiles(auth, callback, speech, sendResponseCB) {
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