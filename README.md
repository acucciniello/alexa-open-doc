# alexa-open-doc   [![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard     )
[![Build Status](https://travis-ci.org/acucciniello/alexa-open-doc.svg?branch=master)](https://travis-ci.org/acucciniello/alexa-open-doc)
===============
An Amazon Alexa skill to open and edit google docs through voice

[View Videos of Skill in Use](https://acucciniello.github.io/alexa-open-doc/)

##Getting Started
1. Must have an Amazon Echo to use this skill.  
2. Open the Amazon Echo companion mobile application.
3. Click on the Top Left Button to Open the Menu
4. Click on Skills
5. Search "Edit Docs"
6. Click Enable Skill
7. Enter Information for the Google Drive Account you would like to use
8. Click Allow
9. Go to Your Amazon Echo
10. Say "Alexa, open Edit Docs"

##Usage

###List Files

Sample phrase to say to Alexa to list you last ten files in Google Drive:

` "Alexa, ask Edit Docs to list my files please" `

Alexa's Response:

`"Here is your list of files ..."`

###Create File

Sample phrase to say to Alexa to create a new file in your Google Drive:

` "Alexa, ask Edit Docs to create a file called {fileName}" `

Alexa's Response:

`"We created a file named {fileName}"`

###Add to a File

Sample phrase to say to Alexa to add text to a file in your Google Drive:

` "Alexa, ask Edit Docs to update {fileName} with {inputText}" `

Alexa's Response:

` "We updated the file named {fileName} with your input of {inputText}" `


##TO DO:
- [x] List Files in Your Drive 
- [x] Create a file
- [X] Edit in your google drive (In Progress)
- [X] Full Description of Getting Started


##License

MIT 

