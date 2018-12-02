const fs = require('fs');
const path = require('path');
const SoundCollection = require('SoundCollection');


/**
 * A class that acts as a handler for all of the Sound Groups
 */
class SoundContext {

    /**
     * Constructor for SoundContext
     * @param {string} dir Directory the sound-groups should be found
     * @param {string} prefix prefix used to initiate commands
     */
    constructor(dir, prefix = '!') {
        this.dir = dir;
        this.prefix = prefix;
        this.soundGroups = [];
        for (const sound in fs.readdirSync(dir)) {
            this.soundGroups.push(new SoundCollection(path.join(dir, sound))); //create soundCollection from the soundGroups
        }
    }

    /**
     * Produces a help string to send the user, returns cmd specific help if cmd matches a cmd
     */
    getHelpString(cmd) {
        if(cmd) {
            return this.generateSpecificHelpMsg(cmd);
        } else {
            return this.generateGenericHelpMsg();
        }
    }

    /**
     * Create a help message for a specific command
     *
     * @param {string} cmd the command we want to generate a more specific help message for
     */
    generateSpecificHelpMsg(cmd) {
        if (this.soundGroup.includes(this.cmd)) {
            const sounds = fs.readdirSync(path.join(this.dir, this.cmd));
            if(sounds) {
                return this.cmd + specificHelpBegin + sounds.length +
                    specificHelpEnd + sounds.toString;
            } else {
                return noSoundsFound;
            }
        }
        return this.generateUnrecognizedHelpMsg(cmd);
    }

    /**
     * Create a help message if the user typed in an unrecognized command
     *
     * @param {string} cmd an erroneous or unrecognized command
     */
    generateUnrecognizedHelpMsg(cmd) {
        const cmds = Array.from(this.soundGroup, x => this.prefix + x).toString();
        return 'the command "' + cmd + '"' + unrecognizedCmd + cmds;
    }

    /**
     * Create and return a general help message
     */
    generateGenericHelpMsg() {
        const cmds = Array.from(this.soundGroup, x => this.prefix + x);
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