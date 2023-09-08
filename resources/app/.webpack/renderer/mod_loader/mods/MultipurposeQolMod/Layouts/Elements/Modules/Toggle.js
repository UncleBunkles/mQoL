
const BaseHigherOrderElement = require('./BaseHigherOrderUIElement')

/**
 * @property {string} varName
 * @property {string} tooltipText
 *
 * @property {boolean} defaultPlayerOptionsUsed
 * @property {string} targetObjName
 *
 * @property {Object} targetObj
 */
class Toggle extends BaseHigherOrderElement {
    constructor(config) {
        super(config);

        this.setProperties({
            mandatory: ['varName'],

            optional: {
                defaultPlayerOptionsUsed: false,
                targetObjName: 'qolModOptions',
                tooltipText: ''
            }
        })

        if (this.defaultPlayerOptionsUsed) {
            this.targetObj = this.game.default.Core.PlayerOptions
        } else {
            this.targetObj = this.game.default.Core.PlayerOptions[this.targetObjName]
        }
    }

    /**
     * @return {*}
     */
    get varValue() {
        let value = this.targetObj[this.varName]

        if (value === undefined) {
            if (!this.defaultPlayerOptionsUsed) {
                value = this.layout.data[this.targetObjName][this.varName]
            }
        }

        return value
    }

    /**
     * @param value
     */
    set varValue(value) {
        this.targetObj[this.varName] = value
    }
}

module.exports = Toggle
