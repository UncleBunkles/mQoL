
const BaseLayout = require('../../BaseLayout')
const elements = require('../../../Elements')

class MultipleImageTickerLayout extends BaseLayout {
    constructor(config) {
        super(config);

        this.images = []
        this.tickers = []

        this.imagePositions = [
            this.data.leftBorder + 13,
            this.data.leftBorder + 171,
            this.data.leftBorder + 327
        ]

        this.tickerPositions = [
            this.data.leftBorder + 86,
            this.data.leftBorder + 243,
            this.data.rightBorder
        ]

        for (let i = 0; i <= config.elements.length - 1; i += 1) {
            const element = config.elements[i]

            this.images.push(new elements.Sprite(this.supplement(element.image, {
                xPos: this.imagePositions[i],
            })))

            this.tickers.push(new elements.Ticker(this.supplement(element.ticker, {
                scale: 2,
                xOrigin: 0.5,
                xPos: this.tickerPositions[i] + 24,
            })))

            if (element.image.callback) {
                this.images[i].setInteractive()
                this.images[i].on('pointerdown', element.image.callback)
            }
        }
    }

    EnableInput() {
        this.tickers.forEach(ticker => ticker.EnableInput())
    }

    ReadPlayerOptions() {
        this.tickers.forEach(ticker => ticker.ReadPlayerOptions())
    }

    setVisible(value) {
        this.images.forEach(image => image.setVisible(value))
        this.tickers.forEach(ticker => ticker.setVisible(value))
    }
}

module.exports = MultipleImageTickerLayout
