
const BaseLayout = require('../../BaseLayout')
const elements = require('../../../Elements')

class TextTickerLayout extends BaseLayout {
    constructor(config) {
        super(config);

        this.parseConfig({
            this: {
                mandatory: ['text', 'ticker']
            }
        }, {
            text: {
                xPos: this.data.leftBorder
            },

            ticker: {
                scale: 2,
                xPos: this.data.rightBorder + 24,
                xOrigin: 0.5
            }
        })

        this.text = new elements.Text(this.text)
        this.ticker = new elements.Ticker(this.ticker)
    }

    EnableInput() {
        this.ticker.EnableInput()
    }

    ReadPlayerOptions() {
        this.ticker.ReadPlayerOptions()
    }

    setVisible(value) {
        this.text.setVisible(value)
        this.ticker.setVisible(value)
    }
}

module.exports = TextTickerLayout
