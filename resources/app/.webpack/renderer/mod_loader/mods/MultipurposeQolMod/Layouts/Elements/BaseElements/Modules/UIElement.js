
const {BaseElement} = require("../../../Modules")

/**
 * @property {Object} layout
 *
 * @property {Number} xPos
 * @property {Number} yPos
 *
 * @property {Number} xOrigin
 * @property {Number} yOrigin
 *
 * @property {Number} scale
 */
class UIElement extends BaseElement {
    constructor(config) {
        super(config);

        this.setProperties({
            mandatory: ['layout', 'xPos'],
        })

        this.setProperties({
            optional: {
                yPos: this.layout.yPos,
                scale: 1.5,
                xOrigin: 0,
                yOrigin: 0.5,
            }
        })
    }
}

module.exports = UIElement
