const fs = require('fs');
// const sColl = require('./SoundCollection');
// const Sound = require('./Sound');

class SoundContext {
    constructor(dir, prefix = '!') {
        this.dir = dir;
        this.prefix = prefix;
        this.sounds = fs.readdirSync(dir);
    }

    /**
     * Produces a help string to send the user, returns cmd specific help if cmd matches a cmd
     */
    getHelpString(cmd) {
        if(cmd) {
            return generateGenericHelpStr(this.sounds, this.prefix);
        } else {
            return generateSpecificHelpMsg(this.sounds, this.prefix); // TODO
        }
    }
}

function generateGenericHelpStr(sounds, prefix) {
    const cmds = Array.from(sounds, x => prefix + x);
    const helpCommand = prefix + 'help';

    return beginHelp + cmds.toString() + endHelp + helpCommand;
}

function generateSpecificHelpMsg(sounds, prefix, cmd) {
    return null; // TODO
}

const beginHelp = 'Play a sound from airhornbot by sending a command in the discord chat! The following is a list of commands:\n';
const endHelp = '\nYou can show this message again by typing ';

module.exports = SoundContext;