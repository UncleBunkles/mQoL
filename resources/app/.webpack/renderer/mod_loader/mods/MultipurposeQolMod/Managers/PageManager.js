
const layouts = require('../Layouts')
const elements = require('../Layouts/Elements')

const SliderManager = require('./SliderManager')

class PageManager {
    constructor(config) {
        this.game = config.game
        this.scene = config.scene
        this.plugins = config.plugins

        this.pages = config.pages

        this.pages[0].show()
        this.pages[0].wasActivated = true

        this.currentPage = 1

        this.sliderManager = new SliderManager(config)

        this.pages.forEach(page => {
            page.elements.forEach(el => {
                el.pageManager = this
                el.sliderManager = this.sliderManager
            })
        })

        this.tooltip = new elements.Tooltip({
            game: this.game,
            layout: this,
            plugins: this.plugins,

            text: '',

            xPos: 800,
            yPos: 5,

            width: 292,
            height: 150
        })

        this.hideTooltip()

        if (this.pages.length > 1) {
            this.pageScroller = new layouts.PageScrollerLayout(config)

            this.min = 1
            this.max = this.pages.length

            this.pageScroller.leftArrow.on('pointerdown', () => this.onLeftArrowClicked())
            this.pageScroller.rightArrow.on('pointerdown', () => this.onRightArrowClicked())
        }
    }

    onLeftArrowClicked() {
        this.game.default.Sound.PlaySound('ClickIn')

        this.pages[this.currentPage - 1].hide()

        this.currentPage -= 1

        if (this.currentPage < this.min) {
            this.currentPage = this.max
        }

        this.updateContent()
    }

    onRightArrowClicked() {
        this.game.default.Sound.PlaySound('ClickIn')

        this.pages[this.currentPage - 1].hide()

        this.currentPage += 1

        if (this.currentPage > this.max) {
            this.currentPage = this.min
        }

        this.updateContent()
    }

    updateContent() {
        this.pages[this.currentPage - 1].show()
        this.updateText()

        if (!this.pages[this.currentPage - 1].wasActivated) {
            this.EnableInput()
            this.ReadPlayerOptions()

            this.pages[this.currentPage - 1].wasActivated = true
        }
    }

    updateText() {
        this.pageScroller.text.text = `${this.currentPage} / ${this.max}`
    }

    EnableInput() {
        this.pages[this.currentPage - 1].EnableInput()
        this.sliderManager.EnableInput()
    }

    ReadPlayerOptions() {
        this.pages[this.currentPage - 1].ReadPlayerOptions()
        this.sliderManager.ReadPlayerOptions()
    }

    showTooltip(text = 'Placeholder text, smth went wrong') {
        this.tooltip.text = text
        this.tooltip.setVisible(true)
    }

    hideTooltip() {
        this.tooltip.setVisible(false)
    }
}

module.exports = PageManager
