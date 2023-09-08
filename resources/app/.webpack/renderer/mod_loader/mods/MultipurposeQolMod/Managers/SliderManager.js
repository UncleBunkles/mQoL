
const layouts = require('../Layouts')

class SliderManager {
    constructor(config) {
        this.game = config.game
        this.scene = config.scene

        this._sliders = {}
        this._sliderIndex = 0
    }

    EnableInput() {
        for (let i in this._sliders) {
            this.scene.input.setDraggable(this._sliders[i].slider.box.image, true)
            this._sliders[i].slider.box.on("dragstart", function (a, b) {} .bind(this))
        }

        this.scene.input.on(
            "drag",
            function (a, element, x, b) {
            x <= this.scene.sliderBounds.left
             ? (x = this.scene.sliderBounds.left)
             : x >= this.scene.sliderBounds.right && (x = this.scene.sliderBounds.right),
            (element.x = x);
            let sliderValue = (element.x - this.scene.sliderBounds.left) / this.scene.sliderBounds.width;

            for (let i in this._sliders) {
                if (element === this._sliders[i].slider.box.image) {
                    this._sliders[i].callback(sliderValue)
                }
            }
        }
            .bind(this))

        this.scene.input.on(
            "dragend",
            function (a, b) {
            this.game.default.Core.PlayerOptions.SaveOptions(),
            this.ReadPlayerOptions();
        }
            .bind(this))
    }

    ReadPlayerOptions() {
        for (let i in this._sliders) {
            this._sliders[i].slider.ReadPlayerOptions()
        }
    }

    add(obj, callback) {
        this._sliders[this._sliderIndex] = { slider: obj, callback: callback }
        this._sliderIndex += 1
    }
}

module.exports = SliderManager
