
const {UIElement} = require('./Modules')

/**
 * @property {String} textureName
 * @property {String} frameName
 *
 * @property {Number} start
 * @property {Number} end
 * @property {Number} zeroPad
 * @property {Number} frameRate
 * @property {Number} scale
 * @property {Number} alpha
 *
 * @property {Boolean} flipX
 * @property {Boolean} playAnimation
 *
 * @property {Object} sprite
 */
class Sprite extends UIElement {
    constructor(config) {
        super(config);

        this.setProperties({
            mandatory: ['textureName', 'frameName'],

            optional: {
                start: 1,
                end: 3,
                zeroPad: 0,
                frameRate: 10,
                scale: 2.5,
                alpha: 1,
                flipX: false,
                playAnimation: false
            }
        });

        (this.sprite = this.layout.scene.add
            .sprite(this.xPos, this.yPos, this.textureName, this.frameName)
            .setAlpha(this.alpha)
            .setDepth(Number.MAX_SAFE_INTEGER)
            .setOrigin(this.xOrigin, this.yOrigin)
            .setScale(this.scale)
            .setFlipX(this.flipX));

        if (this.playAnimation) {
            const frames = this.layout.scene.anims.generateFrameNames(this.textureName, {
                start: this.start,
                end: this.end,
                zeroPad: this.zeroPad,
                prefix: this.frameName.match('(.+?)\\d+\.png')[1],
                suffix: ".png",
            })

            this.sprite.anims.create({
                key: "idle",
                frames: frames,
                frameRate: this.frameRate,
                repeat: -1,
            })

            this.sprite.play('idle')
        }
    }

    setInteractive() {
        this.sprite.setInteractive()
    }

    /**
     * @param {String} action
     * @param {Function} callback
     */
    on(action, callback) {
        this.sprite.on(action, callback)
    }

    /**
     * @param {Boolean} value
     */
    setVisible(value) {
        this.sprite.setVisible(value)
    }
}

module.exports = Sprite
