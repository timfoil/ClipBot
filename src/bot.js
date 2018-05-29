const Discord = require('discord.js');

// use destructuring to access token and ignore prefix, fancy! (not implemented currently due to eslint rules)
// const {token, prefix} = require('./config.json');

const {token, prefix} = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag}!');
});

client.on('message', msg => {
    // msg.content is a null check for the message
    if(msg.content && msg.content.startsWith(prefix) && msg.content.length > 1) {
        const interestingBits = msg.content.substr(1);
        handle(interestingBits);
    }
});

console.log('hello world');

// if using eslint
// client.login(token);
client.login(token);
