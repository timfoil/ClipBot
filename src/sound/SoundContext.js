const fs = require('fs');
// const sColl = require('./SoundCollection');
// const Sound = require('./Sound');

class SoundContext {
    constructor(dir, prefix = '!') {
        this.dir = dir;
        this.prefix = prefix;
        this.contexts = fs.readdirSync(dir);
    }

    /**
     * Produces a help string to send the user, returns cmd specific help if cmd matches a cmd
     */
    getHelpString(cmd) {
        if(cmd) {
            return this.generateSpecificHelpMsg(cmd); // TODO
        } else {
            return this.generateGenericHelpMsg();
        }
    }

    generateSpecificHelpMsg(cmd) {
        if (this.contexts.includes(this.cmd)) {
            const sounds = fs.readdirSync(this.dir + '/' + this.cmd);
            if(sounds) {
                return this.cmd + specificHelpBegin + sounds.length + specificHelpEnd + sounds.toString;
            } else {
                return noSoundsFound;
            }
        }
        return this.generateUnrecognizedHelpMsg(cmd);
    }

    generateUnrecognizedHelpMsg(cmd) {
        const cmds = Array.from(this.contexts, x => this.prefix + x).toString();
        return 'the command "' + cmd + '"' + unrecognizedCmd + cmds;
    }

    generateGenericHelpMsg() {
        const cmds = Array.from(this.contexts, x => this.prefix + x);
        const helpCommand = this.prefix + 'help';

        return beginHelp + cmds.toString() + endHelp + helpCommand;
    }
}

const beginHelp = 'Play a sound from airhornbot by sending a command in the discord chat! The following is a list of commands:\n';
const endHelp = '\nYou can show this message again by typing ';

const specificHelpBegin = 'is a command that has ';
const specificHelpEnd = ' different possible sounds. To play a specific sound type a command and then the sound name as a parameter. The following is a list of the available sounds for this command:\n';

const unrecognizedCmd = ' does not exist as a valid command. The following is a list of all possible commands:\n';
const noSoundsFound = 'could not find/access any sounds for the given command';

module.exports = SoundContext;