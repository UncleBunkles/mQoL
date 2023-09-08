
const {BaseHigherOrderUIElement} = require('./Modules')
const baseElements = require("./BaseElements");

/**
 * @property {String} text
 *
 * @property {Number} width
 * @property {Number} height
 *
 * @property {Object} plugins
 * @property {Object} background
 * @property {Text} tooltipText
 */
class Tooltip extends BaseHigherOrderUIElement {
    constructor(config) {
        super(config);

        this._text = config.text

        this.setProperties({
            mandatory: ['plugins'],

            optional: {
                xPos: 0,
                yPos: 5,
                width: 100,
                height: 100,
            }
        })

        let opts = {
            x: this.xPos,
            y: this.yPos,
            width: this.width,
            height: this.height,
        }

        this.background = new this.plugins.NineSlice(
            this.layout.scene, {
                sourceKey: "UI",
                sourceFrame: "frame1_c2.png",
                sourceLayout: {
                    width: 12,
                    height: 12
                },
            }, opts)

        this.layout.scene.add.existing(this.background)

        this.tooltipText = new baseElements.Text({
            game: this.game,
            layout: this.layout,

            xPos: this.xPos + 7,
            yPos: this.yPos + 4,

            text: this._text,
            wrapWidth: this.width - 5,
            scale: 1,

            yOrigin: 0,
        })

        Object.defineProperty(this, 'height', {
            get: () => this.background.height,
            set: value => this.background.resize(this.width, value)
        })
    }

    /**
     * @param {Boolean} value
     */
    setVisible(value) {
        this.background.setVisible(value)
        this.tooltipText.setVisible(value)
    }

    /**
     * @return {String}
     */
    get text() {
        return this.tooltipText.text
    }

    /**
     * @param {String} text
     */
    set text(text) {
        this.tooltipText.text = text
        this.background.resize(this.width, this.tooltipText.height + 9)
    }
}

module.exports = Tooltip
