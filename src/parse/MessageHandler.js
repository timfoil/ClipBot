module.exports = {

    /**
     * return true if the given message is a sound command, false otherwise.
     * Does not have to match an actual sound command, this function only checks for a valid prefix before a word
     * This is the only function in MessageHandler that takes an actual discord message, all others expect a string.
     */
    msgIsCmd(msg, prefix = '!') {
        return msg && msg.content && msg.content.startsWith(prefix) && msg.content.length > 1;
    },

    /**
     * return true if the given message is a help command, false otherwise
     */
    msgIsHelpCmd(msgStr, prefix = '!') {
        return msgStr.startsWith(prefix + 'help');
    },

    /**
     * return command without prefix
     */
    stripPrefixFromCmd(msgStr, prefix = '!') {
        return msgStr.substr(prefix.length);
    },

    /**
     * Produces a help string to send the user, returns cmd specific help if cmd matches a cmd
     */
    getHelpString(soundContext, msgStr, prefix = '!') {
        //Get the help command without the '!help' (in default case), empty string if it is the standard help query
        const helpQuery = msgStr.slice((prefix + 'help').length, msgStr.length).trim();

        if(helpQuery) {
            return generateSpecificHelpMsg(soundContext, helpQuery, prefix);
        } else {
            return generateGenericHelpMsg(soundContext, prefix);
        }
    },
};

/**
 * Create a help message for a specific command
 *
 * @param {string} cmd the command we want to generate a more specific help message for
 */
function generateSpecificHelpMsg(soundContext, cmd, prefix) {
    if (soundContext.hasSoundGroup(cmd)) {
        const group = soundContext.getSoundGroup(cmd);
        const sounds = group.getSoundList();
        if(sounds) {
            return 'The ' + cmd + ' command has ' + sounds.length +
                specificHelpEnd + sounds.getSoundList();
        } else {
            return noSoundsFound;
        }
    }
    return generateUnrecognizedHelpMsg(soundContext, cmd, prefix);
}

/**
 * Create and return a general help message
 */
function generateGenericHelpMsg(soundContext, prefix) {
    const cmds = Array.from(soundContext.groupNames, x => prefix + x);
    const helpCommand = prefix + 'help';

    return beginHelp + cmds.toString() + endHelp + helpCommand;
}

/**
 * Create a help message if the user typed in an unrecognized command
 *
 * @param {string} cmd an erroneous or unrecognized command
 */
function generateUnrecognizedHelpMsg(soundContext, cmd, prefix) {
    const cmds = Array.from(soundContext.groupNames, x => prefix + x).toString();
    return 'the command "' + cmd + '"' + unrecognizedCmd + cmds;
}

const beginHelp = 'Play a sound from airhornbot by sending a command in the discord chat! The following is a list of commands:\n';
const endHelp = '\nYou can show this message again by typing ';

const specificHelpEnd = ' possible sounds. To play a specific sound type the command and then the sound name as the parameter. The following is a list of its available sounds:\n';

const unrecognizedCmd = ' does not exist as a valid command. The following is a list of all possible commands:\n';
const noSoundsFound = 'could not find/access any sounds for the given command';
