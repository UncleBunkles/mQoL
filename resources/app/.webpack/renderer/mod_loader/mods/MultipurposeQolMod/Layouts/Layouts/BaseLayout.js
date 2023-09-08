
const modules = require('../../Data')
const {BaseElement} = require('../Modules');

/**
 * @property {Object} scene
 * @property {Number} line
 * @property {LayoutData} data
 */
class BaseLayout extends BaseElement {
    constructor(config) {
        super(config);

        this.setProperties({
            mandatory: ['scene'],

            optional: {
                line: 1
            }
        })

        this.data = new modules.LayoutData(this.game)

        this.supplementToAll = {
            game: this.game,
            line: this.line,
            layout: this,
            scene: this.scene
        }
    }

    /** @return {Number} */
    get yPos() {
        return this.data.baseYOffset + this.data.lineOffset * this.line
    }

    /**
     * @param {Object} first
     * @param {Object} second
     * @return {Object}
     */
    mergeConfigs(first, second) {
        const config = { layout: this }

        Object.getOwnPropertyNames(first).forEach(prop => config[prop] = first[prop])
        Object.getOwnPropertyNames(second).forEach(prop => config[prop] = second[prop])

        return config
    }
}

module.exports = BaseLayout
