
const BaseLayout = require('../../BaseLayout')
const elements = require('../../../Elements')

class MultipleImageCheckboxLayout extends BaseLayout {
    constructor(config) {
        super(config);

        this.images = []
        this.checkboxes = []

        this.imagePositions = [
            this.data.leftBorder + 13,
            this.data.leftBorder + 171,
            this.data.leftBorder + 327
        ]

        this.checkboxPositions = [
            this.data.leftBorder + 86,
            this.data.leftBorder + 243,
            this.data.rightBorder
        ]

        for (let i = 0; i <= config.elements.length - 1; i += 1) {
            const element = config.elements[i]

            this.images.push(new elements.Sprite(this.supplement(element.image, {
                xPos: this.imagePositions[i],
            })))

            this.checkboxes.push(new elements.Checkbox(this.supplement(element.checkbox, {
                scale: 2,
                xPos: this.checkboxPositions[i],
            })))

            if (element.image.callback) {
                this.images[i].setInteractive()
                this.images[i].on('pointerdown', element.image.callback)
            }
        }
    }

    EnableInput() {
        this.checkboxes.forEach(checkbox => checkbox.EnableInput())
    }

    ReadPlayerOptions() {
        this.checkboxes.forEach(checkbox => checkbox.ReadPlayerOptions())
    }

    setVisible(value) {
        this.images.forEach(image => image.setVisible(value))
        this.checkboxes.forEach(checkbox => checkbox.setVisible(value))
    }
}

module.exports = MultipleImageCheckboxLayout
