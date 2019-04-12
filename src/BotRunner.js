const SoundBot = require('./bot/SoundBot');

// use destructuring to access config info in our config-file, fancy!
const {token, prefix, soundDir} = require('./config.json');


console.log('Creating bot...');
const bot = new SoundBot(token, soundDir, prefix);

console.log('Starting bot...');
bot.start();
