const SoundBot = require('./bot/SoundBot');

// use destructuring to access token and ignore prefix, fancy!
const {token, prefix} = require('./config.json');
const soundDir = './sounds';


console.log('Creating bot...');
const bot = new SoundBot(token, soundDir, prefix);

console.log('Starting bot...');
bot.start();
