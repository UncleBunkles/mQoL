
const baseElements = require('./BaseElements')
const {Toggle} = require('./Modules')

/**
 * @property {Image} checkbox
 * @property {Image} toggle
 */
class Checkbox extends Toggle {
    constructor(config) {
        super(config);

        this.checkbox = new baseElements.Image(this.mergeConfigs(config, {
            textureName: 'UI',
            frameName: 'menu_checkbox_24_bg.png'
        }))

        this.toggle = new baseElements.Image(this.mergeConfigs(config, {
            textureName: 'UI',
            frameName: 'yes16.png'
        }))
    }

    EnableInput() {
        this.checkbox.setInteractive()

        this.checkbox.on("pointerdown", () => {
            this.varValue = !this.varValue

            this.game.default.Sound.PlaySound('ClickIn')

            this.ReadPlayerOptions()
        })

        if (this.tooltipText) {
            this.checkbox.on('pointerover', () => {
                this.layout.pageManager.showTooltip(this.tooltipText)
            })

            this.checkbox.on('pointerout', () => {
                this.layout.pageManager.hideTooltip()
            })
        }
    }

    ReadPlayerOptions() {
        this.toggle.setFrame(this.varValue ? "yes16.png" : "no16.png");
    }

    setInteractive() {
        this.checkbox.setInteractive()
    }

    /**
     * @param {String} action
     * @param {Function} callback
     */
    on(action, callback) {
        this.checkbox.on(action, callback)
    }

    /**
     * @param {String} frame
     */
    setFrame(frame) {
        this.toggle.setFrame(frame)
    }

    /**
     * @param {Boolean} value
     */
    setVisible(value) {
        this.checkbox.setVisible(value)
        this.toggle.setVisible(value)
    }
}

module.exports = Checkbox
