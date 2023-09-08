
const {UIElement} = require('./Modules')

/**
 * @property {String} _text
 * @property {Number} maxWidth
 * @property {Number} wrapWidth
 *
 * @property {Object} textElement
 */
class Text extends UIElement {
    constructor(config) {
        super(config);

        this._text = config.text

        this.setProperties({
            optional: {
                maxWidth: 180,
                wrapWidth: 0
            }
        });

        (this.textElement = this.layout.scene.add
            .text(this.xPos, this.yPos, this._text, { align: "left" , wordWrap: { width: this.wrapWidth }})
            .setScale(this.scale)
            .setOrigin(this.xOrigin, this.yOrigin));

        this.game.default.Lang.scaleToMaxFast(this.textElement, false, this.maxWidth)
    }

    /**
     * @return {String}
     */
    get text() {
        return this.textElement.text
    }

    /**
     * @param {String} text
     */
    set text(text) {
        this.textElement.text = text
    }

    /**
     * @return {Number}
     */
    get height() {
        return this.textElement.height
    }

    /**
     * @param {Boolean} value
     */
    setVisible(value) {
        this.textElement.setVisible(value)
    }
}

module.exports = Text
