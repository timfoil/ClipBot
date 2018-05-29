const fs = require('fs');
// const sColl = require('./SoundCollection');
// const Sound = require('./Sound');

class SoundContext {
    constructor(dir, prefix = '!') {
        this.dir = dir;
        this.prefix = prefix;
        this.sounds = fs.readdirSync(dir);
    }

    //  Returns a string to send to the consoleof print
    getHelpString() {
        const cmds = Array.from(this.sounds, x => this.prefix + x);
        const helpCommand = this.prefix + 'help';

        // create and return a help string
        return beginHelp + cmds.toString() + endHelp + helpCommand;
    }
}

const beginHelp = 'Play a sound from airhornbot by sending a command in the discord chat! The following is a list of commands:\n';
const endHelp = '\nYou can show this message again by typing ';

module.exports = SoundContext;