module.exports = {

    /**
     * return true if the given message is a sound command, false otherwise.
     * Does not have to match an actual sound command, this function only checks for a valid prefix before a word
     */
    msgIsCmd: function(msg, prefix = '!') {
        return msg && msg.content && msg.content.startsWith(prefix) && msg.content.length > 1;
    },

    /**
     * return true if the given message is a help command, false otherwise.
     */
    msgIsHelpCmd: function(msgStr, prefix = '!') {
        return msgStr.content.startsWith(prefix + 'help');
    },

    /**
     * return true if the given message is a help command, false otherwise.
     */
    helpCmd: function(msgStr, prefix = '!') {
        return msgStr.slice((prefix + 'help').length, msgStr.length);
    },
    /**
     * return command without prefix
     */
    stripPrefixFromCmd: function(msgStr, prefix = '!') {
        return msgStr.substr(prefix.length);
    },

};
