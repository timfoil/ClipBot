module.exports = {

    /**
     * return true if the given message is a sound command, false otherwise.
     * Does not have to match an actual sound command, this function only
     * checks for a valid prefix before a word. This is the only function
     * in MessageHandler that takes an actual discord message, all others
     * expect a string
     */
    msgIsCmd(msg, prefix = '!') {
        return msg && msg.content && msg.content.startsWith(prefix);
    },

    /**
     * return true if the given message is a help command, false otherwise
     */
    msgIsHelpCmd(msgStr, prefix = '!') {
        return msgStr.startsWith(prefix + 'help') || msgStr.trim().endsWith(' help');
    },

    /**
     * return command without prefix
     */
    stripPrefixFromCmd(msgStr, prefix = '!') {
        return msgStr.slice(prefix.length);
    },

    /**
     * Produces a help string to send the user, returns cmd specific help if cmd matches a cmd
     */
    getHelpString(soundContext, msgStr, prefix = '!') {
        const noPrefix = module.exports.stripPrefixFromCmd(msgStr, prefix);
        let helpQuery;

        // The typical help command query
        if(noPrefix.startsWith('help')) {
            // Get the help command without the '!help' (in default case),
            // empty string if it is the standard help query
            helpQuery = noPrefix.slice('help'.length, noPrefix.length).trim();
        // if you put 'help' after the command, you should still get a help message
        } else if (noPrefix.trim().endsWith(' help')) {
            helpQuery = noPrefix.slice(0, noPrefix.lastIndexOf(' help')).trim();
        }

        // return a specific message if the helpQuery exists
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
            return 'The ' + cmd + ' command has ' + group.getNumSounds() +
                specificHelpEnd + sounds;
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
    const cmds = Array.from(soundContext.groupNames, x => ' ' + prefix + x).toString();
    const helpCommand = prefix + 'help';

    return beginHelp + cmds.trim() + specificSoundInfo + prefix + moreInfo + helpCommand + showAgainHelp + helpCommand;
}

/**
 * Create a help message if the user typed in an unrecognized command
 *
 * @param {string} cmd an erroneous or unrecognized command
 */
function generateUnrecognizedHelpMsg(soundContext, cmd, prefix) {
    const cmds = Array.from(soundContext.groupNames, x => ' ' + prefix + x).toString();
    return 'the command "' + cmd + '"' + unrecognizedCmd + cmds.trim();
}

const beginHelp = 'Play a sound from airhornbot by sending a command in the discord chat! The following is a list of commands:\n';
const specificSoundInfo = '\nCommands may have multiple sounds. You can play specific sounds from a command by typing a command and then the sound\'s name after a space separator. A random sound from the command will be played if not specified. To play a random sound from all commands just type:\n';
const moreInfo = '\nTo get a list of sound names in a command:\n';
const showAgainHelp = ' soundCommand\nShow this message again with:\n';

const specificHelpEnd = ' possible sounds. To play a specific sound type the command and then the sound name after a space separator. The following is a list of its available sounds:\n';

const unrecognizedCmd = ' does not exist as a valid command. The following is a list of all possible commands:\n';
const noSoundsFound = 'could not find/access any sounds for the given command';
