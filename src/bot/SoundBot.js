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
    // filter out messages we dont care about or aren't commands
    if (msgIsCmd(msg, bot.prefix) && !msg.author.bot && msg.guild) {

        // Get a help message
        if (msgIsHelpCmd(msg.content, bot.prefix)) {
            const help = getHelpString(bot.context, msg.content, bot.prefix);

            console.log(help); // print help message to debug log
            msg.channel.send(help); // print help to discord

        // play a random sound
        } else if(msg.content === bot.prefix) {

            console.log('playing a random sound');
            handleSoundCmd(bot.context.getRandomSound(), msg.channel, msg.member);

        // play a sound from a specific command
        } else {
            console.log(msg.content);

            const cmd = stripPrefixFromCmd(msg.content, bot.prefix);
            const soundPath = bot.context.getSoundFromGroup(cmd);

            handleSoundCmd(soundPath, msg.channel, msg.member);
        }
        //TODO eventually implement a reset command here that resets the bot's SoundContext if required
    }
}

/** Play a sound if it exists and the user is in a voice chat channel */
function handleSoundCmd(soundPath, msgChannel, member) {
    if (soundPath) {
        console.log('soundfile obtained, checking if user is a member of a vc...');
        // Check if user is in a voiceChat (note: old version was
        // member.voiceChannel) if we need to revert
        if (member.voice.channel) {
            console.log('guild member is in vc, joining vc...');
            member.voice.channel.join().then(connection => {
                console.log('connection established...');

                // (note: function play() Used to be called playFile)
                const disp = connection.play(soundPath); // play voice
                console.log('sound invoked...');
                disp.setVolume(0.2); // This can be modified but my sounds are fairly loud
                disp.on('end', () => {
                    // We stay in the channel because playing a sound after joining takes awhile
                    // keep this here for debugging purposes
                    console.log('Finished playing sound');
                });

                // print a success message to console if successful
                // and direct error message to console.log if something happens
            }).then(() => console.log('sound played successfully'), console.log);

        } else {
            // send user a message that they're not in a vc since they may not realize
            msgChannel.send('Hey ' + member.user.username + ', I can\'t play you'
                + ' the sound since you\'re not in a voice chat. If you join one'
                + ' I\'d be happy to play it for you.');
            console.log(member.user.username + ' is not in a vc');
        }
    } else {
        // To avoid spamming the discord with bot messages, don't do anything in the
        // chat if a sound is typed incorrectly
        console.log('sound does not exist');
    }
}

module.exports = SoundBot;
