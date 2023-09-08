
const CharWeaponsPanel = {
    constructor() {
        if (self.Game.default.Core.PlayerOptions.qolModOptions.limitBreakTooltipEnabled) {
            let statsConfigs = {
                power: {
                    modifier: 10,
                    fixed: 0,
                    alias: 'Damage(Might)',
                    postfix: '',
                },

                duration: {
                    modifier: 1,
                    postfix: ' ms'
                },

                amount: {
                    modifier: 1,
                    fixed: 0,
                    postfix: ''
                },

                penetrating: {
                    modifier: 1,
                    fixed: 0,
                    postfix: ''
                },

                area: {},
                speed: {},
                critChance: {},
                chance: {},
            }

            const defaultStatsConfig = {
                modifier: 100,
                fixed: 0,
                postfix: '%'
            }

            for (const prop in defaultStatsConfig) {
                for (const stat in statsConfigs) {
                    if (statsConfigs[stat][prop] === undefined) { statsConfigs[stat][prop] = defaultStatsConfig[prop] }
                }
            }

            let weapons = self.Game.default.Core.Weapons.filter((weapon) => !weapon.isPowerUp)
            let weaponsIcons = {}

            this.list.filter(el => {
                return el.frame.texture.key && el.frame.texture.key.includes('items')
            }).forEach(icon => {
                weaponsIcons[icon.frame.name] = icon
            })

            for (let i = 0; i < weapons.length; i += 1) {
                let lbTooltipText, lbTooltip

                const weapon = weapons[i]

                const weaponConfig = self.WeaponConfigs.default[weapon.bulletType]
                const limitBreakConfig = self.LimitBreakConfigs.default[weapon.bulletType];

                let icon = weaponsIcons[weaponConfig[0].frameName]

                icon.setInteractive();
                icon.on('pointerover', () => {
                    if (!limitBreakConfig || limitBreakConfig.length === 0) {
                        lbTooltipText = 'This weapon has no \nlimit breaks.'
                    } else if (weapon.limitBreakLevel < 1) {
                        lbTooltipText = 'This weapon has no \nlimit breaks yet.'
                    } else {
                        lbTooltipText = `Limit Broken Stats:`

                        for (const lbOption of limitBreakConfig) {
                            let optionStat = Object.getOwnPropertyNames(lbOption).filter(el => !['max', 'rarity'].includes(el))[0]
                            let statConfig = statsConfigs[optionStat]
                            let baseStat = 0

                            for (let levelIdx = 0; levelIdx < weapon.level; levelIdx += 1) {
                                const level = weaponConfig[levelIdx]

                                if (Object.getOwnPropertyNames(level).includes(optionStat)) {
                                    baseStat += level[optionStat]
                                }
                            }

                            let statText = ((weapon[optionStat] - baseStat) * statConfig.modifier).toFixed(statConfig.fixed).toString()
                            lbTooltipText = `${lbTooltipText}\n${(statConfig.alias || optionStat.capitalize()).replace(/(\w+)([A-F]\w+)/, '$1 $2')}: ${statText + statConfig.postfix}`
                        }
                    }

                    lbTooltip = new Phaser.GameObjects.Text(this.scene, 205, 5, lbTooltipText, { align: "left", fontSize: "6" })

                    let opts = {
                        x: 200,
                        y: 0,
                        width: 115,
                        height: lbTooltip.height + 11,
                    };

                    this.lbTooltipBackground = new self.Plugins.NineSlice(
                        this.scene, {
                            sourceKey: "UI",
                            sourceFrame: "frame1_c2.png",
                            sourceLayout: {
                                width: 12,
                                height: 12
                            },
                        }, opts);

                    this.add(this.lbTooltipBackground)
                    this.add(lbTooltip)
                });

                icon.on('pointerout', () => {
                    this.lbTooltipBackground.setAlpha(0)
                    lbTooltip.destroy()
                });
            }
        }
    }
}

module.exports = {
    mods: [
        {
            key: 'post',
            callback: '1.CharWeaponsPanel.constructor',
            target: CharWeaponsPanel.constructor
        }
    ]
}
