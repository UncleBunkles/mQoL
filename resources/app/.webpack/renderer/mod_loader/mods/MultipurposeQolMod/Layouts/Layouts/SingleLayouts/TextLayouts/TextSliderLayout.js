
const BaseLayout = require('../../BaseLayout')
const elements = require('../../../Elements')

/**
 * @property {String} text
 *
 * @property {Number} textXPos
 * @property {Number} textYPos
 * @property {Number} textScale
 * @property {Number} textXOrigin
 * @property {Number} textYOrigin
 *
 * @property {Number} textMaxWidth
 * @property {Number} textWrapWidth
 *
 * @property {String} varName
 *
 * @property {Number} sliderXPos
 * @property {Number} sliderYPos
 * @property {Number} sliderScale
 * @property {Number} sliderXOrigin
 * @property {Number} sliderYOrigin
 *
 * @property {Number} sliderMultiplier
 */
class TextSliderLayout extends BaseLayout {
    constructor(config) {
        super(config);

        this.setProperties({
            mandatory: ['text', 'slider']
        })

        this.setProperties({
            mandatory: ['text'],

            optional: {
                xPos: this.data.leftBorder,
                yPos: this.yPos,
                scale: 1.5,
                xOrigin: 0,
                yOrigin: 0.5,

                maxWidth: 180,
                wrapWidth: 0
            },

            prefix: 'text'
        }, this.text)

        this.setProperties({
            mandatory: ['varName'],

            optional: {
                xPos: this.data.rightBorder,
                yPos: this.yPos,
                scale: 2,
                xOrigin: 0,
                yOrigin: 0.5,

                multiplier: 1
            },

            prefix: 'slider'
        }, this.slider)

        this.text = new elements.Text(this.mergeConfigs(config, {
            text: this.textText,

            xPos: this.textXPos,
            yPos: this.textYPos,
            scale: this.textScale,
            xOrigin: this.textXOrigin,
            yOrigin: this.textYOrigin,

            maxWidth: this.textMaxWidth,
            wrapWidth: this.textWrapWidth
        }))

        this.slider = new elements.Slider(this.mergeConfigs(config, {
            varName: this.sliderVarName,

            xPos: this.sliderXPos,
            yPos: this.sliderYPos,
            scale: this.sliderScale,
            xOrigin: this.sliderXOrigin,
            yOrigin: this.sliderYOrigin,

            multiplier: this.sliderMultiplier
        }))
    }

    /**
     * @param {Boolean} value
     */
    setVisible(value) {
        this.text.setVisible(value)
        this.slider.setVisible(value)
    }

    EnableInput() {
        this.slider.EnableInput()
    }

    ReadPlayerOptions() {
        this.slider.ReadPlayerOptions()
    }
}

module.exports = TextSliderLayout
