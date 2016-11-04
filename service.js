 // enables strict mode which helps catch common JS programming blunders
'use strict'
var APP_ID = 'amzn1.ask.skill.9fadc9b7-4377-44f0-9d40-9e7f015a8bf7'
var AlexaSkill = require('./AlexaSkill')
var ListFilesResponseFunction = require('./ListFilesResponseFunction.js')
var CreateFileFunction = require('./CreateFileFunction.js')
var EditFileFunction = require('./EditFileFunction.js')

// Define a ListFilesService function which inherits from AlexaSkill.js class
var ListFilesService = function () {
  AlexaSkill.call(this, APP_ID)
}

ListFilesService.prototype = Object.create(AlexaSkill.prototype)

// this will be invoked when the user first launches or opens the skill with its invocation name
// this is triggered when said "Alexa, ask Google Drive"
ListFilesService.prototype.eventHandlers.onLaunch = ListFilesResponseFunction

ListFilesService.prototype.intentHandlers = {
  'ListFilesIntent': ListFilesResponseFunction,
  'CreateFileIntent': CreateFileFunction,
  'EditFileIntent': EditFileFunction
}

exports.handler = function (event, context) {
  var listFilesService = new ListFilesService()
  listFilesService.execute(event, context)
}
