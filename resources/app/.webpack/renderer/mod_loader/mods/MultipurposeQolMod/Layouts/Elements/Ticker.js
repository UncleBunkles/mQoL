
const { Toggle } = require('./Modules')
const baseElements = require('./BaseElements')

const butttons = {
    LEFT: 0,
    RIGHT: 1
}

/**
 * @property {Number} multiplier
 * @property {Number} min
 * @property {Number} max
 * @property {Number} step
 *
 * @property {Image} checkbox
 * @property {Text} toggle
 */
class Ticker extends Toggle {
    constructor(config) {
        super(config);

        this.setProperties({
            optional: {
                multiplier: 1,
                min: 1,
                max: 10,
                pool: undefined
            }
        })

        this.pool && this.pool.add(this)

        this.step = (config.step || 1) * this.multiplier

        this.checkbox = new baseElements.Image(this.mergeConfigs(config, {
            textureName: 'UI',
            frameName: 'menu_checkbox_24_bg.png'
        }))

        this.toggle = new baseElements.Text(this.mergeConfigs(config, {
            textureName: 'UI',
            frameName: 'menu_checkbox_24_bg.png'
        }))
    }

    EnableInput() {
        this.checkbox.setInteractive()

        this.checkbox.on("pointerdown", (event) => {
            if (event.button === butttons.LEFT) {
                this.varValue += this.step

                if (this.varValue > this.max) {
                    this.varValue = this.min
                }
            } else {
                this.varValue -= this.step

                if (this.varValue < this.min) {
                    this.varValue = this.max
                }
            }

            this.pool && this.pool.updateBy(this, event.button)

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
        try {
            this.toggle.text = (this.varValue / this.multiplier).toString()
        } catch {
            debugger
        }
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
     * @param {String} text
     */
    set text(text) {
        this.toggle.text = text
    }

    /**
     * @param {Boolean} value
     */
    setVisible(value) {
        this.checkbox.setVisible(value)
        this.toggle.setVisible(value)
    }
}

module.exports = Ticker
