
const layouts = require('../../Layouts')
const elements = require('../../Layouts/Elements')
const managers = require('../../Managers')

const { OptionsScene } = require('./modules')

class LimitBreakOptionsScene extends OptionsScene {
    constructor(modules) {
        super("LimitBreakOptionsScene", modules);

        this.LimitBreakConfigs = modules.LimitBreakConfigs
        this.WeaponConfigs = modules.WeaponConfigs
        this.Plugins = modules.Plugins

        this.headerText = 'Limit Break Options'

        this.baseYOffset = 28
        this.lineOffset = 75
    }

    createOptionsField() {
        this.tooltip = new elements.Tooltip({
            game: this.Game,
            layout: {scene: this},
            plugins: this.Plugins,

            width: 292,
            height: 150
        })

        this.tooltip.setVisible(false)
    }

    showWeaponOptions(weapon) {
        return () => {
            if (!this.weaponOptionsElements[weapon]) {
                let pool = new managers.TickersPool(function() {
                    return this.Game.default.Core.PlayerOptions.limitBreakOptions[`${weapon}_uniqueWeightsEnabled`]
                }.bind(this))

                let aliases = {
                    'power': 'Damage(Might)',
                    'critChance': 'Crit chance',
                }

                this.weaponOptionsElements[weapon] = new layouts.Page([
                    new elements.Image({
                        game: this.Game,
                        layout: { scene: this },

                        yPos: this.lineOffset + 33,
                        xPos: 292 / 2,

                        xOrigin: 0.5,

                        textureName: 'items',
                        frameName: this.WeaponConfigs.default[weapon][0].frameName,
                        scale: 3
                    }),

                    new layouts.TextCheckboxLayout({
                        game: this.Game,
                        scene: this,

                        text: {
                            text: 'Unique Weights',

                            xPos: 15,
                            yPos: this.baseYOffset + this.lineOffset * 2,

                            scale: 1.5
                        },

                        checkbox: {
                            varName: `${weapon}_uniqueWeightsEnabled`,
                            targetObjName: 'limitBreakOptions',

                            yPos: this.baseYOffset + this.lineOffset * 2,
                            xPos: 292 - 48 - 15,

                            scale: 2,
                        }
                    }),

                    ...[...Array(this.LimitBreakConfigs.default[weapon].length)].map((_, line) => {
                        let limitBreakOptionName = Object.keys(this.LimitBreakConfigs.default[weapon][line]).filter(
                            value => !['max', 'rarity'].includes(value)
                        )[0]

                        return new layouts.TextTickerLayout({
                            game: this.Game,
                            scene: this,

                            text: {
                                text: aliases[limitBreakOptionName] || limitBreakOptionName.capitalize(),

                                xPos: 15,
                                yPos: this.baseYOffset + this.lineOffset * (line + 3),

                                scale: 1.5,
                            },

                            ticker: {
                                varName: `${weapon}_${limitBreakOptionName}`,
                                targetObjName: 'limitBreakOptions',

                                pool: pool,
                                min: 1,
                                max: this.LimitBreakConfigs.default[weapon].length,

                                yPos: this.baseYOffset + this.lineOffset * (line + 3),
                                xPos: 292 - 24 - 15,

                                scale: 2,
                                xOrigin: 0.5,
                            }
                        })
                    })

                ])

                this.weaponOptionsElements[weapon].EnableInput()
                this.weaponOptionsElements[weapon].ReadPlayerOptions()
            }

            Object.keys(this.weaponOptionsElements).forEach(key => {
                if (key !== weapon) {
                    this.weaponOptionsElements[key].hide()
                } else {
                    this.weaponOptionsElements[key].show()
                    this.tooltip.height = this.lineOffset * this.weaponOptionsElements[key].elements.length + 10
                }
            })

            this.tooltip.setVisible(true)
        }
    }

    FillPage() {
        this.weaponOptionsElements = {}

        this.createOptionsField()

        this.tickersPool = new managers.TickersPool(function() {
            return this.Game.default.Core.PlayerOptions.qolModOptions.limitBreakUniqueWeightsEnabled
        }.bind(this))

        this.pageManager = new managers.PageManager({
            game: this.Game,
            scene: this,
            plugins: this.Plugins,
            line: 7,

            pages: [
                new layouts.Page([
                    new layouts.TextCheckboxLayout({
                        game: this.Game,
                        scene: this,

                        text: {
                            text: 'Unique Weights',
                        },

                        checkbox: {
                            varName: 'limitBreakUniqueWeightsEnabled',
                        },

                        line: 1
                    }),

                    ...[...Array(5)].map((_, line) => {
                        return new layouts.MultipleImageTickerLayout({
                            game: this.Game,
                            scene: this,
                            line: line + 2,

                            elements: [
                                ...[...Array(3)].map((_, index) => {
                                    const weaponName = Object.keys(this.LimitBreakConfigs.default)[line * 3 + index]

                                    return {
                                        image: {
                                            textureName: 'items',
                                            frameName: this.WeaponConfigs.default[weaponName][0].frameName,
                                            callback: this.showWeaponOptions(weaponName),
                                        },

                                        ticker: {
                                            varName: weaponName,
                                            targetObjName: 'limitBreakOptions',
                                            min: 1,
                                            max: Object.keys(this.LimitBreakConfigs.default).length,
                                            pool: this.tickersPool,
                                        },
                                    }
                                }),
                            ],
                        })
                    })
                ]),

                new layouts.Page([
                    ...[...Array(6)].map((_, line) => {
                        return new layouts.MultipleImageTickerLayout({
                            game: this.Game,
                            scene: this,
                            line: line + 1,

                            elements: [
                                ...[...Array(3)].map((_, index) => {
                                    const weaponName = Object.keys(this.LimitBreakConfigs.default)[(line + 5) * 3 + index]

                                    return {
                                        image: {
                                            textureName: 'items',
                                            frameName: this.WeaponConfigs.default[weaponName][0].frameName,
                                            callback: this.showWeaponOptions(weaponName),
                                        },

                                        ticker: {
                                            varName: weaponName,
                                            targetObjName: 'limitBreakOptions',
                                            min: 1,
                                            max: Object.keys(this.LimitBreakConfigs.default).length,
                                            pool: this.tickersPool,
                                        },
                                    }
                                }),
                            ],
                        })
                    })
                ]),

                new layouts.Page([
                    ...[...Array(6)].map((_, line) => {
                        return new layouts.MultipleImageTickerLayout({
                            game: this.Game,
                            scene: this,
                            line: line + 1,

                            elements: [
                                ...[...Array(3)].map((_, index) => {
                                    const weaponName = Object.keys(this.LimitBreakConfigs.default)[(line + 11) * 3 + index]

                                    return {
                                        image: {
                                            textureName: 'items',
                                            frameName: this.WeaponConfigs.default[weaponName][0].frameName,
                                            callback: this.showWeaponOptions(weaponName),
                                        },

                                        ticker: {
                                            varName: weaponName,
                                            targetObjName: 'limitBreakOptions',
                                            min: 1,
                                            max: Object.keys(this.LimitBreakConfigs.default).length,
                                            pool: this.tickersPool,
                                        },
                                    }
                                }),
                            ],
                        })
                    })
                ]),

                new layouts.Page([
                    ...[...Array(1)].map((_, line) => {
                        return new layouts.MultipleImageTickerLayout({
                            game: this.Game,
                            scene: this,
                            line: line + 1,

                            elements: [
                                ...[...Array(3)].map((_, index) => {
                                    const weaponName = Object.keys(this.LimitBreakConfigs.default)[(line + 17) * 3 + index]

                                    return {
                                        image: {
                                            textureName: 'items',
                                            frameName: this.WeaponConfigs.default[weaponName][0].frameName,
                                            callback: this.showWeaponOptions(weaponName),
                                        },

                                        ticker: {
                                            varName: weaponName,
                                            targetObjName: 'limitBreakOptions',
                                            min: 1,
                                            max: Object.keys(this.LimitBreakConfigs.default).length,
                                            pool: this.tickersPool,
                                        },
                                    }
                                }),
                            ],
                        })
                    })
                ]),
            ],
        })
    }
}

module.exports = LimitBreakOptionsScene
