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
                console.log('soundfile obtained, checking if in guild and member of a vc...');
                // if not in guild, ignore Find user who requested
                // (note: old version was msg.member.voiceChannel) if we need to revert
                if (msg.guild && msg.member.voice.channel) {
                    console.log('guild member in vc, joining vc...');
                    msg.member.voice.channel.join().then(connection => {
                        console.log('connection established...');

                        //(note: function play() Used to be called playFile)
                        const disp = connection.play(soundPath); // play voice
                        console.log('sound invoked...');
                        disp.setVolume(0.2);
                        disp.on('end', (endReason) => {
                            //connection.disconnect();  // TODO should we leave channel?
                            console.log('Done. End Reason:' + endReason);
                        });

                        //print a success message to console if successful
                        //and direct error message to console.log if something happens
                    }).then(() => console.log('sound played successfully'), console.log);

                } else {
                    console.log('not a member of a guild or vc');
                }
            } else {
                //TODO sound does not exist
                console.log('sound does not exist');
            }

            //console.log(cmd);
            //msg.channel.send(cmd);
        }
        // TODO eventually implement a reset command here that resets bot's sound context if required
    }
}

module.exports = SoundBot;
