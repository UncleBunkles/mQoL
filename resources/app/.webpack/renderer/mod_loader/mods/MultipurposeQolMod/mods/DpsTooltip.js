
const CharWeaponsPanel = {
    constructor() {
        if (self.Game.default.Core.PlayerOptions.qolModOptions.dpsTooltipEnabled) {
            let weapons = self.Game.default.Core.Weapons.filter((weapon) => !weapon.isPowerUp)
            let weaponsIcons = {}

            this.list.filter(el => {
                return el.frame.texture.key && el.frame.texture.key.includes('items')
            }).forEach(icon => {
                weaponsIcons[icon.frame.name] = icon
            })

            for (let i = 0; i < weapons.length; i += 1) {
                let dpsTooltipText, dpsTooltip
                const weapon = weapons[i]
                const weaponConfig = self.WeaponConfigs.default[weapon.bulletType]

                const icon = weaponsIcons[weaponConfig[0].frameName]

                icon.setInteractive();
                icon.on('pointerover', () => {
                    dpsTooltipText = `${(weapon.damageQueue.sum * 10 / weapon.damageQueue.length || 0).toFixed(0)} dps`

                    dpsTooltip = new Phaser.GameObjects.Text(
                        this.scene,
                        205,
                        (this.lbTooltipBackground ? this.lbTooltipBackground.y + this.lbTooltipBackground.height : 0) + 5,
                        dpsTooltipText,
                        {align: "left", fontSize: 16}
                    )

                    let opts = {
                        x: 200,
                        y: this.lbTooltipBackground ? this.lbTooltipBackground.y + this.lbTooltipBackground.height : 0,
                        width: 115,
                        height: dpsTooltip.height + 11,
                    };

                    this.dpsTooltipBackground = new self.Plugins.NineSlice(
                        this.scene, {
                            sourceKey: "UI",
                            sourceFrame: "frame1_c2.png",
                            sourceLayout: {
                                width: 12,
                                height: 12
                            },
                        }, opts);

                    this.add(this.dpsTooltipBackground)
                    this.add(dpsTooltip)
                })

                icon.on('pointerout', () => {
                    this.dpsTooltipBackground.setAlpha(0)
                    dpsTooltip.destroy()
                })
            }
        }
    }
}

const BaseBullet = {
    constructor() {
        const { Queue } = require('../Data')

        // this._stats_inflictedDamage = 0
        this.damageQueue = new Queue(self.Game.default.Core.PlayerOptions.qolModOptions.dpsQueueSize)
    },

    getStats_inflictedDamage() {
        return this._stats_inflictedDamage
    },

    setStats_inflictedDamage(newValue) {
        this._stats_inflictedDamage = newValue
        this.damageQueue.last = this.stats_inflictedDamage - this.damageQueue.lifetimeSum + this.damageQueue.last
    }
}

const MainUI = {
    SetSurvivedSeconds() {
        if (self.Game.default.Core.PlayerOptions.qolModOptions.dpsTooltipEnabled) {
            self.Game.default.Core.Weapons.forEach(weapon => {
                weapon.damageQueue.enqueue(weapon.stats_inflictedDamage - weapon.damageQueue.lifetimeSum)
            })
        }
    }
}

module.exports = {
    mods: [
        {
            key: 'post',
            callback: '2.CharWeaponsPanel.constructor',
            target: CharWeaponsPanel.constructor
        },

        {
            key: 'post',
            callback: 'BaseBullet.constructor',
            target: BaseBullet.constructor
        },

        {
            key: 'createGetter',
            callback: 'BaseBullet.stats_inflictedDamage',
            target: BaseBullet.getStats_inflictedDamage
        },

        {
            key: 'createSetter',
            callback: 'BaseBullet.stats_inflictedDamage',
            target: BaseBullet.setStats_inflictedDamage
        },

        {
            key: 'post',
            callback: 'MainUI.SetSurvivedSeconds',
            target: MainUI.SetSurvivedSeconds
        },
    ]
}
