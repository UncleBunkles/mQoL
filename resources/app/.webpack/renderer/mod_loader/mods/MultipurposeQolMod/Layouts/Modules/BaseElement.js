
Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});


/**
 * @property {Object} game
 * @property {Object} config
 * @property {Object} [supplementToAll]
 */
class BaseElement {
    constructor(config) {
        this.config = config

        this.setProperties({
            mandatory: ['game']
        })
    }

    /**
     * @method
     * @param {{
     * [mandatory]: string[],
     * [optional]: Map<string>,
     * [prefix]: string,
     * }} config
     *
     * @param {Object} _from
     */
    setProperties(config, _from) {
        _from = _from || this.config

        config.mandatory?.forEach(prop => {
            const prefixProp = config.prefix ? `${config.prefix}${prop.capitalize()}` : prop

            if (_from[prop] === undefined) {
                debugger
                throw `${prop} of ${this.constructor.name} is not defined`
            }

            this[prefixProp] = _from[prop]

            if (this[prefixProp] instanceof Function) {
                Object.defineProperty(this, prefixProp, {
                    get: () => this[prefixProp]()
                })
            }
        })

        for (let prop in config.optional) {
            const prefixProp = config.prefix ? `${config.prefix}${prop.capitalize()}` : prop
            this[prefixProp] = _from[prop] === undefined ? config.optional[prop] : _from[prefixProp]

            if (this[prefixProp] instanceof Function) {
                Object.defineProperty(this, prefixProp, {
                    get: () => _from[prop] === undefined ? config.optional[prop]() : _from[prefixProp]()
                })
            }
        }
    }

    /**
     * @param {Object} target
     * @param {Object} by
     */
    supplement(target, by) {
        Object.keys(by).forEach(key => {
            if (target[key] === undefined) {
                target[key] = by[key]
            }
        })

        Object.keys(this.supplementToAll).forEach(key => {
            if (target[key] === undefined) {
                target[key] = this.supplementToAll[key]
            }
        })

        return target
    }

    /**
     * @param {Map<string, Object>} properties
     * @param {Map<string, Function|Object>} supplements
     */
    parseConfig(properties, supplements) {
        this.#parseSingleConfigs(properties)
        this.#supplementSingleConfigs(supplements)
    }

    /**
     * @param {Map<string, Object>} properties
     */
    #parseSingleConfigs(properties) {
        Object.keys(properties).forEach(key => {
            this.setProperties(properties[key], key === 'this' ? undefined : this[key])
        })
    }

    /**
     * @param {Map<string, Function|Object>} supplements
     */
    #supplementSingleConfigs(supplements) {
        Object.keys(supplements).forEach(key => {
            let value = supplements[key]

            let by = value instanceof Function ? value() : value
            this.supplement(this[key], by)
        })

    }
}

module.exports = BaseElement
