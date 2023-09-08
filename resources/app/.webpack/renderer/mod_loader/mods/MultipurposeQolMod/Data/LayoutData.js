
const defaultModOptions = require('./defaultModOptions.json')
const defaultMagnetOptions = require('./defaultMagnetOptions.json')
const defaultLimitBreakOptions = require('./defaultLimitBreakOptions.json')

/**
 * @typedef LayoutData
 *
 * @property {Number} leftBorder
 * @property {Number} rightBorder
 * @property {Number} baseYOffset
 * @property {Number} lineOffset
 * @property {defaultModOptions.json} defaultModOptions
 * @property {defaultMagnetOptions} defaultMagnetOptions
 */

/** @type LayoutData */
class LayoutData {
    constructor(game) {
        this.leftBorder = 30 + game.SAFEAREA.left

        this.rightBorder = 430 + game.SAFEAREA.left

        this.baseYOffset = 39
        this.lineOffset = 75

        this.qolModOptions = defaultModOptions
        this.magnetOptions = defaultMagnetOptions
        this.limitBreakOptions = defaultLimitBreakOptions
    }
}

module.exports = LayoutData
