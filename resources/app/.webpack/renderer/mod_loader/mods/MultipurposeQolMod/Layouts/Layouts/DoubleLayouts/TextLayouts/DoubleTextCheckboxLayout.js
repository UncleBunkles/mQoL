
const BaseLayout = require('../../BaseLayout')
const elements = require("../../../Elements");

class DoubleTextCheckboxLayout extends BaseLayout {
    constructor(config) {
        super(config);

        this.firstCheckboxText = new elements.Text(this.mergeConfigs(this.mergeConfigs(config, config.first), {
            xPos: this.data.leftBorder,
            maxWidth: 100
        }))

        this.firstCheckbox = new elements.Checkbox(this.mergeConfigs(this.mergeConfigs(config, config.first), {
            scale: 2,
            xPos: this.data.leftBorder + 24 + 165,
            xOrigin: 0.5,
        }))

        this.secondCheckboxText = new elements.Text(this.mergeConfigs(this.mergeConfigs(config, config.second), {
            xPos: this.data.leftBorder + 30 + 165 + 37,
            maxWidth: 100
        }))

        this.secondCheckbox = new elements.Checkbox(this.mergeConfigs(this.mergeConfigs(config, config.second), {
            scale: 2,
            xPos: this.data.rightBorder + 24,
            xOrigin: 0.5,
        }))
    }

    EnableInput() {
        this.firstCheckbox.EnableInput()
        this.secondCheckbox.EnableInput()
    }

    ReadPlayerOptions() {
        this.firstCheckbox.ReadPlayerOptions()
        this.secondCheckbox.ReadPlayerOptions()
    }

    setVisible(value) {
        this.firstCheckbox.setVisible(value)
        this.firstCheckboxText.setVisible(value)

        this.secondCheckbox.setVisible(value)
        this.secondCheckboxText.setVisible(value)
    }
}

module.exports = DoubleTextCheckboxLayout
