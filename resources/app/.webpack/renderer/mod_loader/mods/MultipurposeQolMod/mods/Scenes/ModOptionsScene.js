
const layouts = require('../../Layouts')
const managers = require('../../Managers')

const { OptionsScene } = require('./modules')

class ModOptionsScene extends OptionsScene {
    constructor(modules) {
        super("ModOptionsScene", modules)

        this.NineSliceConfig = modules.NineSliceConfig
        this.Core = modules.Core
        this.Game = modules.Game
        this.Plugins = modules.Plugins

        let weapons = []

        for (const weapon in modules.WeaponConfigs.default) {
            weapons.push(modules.WeaponConfigs.default[weapon][0])
        }

        this._maxWeapons = weapons.filter(el => !el.isSpecialOnly && !el.isPowerUp && !el.isEvolution).length
        this._maxPassives = weapons.filter(el => el.isPowerUp).length

        this.headerText = 'Mod Options'
    }

    FillPage() {
        this.MagnetOptionsButton = new this.Plugins.NineSlice(this, this.NineSliceConfig.default.OptionsButton, {
            x: this.renderer.width - 8 - 100,
            y: this.renderer.height - 128 - 64,
            width: 100,
            height: 32,
            })
            .setScale(2 * this.Core.default.PixelScale)
            .setOrigin(0.5)

        this.add.existing(this.MagnetOptionsButton)

        this.MagnetOptionsText = this.add
            .text(
            this.MagnetOptionsButton.x,
            this.MagnetOptionsButton.y,
            "Magnet Options", {
            align: "center",
            })
            .setScale(1 * this.Core.default.PixelScale)
            .setOrigin(0.5)

        this.ChestsOptionsButton = new this.Plugins.NineSlice(this, this.NineSliceConfig.default.OptionsButton, {
            x: this.renderer.width - 8 - 100,
            y: this.renderer.height - 128 - 128,
            width: 100,
            height: 32,
            })
            .setScale(2 * this.Core.default.PixelScale)
            .setOrigin(0.5)

        this.add.existing(this.ChestsOptionsButton)

        this.ChestsOptionsText = this.add
            .text(
            this.ChestsOptionsButton.x,
            this.ChestsOptionsButton.y,
            "Chests Options", {
            align: "center",
            })
            .setScale(1 * this.Core.default.PixelScale)
            .setOrigin(0.5)

        this.LimitBreakOptionsButton = new this.Plugins.NineSlice(this, this.NineSliceConfig.default.OptionsButton, {
            x: this.renderer.width - 8 - 100,
            y: this.renderer.height - 128,
            width: 100,
            height: 32,
            })
            .setScale(2 * this.Core.default.PixelScale)
            .setOrigin(0.5)

        this.add.existing(this.LimitBreakOptionsButton)

        this.MagnetOptionsText = this.add
            .text(
            this.LimitBreakOptionsButton.x,
            this.LimitBreakOptionsButton.y,
            "Limit Break Options", {
            align: "center",
            })
            .setScale(1 * this.Core.default.PixelScale)
            .setOrigin(0.5)

        this.pageManager = new managers.PageManager({
            game: this.Game,
            scene: this,
            plugins: this.Plugins,

            line: 7,

            pages: [
                // First page
                new layouts.Page([
                    // Debug mode toggle
                    new layouts.TextCheckboxTextTickerLayout({
                        game: this.Game,
                        scene: this,

                        checkboxText: 'Debug Mode',
                        checkboxVarName: 'debugModeEnabled',

                        tickerText: '{G} chest lvl',
                        tickerVarName: 'debugChestLvl',
                        tickerMin: 1,
                        tickerMax: 3,

                        tooltipText: `Features:
                        Q: Get Candybox
                        X: Level Up
                        H: Heal
                        Z: All Weapons, Passives and Unobtainable Items
                        I: Invulnerable
                        T: Next Minute
                        O: Player Dies
                        P: Time Stop (uses a time freeze)
                        E: Spawn Max Enemies
                        F: Fire All Weapons
                        K: Trigger Rosary
                        G: Evo Chest
                        V: Turn on Vacuum
                        MouseWheel: zoom out
                        B: Spawn Destructibles
                        N: Arcana Menu
                        M: Max Movespeed (Toggleable)`.replace(/ {2,50}/g, ''),

                        line: 1
                    }),

                    // Limit break tooltip toggle
                    new layouts.TextCheckboxLayout({
                        game: this.Game,
                        scene: this,

                        text: {
                            text: 'Limit Break Stats Tooltip',
                        },

                        checkbox: {
                            varName: 'limitBreakTooltipEnabled',
                            tooltipText: 'Shows weapon\'s limit broken stats on hovering',
                        },

                        line: 2
                    }),

                     // Gem guide toggle
                     new layouts.TextCheckboxLayout({
                        game: this.Game,
                        scene: this,

                         text: {
                            text: 'Gem Guide',
                         },

                         checkbox: {
                            varName: 'gemGuideEnabled',
                            tooltipText: `Places an arrow guide on gems once it reaches a certain value
                            With colored guides enabled brightest guide points on the biggest gem`.replace(/ {2,50}/g, '\n'),
                         },

                        line: 3
                    }),

                    // Colored guides toggle
                    new layouts.TextCheckboxLayout({
                        game: this.Game,
                        scene: this,

                        // tooltipText: `Assigns colors to the pointer guides:
                        // Chests
                        // Gems`.replace(/ {2,50}/g, '\n'),

                        text: {
                            text: 'Colored Guides',
                        },

                        checkbox: {
                            varName: 'coloredGuidesEnabled',
                        },

                        line: 4
                    }),

                    // Starting arcanas ticker
                    new layouts.TextTickerLayout({
                        game: this.Game,
                        scene: this,

                        text: {
                            text: 'Starting Arcanas',
                        },

                        ticker: {
                            varName: 'startingArcanas',
                            min: 1,

                            max: function () {
                                return this.Game.default.Core.PlayerOptions.qolModOptions.maxArcanas
                            }.bind(this),

                            tooltipText: 'Allows user to select the amount of starting Arcanas'
                        },

                        line: 5,
                    }),

                    // Starting arcanas ticker
                    new layouts.TextTickerLayout({
                        game: this.Game,
                        scene: this,

                        text: {
                            text: 'Max arcanas',
                        },

                        ticker: {
                            varName: 'maxArcanas',

                            min: 1,
                            max: 21,

                            tooltipText: 'Just increases max arcanas, does NOT add more arcana chests, ' +
                            'so makes sense only with either Queen Sigma or starting arcanas option'
                        },

                        line: 6,
                    }),
                ]),

                // Second page
                new layouts.Page([
                    // Extended candybox checkbox
                    new layouts.TextCheckboxLayout({
                        game: this.Game,
                        scene: this,

                        text: {
                            text: 'Extended candybox',
                        },

                        checkbox: {
                            varName: 'extendedCandyboxEnabled',
                            tooltipText: 'Candybox will show each single weapon(including unobtainable ones) ' +
                            'instead of only unevolved ones',
                        },

                        line: 1
                    }),

                    // Candies for everyone checkbox
                    new layouts.TextCheckboxLayout({
                        game: this.Game,
                        scene: this,

                        text: {
                            text: 'Candies for everyone',
                        },

                        checkbox: {
                            varName: 'candiesForEveryoneEnabled',
                            tooltipText: 'Gives each character candybox as starting weapon',
                        },

                        line: 2
                    }),

                    // Dps tooltip settings
                    new layouts.TextCheckboxTextTickerLayout({
                        game: this.Game,
                        scene: this,
                        checkboxText: 'Dps Tooltip',
                        checkboxVarName: 'dpsTooltipEnabled',

                        tickerText: 'Track Time(s)',
                        tickerVarName: 'dpsQueueSize',
                        tickerMin: 3,
                        tickerMax: 9,

                        line: 3,

                        tooltipText: 'Calculates the average DPS over a given period of time'
                    }),

                    // Kills ps settings
                    new layouts.TextCheckboxTextTickerLayout({
                        game: this.Game,
                        scene: this,
                        checkboxText: 'Kills/s Counter',
                        checkboxVarName: 'killsPSEnabled',

                        tickerText: 'Track Time(s)',
                        tickerVarName: 'killsPSQueueSize',
                        tickerMin: 3,
                        tickerMax: 9,

                        line: 4,

                        tooltipText: 'Calculates the average kills per second over a given period of time'
                    }),

                    // Gold ps settings
                    new layouts.TextCheckboxTextTickerLayout({
                        game: this.Game,
                        scene: this,

                        checkboxText: 'Gold/s Counter',
                        checkboxVarName: 'goldPSEnabled',

                        tickerText: 'Track Time(s)',
                        tickerVarName: 'goldPSQueueSize',
                        tickerMin: 3,
                        tickerMax: 9,

                        line: 5,

                        tooltipText: 'Calculates the average gold per second over a given period of time'
                    }),

                    // Max weapons/passives tickers
                    new layouts.DoubleTextTickerLayout({
                        game: this.Game,
                        scene: this,

                        first: {
                            text: {
                                text: 'Max Weapons',
                            },

                            ticker: {
                                varName: 'SelectedMaxWeapons',
                                max: this._maxWeapons,
                                defaultPlayerOptionsUsed: true,
                            }
                        },

                        second: {
                            text: {
                                text: 'Max Passives',
                            },

                            ticker: {
                                varName: 'maxPowerUpWeapons',
                                max: this._maxPassives,
                            }
                        },

                        line: 6,
                    }),
                ]),

                // new layouts.Page([
                    // new layouts.TextSliderLayout({
                    //     game: this.Game,
                    //     scene: this,
                    //
                    //     text: {
                    //         text: 'Vfx opacity',
                    //     },
                    //
                    //     slider: {
                    //         varName: 'masterOpacity',
                    //     },
                    //
                    //     line: 1,
                    // }),
                // ]),
            ],
        })
    }

    EnableInput() {
        this.MagnetOptionsButton.setInteractive()

        this.MagnetOptionsButton.on("pointerdown", () => {
            this.Game.default.Core.SceneManager.MagnetOptionsFromModOptions()
            this.Game.default.Sound.PlaySound("ClickIn")
        })

        this.ChestsOptionsButton.setInteractive()

        this.ChestsOptionsButton.on("pointerdown", () => {
            this.Game.default.Core.SceneManager.ChestsOptionsFromModOptions()
            this.Game.default.Sound.PlaySound("ClickIn")
        })

        this.LimitBreakOptionsButton.setInteractive()

        this.LimitBreakOptionsButton.on("pointerdown", () => {
            this.Game.default.Core.SceneManager.LimitBreakOptionsFromModOptions()
            this.Game.default.Sound.PlaySound("ClickIn")
        })

        super.EnableInput()
    }
}

module.exports = ModOptionsScene
