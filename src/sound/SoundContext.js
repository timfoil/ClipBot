const fs = require('fs');
const path = require('path');
const SoundCollection = require('./SoundCollection');


/**
 * A class that acts as a handler for all of the Sound Groups
 */
class SoundContext {

    /**
     * Constructor for SoundContext
     * @param {string} dir Directory the sound-groups should be found
     */
    constructor(dir) {
        this.dir = dir;
        this.refreshGroups();
    }

    refreshGroups() {
        // create a map of soundGroups
        this.soundGroups = {};

        // create an array of soundGroups to loop over
        this.groupNames = [];

        const groups = fs.readdirSync(this.dir);

        groups.forEach(function(soundGroup) {
            this.soundGroups[soundGroup] = new SoundCollection(path.join(this.dir, soundGroup));
            this.groupNames.push(soundGroup);
        }, this);
    }

    /**
     * Given a (prefixless) command return a soundpath to a requested soundfile
     * @param {string} cmd issued by the user
     * @returns a path to a sound file desired by the command or null if no sound exists
     */
    getSoundFromGroup(cmd) {
        // remove trailing spaces
        const spacelessCmd = cmd.trim();
        const paramSep = spacelessCmd.indexOf(' ');
        if (paramSep === -1) {
            if (this.hasSoundGroup(cmd)) {
                return this.soundGroups[cmd].getRandomSound(); //get a random sound
            }
        }

        // get sound group/collection
        const command = cmd.slice(0, paramSep);

        // get sound specifier (not including the space separator)
        const param = cmd.slice(paramSep + 1, cmd.length);

        if (this.hasSoundGroup(command) && this.soundGroups[command].hasSpecificSound(param)) {
            return this.soundGroups[command].getSpecificSound(param);
        }

        // Could not find command, return null
        return null;
    }

    hasSoundGroup(group) {
        return group in this.soundGroups;
    }

    getSoundGroup(group) {
        return this.soundGroups[group];
    }

    /** Get a random sound if a sound exists, otherwise return null */
    getRandomSound() {
        if (Array.isArray(this.groupNames) && this.groupNames.length) {
            // Get a num between 0 and sounds.length to pick a random sound in the array
            const randomGroup = this.groupNames[Math.floor(Math.random() * Math.floor(this.groupNames.length))];
            return this.soundGroups[randomGroup].getRandomSound();
        } else {
            return null;
        }
    }
}

module.exports = SoundContext;