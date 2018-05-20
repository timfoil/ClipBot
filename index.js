//I'm unsure if convention requires this to be in the src or root folder 
//putting it in the root folder for now

//bot.js is our real main method, by exporting this it runs our bot when we call 
//`node .`
//Since the package.json specifies it as the main file
module.exports = require('./src/bot');
