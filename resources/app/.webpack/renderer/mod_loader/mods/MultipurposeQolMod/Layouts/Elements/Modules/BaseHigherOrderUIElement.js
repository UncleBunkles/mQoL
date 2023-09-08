
const {BaseElement} = require('../../Modules')

/**
 * @property {Object} layout
 */
class BaseHigherOrderUIElement extends BaseElement {
    constructor(config) {
        super(config);

        this.setProperties({
            mandatory: ['layout']
        })
    }

    /**
     * @param {Object} first
     * @param {Object} second
     * @return {Object}
     */
    mergeConfigs(first, second) {
        const config = {}

        Object.getOwnPropertyNames(first).forEach(prop => config[prop] = first[prop])
        Object.getOwnPropertyNames(second).forEach(prop => config[prop] = second[prop])

        return config
    }
}

module.exports = BaseHigherOrderUIElement
