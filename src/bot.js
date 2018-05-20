const Discord = require('discord.js');

//use destructuring to access token and prefix, fancy!
const {token, prefix} = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag}!');
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

console.log("hello world");

client.login(token);
