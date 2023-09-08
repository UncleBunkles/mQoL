
const GemClass = {
    constructor() {
        this.Cursor = this.scene.add.sprite(x, y, "UI", "arrow_01.png")
        this.Cursor.setDepth(9999),
        this.Cursor.setScale(2),
        this.Cursor.setAlpha(0.75),
        this.Cursor.setBlendMode(self.BlendModes.BlendModes.ADD),
        (self.Game.default.Core.PlayerOptions.qolModOptions.coloredGuidesEnabled && this.Cursor.setTint(15476269)),
        this.Cursor.setVisible(false);

        const frameNames = this.anims.generateFrameNames("UI", {
            start: 1,
            end: 8,
            zeroPad: 2,
            prefix: "arrow_",
            suffix: ".png",
        });

        this.Cursor.anims.create({
            key: "idle",
            frames: frameNames,
            frameRate: 16,
            repeat: -1,
        }),

        this.Cursor.play("idle");
    },

    Update() {
        if (
            super.Update(),
            this.setDepth(this.y - self.Game.default.Core.Player.y - this.scene.renderer.height),
            Math.abs(this.x - self.Game.default.Core.Player.x) < 0.5 * this.scene.renderer.width &&
            Math.abs(this.y - self.Game.default.Core.Player.y) < 0.5 * this.scene.renderer.height
        ) {
            this.Cursor.copyPosition(this),
            (this.Cursor.y -= 24),
            this.Cursor.setAngle(90),
            this.Cursor.setAlpha(1),
            this.Cursor.setBlendMode(self.BlendModes.BlendModes.NORMAL);
        } else {
            let angle = this.AngleFromTargetRadians(this);
            this.Cursor.setAngle(Phaser.Math.RadToDeg(angle)),
            this.Cursor.copyPosition(self.Game.default.Core.Player),
            (this.Cursor.x += 0.45 * Math.cos(angle) * this.scene.renderer.width),
            (this.Cursor.y += 0.45 * Math.sin(angle) * this.scene.renderer.height),
            this.Cursor.setAlpha(0.75),
            this.Cursor.setBlendMode(self.BlendModes.BlendModes.ADD);
        }
    },

    DeSpawn() {
        super.DeSpawn()
        this.Cursor.setVisible(false)
    },

    GetTaken() {
        this.Cursor.setVisible(false);
    }
}

const Core = {
    MakeGem() {
        if (this.PlayerOptions.qolModOptions.gemGuideEnabled && this.PlayerOptions.ShowPickups) {
            let gigaGems = []

            for (let pickup of this.PickupGroup.children.entries) {
                if (pickup.frameName.includes('Gem')) {
                    if (pickup.value > 500) {
                        gigaGems.push(pickup)
                    } else {
                        pickup.Cursor.setVisible(false)
                    }
                }
            }

            if (gigaGems.length) {
                let maxGem = gigaGems[0]

                for (let gem of gigaGems) {
                    if (gem.value > maxGem.value) {
                        maxGem = gem
                    }

                    self.Game.default.Core.PlayerOptions.qolModOptions.coloredGuidesEnabled && gem.Cursor.setTint(5639181)
                    gem.Cursor.setVisible(true)
                }

                self.Game.default.Core.PlayerOptions.qolModOptions.coloredGuidesEnabled && maxGem.Cursor.setTint(15476269)
            }
        }
    }
}

module.exports = {
    mods: [
        {
            key: 'post',
            callback: 'GemClass.constructor',
            target: GemClass.constructor
        },

        {
            key: 'post',
            callback: 'GemClass.Update',
            target: GemClass.Update
        },

        {
            key: 'overwrite',
            callback: 'GemClass.DeSpawn',
            target: GemClass.DeSpawn
        },

        {
            key: 'pre',
            callback: 'GemClass.GetTaken',
            target: GemClass.GetTaken
        },

        {
            key: 'pre',
            callback: 'Core.MakeGem',
            target: Core.MakeGem
        },

        {
            key: 'overwriteSignature',
            callback: 'GemClass.constructor',
            target: 'pool, x, y, value = 0'
        }
    ]
}
