module.exports = {

    /**
     * return true if the given message is a sound command, false otherwise.
     * Does not have to match an actual sound command, this function only checks for a valid prefix before a word
     * This is the only function in MessageHandler that takes an actual discord message, all others expect a string.
     */
    msgIsCmd: function(msg, prefix = '!') {
        return msg && msg.content && msg.content.startsWith(prefix) && msg.content.length > 1;
    },

    /**
     * return true if the given message is a help command, false otherwise
     */
    msgIsHelpCmd: function(msgStr, prefix = '!') {
        return msgStr.startsWith(prefix + 'help');
    },

    /**
     * return command without prefix
     */
    stripPrefixFromCmd: function(msgStr, prefix = '!') {
        return msgStr.substr(prefix.length);
    },
    
    /**
     * Produces a help string to send the user, returns cmd specific help if cmd matches a cmd
     */
    getHelpString(soundContext, msgStr, prefix = '!') {
        //Get the help command without the '!help' (in default case), empty string if it is the standard help query
        const helpQuery = msgStr.slice((prefix + 'help').length, msgStr.length);

        if(helpQuery) {
            return this.generateSpecificHelpMsg(soundContext, helpQuery, prefix);
        } else {
            return this.generateGenericHelpMsg(soundContext, prefix);
        }
    },

    /**
     * Create a help message for a specific command
     *
     * @param {string} cmd the command we want to generate a more specific help message for
     */
    generateSpecificHelpMsg(soundContext, cmd, prefix) { //TODO needs a lot of work
        if (soundContext.hasGroup.includes(cmd)) {
            const sounds = ;
            if(sounds) {
                return this.cmd + specificHelpBegin + sounds.length +
                    specificHelpEnd + sounds.toString;
            } else {
                return noSoundsFound;
            }
        }
        return this.generateUnrecognizedHelpMsg(cmd);
    },

    /**
     * Create a help message if the user typed in an unrecognized command
     *
     * @param {string} cmd an erroneous or unrecognized command
     */
    generateUnrecognizedHelpMsg(soundContext, cmd, prefix = '!') {
        const cmds = Array.from(soundContext.soundGroup, x => prefix + x).toString();
        return 'the command "' + cmd + '"' + unrecognizedCmd + cmds;
    },

    /**
     * Create and return a general help message
     */
    generateGenericHelpMsg(soundContext, prefix = '!') {
        const cmds = Array.from(soundContext.soundGroup, x => prefix + x);
        const helpCommand = prefix + 'help';

        return beginHelp + cmds.toString() + endHelp + helpCommand;
    },
};

const beginHelp = 'Play a sound from airhornbot by sending a command in the discord chat! The following is a list of commands:\n';
const endHelp = '\nYou can show this message again by typing ';

const specificHelpBegin = 'is a command that has ';
const specificHelpEnd = ' different possible sounds. To play a specific sound type a command and then the sound name as a parameter. The following is a list of the available sounds for this command:\n';

const unrecognizedCmd = ' does not exist as a valid command. The following is a list of all possible commands:\n';
const noSoundsFound = 'could not find/access any sounds for the given command';