
const {UIElement} = require('./Modules')

/**
 * @property {String} textureName
 * @property {String} frameName
 *
 * @property {Object} image
 */
class Image extends UIElement {
    constructor(config) {
        super(config);

        this.setProperties({
            mandatory: ['textureName', 'frameName']
        });

        this.image = this.layout.scene.add
            .image(this.xPos, this.yPos, this.textureName, this.frameName)
            .setScale(this.scale)
            .setOrigin(this.xOrigin, this.yOrigin)
    }

    setInteractive() {
        this.image.setInteractive()
    }

    /**
     * @param {String} action
     * @param {Function} callback
     */
    on(action, callback) {
        this.image.on(action, callback)
    }

    /**
     * @param {String} frame
     */
    setFrame(frame) {
        this.image.setFrame(frame)
    }

    /**
     * @param {Boolean} value
     */
    setVisible(value) {
        this.image.setVisible(value)
    }

    /**
     * @return {Number}
     */
    get x() {
        return this.image.x
    }

    /**
     * @param {Number} value
     */
    set x(value) {
        this.image.x = value
    }

    /**
     * @return {Number}
     */
    get y() {
        return this.image.y
    }

    /**
     * @param {Number} value
     */
    set y(value) {
        this.image.y = value
    }

    /**
     * @return {Number}
     */
    get width() {
        return this.image.width
    }
}

module.exports = Image
