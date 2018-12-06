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
        this.refreshGroups();
    }

    refreshGroups() {
        //create a map of soundgroups
        this.soundGroups = {};
        //create an array of soundGroups to loop over
        this.groupNames = [];
        for (const soundGroup in fs.readdirSync(this.dir)) {
            this.soundGroups[soundGroup] = new SoundCollection(path.join(this.dir, soundGroup));
            this.groupNames.push(soundGroup);
        }
    }

    get GroupNames() {
        return this.groupNames;
    }

    hasSoundGroup(group) {
        return group in this.soundGroups;
    }

    getSoundGroup(group) {
        return this.soundGroups[group];
    }
}

module.exports = SoundContext;