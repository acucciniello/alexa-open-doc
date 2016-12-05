 // enables strict mode which helps catch common JS programming blunders
'use strict'
var APP_ID = 'amzn1.ask.skill.9fadc9b7-4377-44f0-9d40-9e7f015a8bf7'
var AlexaSkill = require('./alexa-skill')
var LaunchIntentFunction = require('./launch-intent-function.js')
var ListFilesResponseFunction = require('./list-files-response-function.js')
var CreateFileFunction = require('./create-file-function.js')
var EditFileFunction = require('./edit-file-function.js')
var HelpIntentFunction = require('./help-intent-function.js')
var StopIntentFunction = require('./stop-intent-function.js')
var CancelIntentFunction = require('./cancel-intent-function.js')

// Define a ListFilesService function which inherits from AlexaSkill.js class
var ListFilesService = function () {
  AlexaSkill.call(this, APP_ID)
}

ListFilesService.prototype = Object.create(AlexaSkill.prototype)

// this will be invoked when the user first launches or opens the skill with its invocation name
// this is triggered when said "Alexa, ask Google Drive"
ListFilesService.prototype.eventHandlers.onLaunch = LaunchIntentFunction

// How Alexa knows to handle all the different functions
// Each intent corresponds to a function
// That function is called when that intent is invoked
ListFilesService.prototype.intentHandlers = {
  'ListFilesIntent': ListFilesResponseFunction,
  'CreateFileIntent': CreateFileFunction,
  'EditFileIntent': EditFileFunction,
  'AMAZON.HelpIntent': HelpIntentFunction,
  'AMAZON.StopIntent': StopIntentFunction,
  'AMAZON.CancelIntent': CancelIntentFunction
}

exports.handler = function (event, context) {
  var listFilesService = new ListFilesService()
  listFilesService.execute(event, context)
}
