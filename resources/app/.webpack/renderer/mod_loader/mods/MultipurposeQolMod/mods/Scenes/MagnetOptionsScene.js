
const layouts = require('../../Layouts')
const managers = require('../../Managers')

const { OptionsScene } = require('./modules')

class MagnetOptionsScene extends OptionsScene {
    constructor(modules) {
        super("MagnetOptionsScene", modules)

        this.Game = modules.Game
        this.Plugins = modules.Plugins

        this.headerText = 'Magnet Options'
    }

    FillPage() {
        this.pageManager = new managers.PageManager({
            game: this.Game,
            scene: this,
            plugins: this.Plugins,

            pages: [
                new layouts.Page([
                    // Instant magnet toggle
                    new layouts.TextCheckboxLayout({
                        game: this.Game,
                        scene: this,

                        text: {
                            text: 'Instant Magnet',
                        },

                        checkbox: {
                            varName: 'instantMagnetEnabled',
                            tooltipText: 'Pickups will now instantly be picked up - fly time got removed',
                        },

                        line: 1
                    }),

                    // Minimal magnet size ticker
                    new layouts.TextTickerLayout({
                        game: this.Game,
                        scene: this,

                        text: {
                            text: 'Minimal Range(px)',
                        },

                        ticker: {
                            varName: 'minimalMagnetRange',

                            tooltipText: 'The minimal magnet pickup range',

                            min: 0,
                            max: 50,
                            step: 5,
                        },

                        line: 2,
                    }),

                    // Gem, roast and little heart toggles
                    new layouts.MultipleImageCheckboxLayout({
                        game: this.Game,
                        scene: this,
                        line: 3,

                        elements: [
                            {
                                image: {
                                    textureName: 'items',
                                    frameName: 'GemBlue.png',
                                },

                                checkbox: {
                                    varName: 'GEM',
                                    targetObjName: 'magnetOptions',
                                    tooltipText: 'If disabled, gems will only be picked up within minimal range',
                                }
                            },

                            {
                                image: {
                                    textureName: 'items',
                                    frameName: 'Roast.png',
                                },

                                checkbox: {
                                    varName: 'ROAST',
                                    targetObjName: 'magnetOptions',
                                    tooltipText: 'If disabled, roasts will only be picked up within minimal range',
                                }
                            },

                            {
                                image: {
                                    textureName: 'items',
                                    frameName: 'HeartMini.png',
                                },

                                checkbox: {
                                    varName: 'LITTLEHEART',
                                    targetObjName: 'magnetOptions',
                                    tooltipText: 'If disabled, little hearts will only be picked up within minimal range',
                                }
                            },
                        ],
                    }),

                    // Coin, coinbag1 and coinbagmax toggles
                    new layouts.MultipleImageCheckboxLayout({
                        game: this.Game,
                        scene: this,
                        line: 4,

                        elements: [
                            {
                                image: {
                                    textureName: 'items',
                                    frameName: 'CoinGold.png',
                                },

                                checkbox: {
                                    varName: 'COIN',
                                    targetObjName: 'magnetOptions',
                                    tooltipText: 'If disabled, coins will only be picked up within minimal range',
                                }
                            },

                            {
                                image: {
                                    textureName: 'items',
                                    frameName: 'MoneyBagRed.png',
                                },

                                checkbox: {
                                    varName: 'COINBAG1',
                                    targetObjName: 'magnetOptions',
                                    tooltipText: 'If disabled, red money bags will only be picked up within minimal range',

                                }
                            },

                            {
                                image: {
                                    textureName: 'items',
                                    frameName: 'MoneyBagColor.png',
                                },

                                checkbox: {
                                    varName: 'COINBAGMAX',
                                    targetObjName: 'magnetOptions',
                                    tooltipText: 'If disabled, max money bags will only be picked up within minimal range',
                                }
                            },
                        ],
                    }),

                    // Rosary, nft and clock toggles
                    new layouts.MultipleImageCheckboxLayout({
                        game: this.Game,
                        scene: this,
                        line: 5,

                        elements: [
                            {
                                image: {
                                    textureName: 'items',
                                    frameName: 'Rosary1.png',
                                    playAnimation: true,
                                },

                                checkbox: {
                                    varName: 'ROSARY',
                                    targetObjName: 'magnetOptions',
                                    tooltipText: 'If disabled, rosaries will only be picked up within minimal range',

                                }
                            },

                            {
                                image: {
                                    textureName: 'items',
                                    frameName: 'Nft1.png',
                                    end: 4,
                                    playAnimation: true,
                                },

                                checkbox: {
                                    varName: 'NFT',
                                    targetObjName: 'magnetOptions',
                                    tooltipText: 'If disabled, nduja frittas will only be picked up within minimal range',
                                }
                            },

                            {
                                image: {
                                    textureName: 'items',
                                    frameName: 'PocketWatch1.png',
                                    playAnimation: true,
                                },

                                checkbox: {
                                    varName: 'OROLOGION',
                                targetObjName: 'magnetOptions',
                                    tooltipText: 'If disabled, pocket watches will only be picked up within minimal range',

                                }
                            },
                        ],
                    }),

                    // Vacuum, gilded clover and clover toggles
                    new layouts.MultipleImageCheckboxLayout({
                        game: this.Game,
                        scene: this,
                        line: 6,

                        elements: [
                            {
                                image: {
                                    textureName: 'items',
                                    frameName: 'Vacuum1.png',
                                    playAnimation: true,
                                },

                                checkbox: {
                                    varName: 'VACUUM',
                                targetObjName: 'magnetOptions',
                                    tooltipText: 'If disabled, vacuums will only be picked up within minimal range',

                                }
                            },

                            {
                                image: {
                                    textureName: 'items',
                                    frameName: 'Gilded0.png',
                                    playAnimation: true,
                                },

                                checkbox: {
                                    varName: 'GILDED',
                                    targetObjName: 'magnetOptions',
                                    tooltipText: 'If disabled, gilded clovers will only be picked up within minimal range',

                                }
                            },

                            {
                                image: {
                                    textureName: 'items',
                                    frameName: 'Clover2.png',
                                },

                                checkbox: {
                                    varName: 'CLOVER',
                                    targetObjName: 'magnetOptions',
                                    tooltipText: 'If disabled, clovers will only be picked up within minimal range',
                                }
                            },
                        ],
                    }),

                    // Golden egg
                    new layouts.MultipleImageCheckboxLayout({
                        game: this.Game,
                        scene: this,
                        line: 7,

                        elements: [
                            {
                                image: {
                                    textureName: 'items',
                                    frameName: 'goldenegg.png',
                                },

                                checkbox: {
                                    varName: 'RELIC_GOLDENEGG',
                                    targetObjName: 'magnetOptions',
                                    tooltipText: 'If disabled, golden eggs will only be picked up within minimal range',
                                }
                            },
                        ],
                    }),
                ]),
            ],
        })
    }
}

module.exports = MagnetOptionsScene
