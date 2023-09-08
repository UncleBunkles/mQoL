
const {Toggle} = require('./Modules')
const baseElements = require('./BaseElements')

/**
 * @property {Number} multiplier
 *
 * @property {Image} box
 * @property {Rectangle} line
 */
class Slider extends Toggle {
    constructor(config) {
        super(config);

        this.setProperties({
            optional: {
                xPos: this.layout.data.rightBorder,
                scale: 2,
                multiplier: 1
            }
        })

        this.box = new baseElements.Image(this.mergeConfigs(config, {
            xPos: this.xPos,
            textureName: "UI",
            frameName: "menu_square_flat_24.png",
            scale: this.scale
        }))

        this.line = new baseElements.Rectangle(this.mergeConfigs(config, {
            xPos: this.layout.scene.sliderBounds.left,
            yPos: this.box.y - 2,
            width: this.layout.scene.sliderBounds.width + this.box.width * this.scale,
            height: 4,
        }))

        this.layout.scene.children.bringToTop(this.box.image)
    }

    EnableInput() {
        this.box.setInteractive()
        this.layout.sliderManager.add(this, (value) => { this.varValue = value * this.multiplier })
    }

    ReadPlayerOptions() {
        this.box.x = this.layout.scene.sliderBounds.left +
            this.layout.scene.sliderBounds.width * this.varValue / this.multiplier
    }

    /**
     * @param {Boolean} value
     */
    setVisible(value) {
        this.box.setVisible(value)
        this.line.setVisible(value)
    }
}

module.exports = Slider
