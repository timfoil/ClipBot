const Discord = require('discord.js');

// use destructuring to access token and ignore prefix, fancy! (not implemented currently due to eslint rules)
// const {token, prefix} = require('./config.json');

const config = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag}!');
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

console.log('hello world');

// if using eslint
// client.login(token);
client.login(config.token);
