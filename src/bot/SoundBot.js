const Discord = require('discord.js');
const {msgIsCmd, msgIsHelpCmd, stripPrefixFromCmd, getHelpString} = require('../parse/MessageHandler');
const SoundContext = require('../sound/SoundContext');

/** Bot that plays sounds in voicechat in response to predetermined commands sent in text chat */
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
    if (msgIsCmd(msg, bot.prefix) && !msg.author.bot) {
        if (msgIsHelpCmd(msg.content, bot.prefix)) {
            // Get and print help
            const help = getHelpString(bot.context, msg.content, bot.prefix);

            console.log(help);
            msg.channel.send(help);
        } else {
            console.log(msg.content);
            // do command if it exists

            const cmd = stripPrefixFromCmd(msg.content, bot.prefix);
            const soundPath = bot.context.getSoundFromGroup(cmd);

            if (soundPath) {
                // if not in guild, ignore Find user who requested
                if (msg.guild && msg.member.voiceChannel) {
                    console.log('soundfile obtained...');
                    msg.member.voiceChannel.join().then(connection => {
                        console.log('connection established...');
                        const disp = connection.playFile(soundPath); // play voice
                        console.log('sound invoked...');
                        disp.setVolume(0.2);
                        disp.on('end', (endReason) => {
                            //connection.disconnect();
                            console.log('Done. End Reason:' + endReason);
                        });
                    }).then(() => console.log('success'), console.log);
                    // TODO leave channel
                }
            } else {
                //TODO sound does not exist
            }

            console.log(cmd);
            //msg.channel.send(cmd);
        }
        // TODO eventually implement a reset command here that resets bot's sound context if required
    }
}

module.exports = SoundBot;
