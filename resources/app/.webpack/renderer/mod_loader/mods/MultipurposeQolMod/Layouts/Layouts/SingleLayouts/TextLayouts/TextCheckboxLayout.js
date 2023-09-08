
const BaseLayout = require('../../BaseLayout')
const elements = require('../../../Elements')

class TextCheckboxLayout extends BaseLayout {
    constructor(config) {
        super(config);

        this.parseConfig({
            this: {
                mandatory: ['text', 'checkbox']
            }
        }, {
            text: {
                xPos: this.data.leftBorder
            },

            checkbox: {
                scale: 2,
                xPos: this.data.rightBorder
            }
        })

        this.text = new elements.Text(this.text)
        this.checkbox = new elements.Checkbox(this.checkbox)
    }

    EnableInput() {
        this.checkbox.EnableInput()
    }

    ReadPlayerOptions() {
        this.checkbox.ReadPlayerOptions()
    }

    setVisible(value) {
        this.text.setVisible(value)
        this.checkbox.setVisible(value)
    }
}

module.exports = TextCheckboxLayout
