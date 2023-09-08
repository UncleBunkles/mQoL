
const BaseLayout = require('../../BaseLayout')
const layouts = require('../../SingleLayouts')

class DoubleTextTickerLayout extends BaseLayout {
    #first
    #second

    constructor(config) {
        super(config);

        this.parseConfig({
            this: {
                mandatory: ['first', 'second']
            }
        }, {
            first: () => {
                return {
                    text: this.supplement(this.first.text, {
                        xPos: this.data.leftBorder,
                        maxWidth: 100
                    }),

                    ticker: this.supplement(this.first.ticker, {
                        scale: 2,
                        xPos: this.data.leftBorder + 24 + 165,
                        xOrigin: 0.5,
                    })
                }
            },

            second: () => {
                return {
                    text: this.supplement(this.second.text, {
                        xPos: this.data.leftBorder + 30 + 165 + 37,
                        maxWidth: 100
                    }),

                    ticker: this.supplement(this.second.ticker, {
                        scale: 2,
                    xPos: this.data.rightBorder + 24,
                    xOrigin: 0.5,
                    })
                }
            }
        })

        this.#first = new layouts.TextTickerLayout(this.first)
        this.#second = new layouts.TextTickerLayout(this.second)
    }

    EnableInput() {
        this.#first.EnableInput()
        this.#second.EnableInput()
    }

    ReadPlayerOptions() {
        this.#first.ReadPlayerOptions()
        this.#second.ReadPlayerOptions()
    }

    setVisible(value) {
        this.#first.setVisible(value)
        this.#second.setVisible(value)
    }
}

module.exports = DoubleTextTickerLayout
