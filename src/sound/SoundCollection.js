const fs = require('fs');
const path = require('path');

class SoundCollection {

    /**
     * Constructor for the soundCollection
     *
     * @constructor
     * @param {string} dir the directory name of the sound, also used as the command for the sound ?MAYBE probably not? //TODO
     */
    constructor(dir) {
        this.dir = dir;
        const soundFiles = fs.readdirSync(this.dir);
        this.sounds = [];
        this.soundMap = {};

        soundFiles.forEach(function(soundFile) {
            //drop file suffix if it exists to get name of sound
            const soundPath = path.parse(soundFile);

            //get the actual absolute location of the sound-file
            const absPath = path.resolve(path.join(dir, soundFile));

            //put the absolute path in the map and index by sound name
            this.soundMap[soundPath.name] = absPath;
            this.sounds.push(soundPath.name);
        }, this);
    }

    /** Get a random sound if a sound exists, otherwise return null */
    getRandomSound() {
        if (!Array.isArray(this.sounds) && !this.sounds.length) {
            return null;
        }

        //Get a num between 0 and sounds.length to pick a random sound in the array
        const specifier = this.sounds[Math.floor(Math.random() * Math.floor(this.sounds.length))];
        return this.getSpecificSound(specifier);
    }

    /**
     * Returns true if the specified sound exists, returns false otherwises
     * @param {string} specifier the sound to check
     */
    hasSpecificSound(specifier) {
        return specifier in this.soundMap;
    }

    /**
     * Returns the specified sound if it exists
     * @param {string} specifier the name of the sound to get
     */
    getSpecificSound(specifier) {
        return this.soundMap[specifier];
    }

    /**
     * Return a string containing the list of sounds in this collection
     */
    getSoundList() {
        return Array.from(this.sounds, x => ' ' + x).toString().trim();
    }

    getNumSounds() {
        return this.sounds.length;
    }
}

module.exports = SoundCollection;
