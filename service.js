 //enables strict mode which helps catch common JS programming blunders
'use strict';
var APP_ID = 'amzn1.ask.skill.9fadc9b7-4377-44f0-9d40-9e7f015a8bf7';
var AlexaSkill = require('./AlexaSkill');
var SPEECH_OUTPUT = new Object();
const docs = require('./docs.js');
var clientSecretsFile = 'client_secret.json';


//Define a ListFilesService function which inherits from AlexaSkill.js class
var ListFilesService = function() {
 	AlexaSkill.call(this, APP_ID);
};

ListFilesService.prototype = Object.create(AlexaSkill.prototype);

//builds a response to Alexa skill interface and 
//tells Alexa how to respond to users request
 var ListFilesResponseFunction = function(intent, session, response) {
 	var token  = JSON.stringify(session.user.accessToken);
 	//SPEECH_OUTPUT = "Here is your access token: " + JSON.stringify(session.user.accessToken);
 	docs(clientSecretsFile, token, SPEECH_OUTPUT, callback, function(speech) {
	 	console.log("we made it here");
		console.log(speech);
		response.tell(speech);
 	});
 };

//this will be invoked when the user first launches or opens the skill with its invocation name 
//this is triggered when said "Alexa, list of files"
 ListFilesService.prototype.eventHandlers.onLaunch = ListFilesResponseFunction;

 ListFilesService.prototype.intentHandlers = {
 	'ListFilesIntent' : ListFilesResponseFunction
 };

 exports.handler = function(event, context) {
 	var listFilesService = new ListFilesService();
 	listFilesService.execute(event, context); 	
 }; 



function callback(err, files) {
	if(err){
		console.log("Error in callback")
		return err;
	}
	for (var i = 0; i < files.length; i++) {
		SPEECH_OUTPUT[i] = files[i].name;

		console.log(SPEECH_OUTPUT[i].name);
	}   
	console.log(SPEECH_OUTPUT);
 };


function getUserToken(err, token) {
	SPEECH_OUTPUT = JSON.stringify(token);
	response.tell(SPEECH_OUTPUT);
}


