
const {UIElement} = require('./Modules')

/**
 * @property {Number} width
 * @property {Number} height
 * @property {Number} color
 *
 * @property {Object} rectangle
 */
class Rectangle extends  UIElement {
    constructor(config) {
        super(config);

        this.setProperties({
            optional: {
                width: 100,
                height: 20,
                color: 0
            }
        })

        this.rectangle = this.layout.scene.add.rectangle(
            this.xPos,
            this.yPos,
            this.width,
            this.height,
            this.color
        ).setOrigin(this.xOrigin, this.yOrigin)
    }

    /**
     * @param {Boolean} value
     */
    setVisible(value) {
        this.rectangle.setVisible(value)
    }
}

module.exports = Rectangle
