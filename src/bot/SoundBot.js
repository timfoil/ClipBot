const Discord = require('discord.js');
const {msgIsCmd, msgIsHelpCmd, stripPrefixFromCmd, helpCmd} = require('../parse/MessageHandler');
const SoundContext = require('../sound/SoundContext');

/** Bot that plays sounds in voicechat in response to predetermined commands sent in text chat*/
class SoundBot {

    /**
     * Create and initialize a SoundBot
     * @constructor
     */
    constructor(token, soundDir, prefix = '!') {
        // This constructor has a default argument prefix that defaults to '!' if not explicitly given

        // Debug logging
        console.log('Initializing Bot...');

        this.client = new Discord.Client();
        this.context = new SoundContext(soundDir);
        this.prefix = prefix;
        this.token = token;

        // Setup ready callback
        this.client.on('ready', () => {
            console.log('Logged in! Ready for commands');
            // TODO maybe broadcast this when starting
            // this.client();
        });

        this.client.on('messageUpdate', (oldMsg, newMsg) => {
            handleMsg(this, newMsg);
        });

        // Setup message callback
        this.client.on('message', msg => {
            handleMsg(this, msg);
        });

        // Debug Logging
        console.log('Successful initialization of SoundBot');
    }

    /**
     * Start this SoundBot
     */
    start() {
        // Log in and begin listening for commands
        this.client.login(this.token);
    }
}


// Sneaky way of doing a private method
// don't know if this is standard practice though...

/** Handle a discord text chat message */
function handleMsg(bot, msg) {
    if (msgIsCmd(msg, bot.prefix)) {
        if (msgIsHelpCmd(msg.content, bot.prefix)) {
            // Get and print help
            const help = bot.context.getHelpString(helpCmd());

            console.log(help);
            msg.channel.send(help);
        } else {
            console.log(msg.content);

            // do command if it exists
            const cmd = stripPrefixFromCmd(msg.content, bot.prefix);
            console.log(cmd);
            msg.channel.send(cmd);
        }
    }
}

module.exports = SoundBot;
