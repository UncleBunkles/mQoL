
const layouts = require('../../Layouts')
const managers = require('../../Managers')

const { OptionsScene } = require('./modules')

class ChestsOptionsScene extends OptionsScene {
    constructor(modules) {
        super("ChestsOptionsScene", modules)

        this.Game = modules.Game;
        this.Plugins = modules.Plugins;

        this.headerText = 'Chests Options'
    }

    FillPage() {
        this.pageManager = new managers.PageManager({
            game: this.Game,
            scene: this,
            plugins: this.Plugins,

            pages: [
                new layouts.Page([
                    // Colored chests toggle
                    new layouts.TextCheckboxLayout({
                        game: this.Game,
                        scene: this,

                        text: {
                            text: 'Colored Chests',
                        },

                        checkbox: {
                            varName: 'coloredChestsEnabled',

                            tooltipText: `Assigns a color to chests depending on contents:
                            Purple - Contains Arcana
                            Gold - Contains Evolution
                            Bronze - Normal Chest`.replace(/ {2,50}/g, '\n'),
                        },

                        line: 1
                    }),

                    // Spawn chests on player toggle
                    new layouts.TextCheckboxLayout({
                        game: this.Game,
                        scene: this,

                        text: {
                            text: 'Spawn On Player',
                        },

                        checkbox: {
                            varName: 'spawnChestsOnPlayerEnabled',
                        },

                        line: 2
                    }),

                    // Single chests options
                    new layouts.DoubleTextCheckboxLayout({
                        game: this.Game,
                        scene: this,

                        first: {
                            varName: 'skipSingleChests',
                            text: 'Skip Single',
                        },

                        second: {
                            varName: 'autoSingleChestsConfirm',
                            text: 'Auto Confirm',
                        },

                        line: 3,
                    }),

                    // Triple chests options
                    new layouts.DoubleTextCheckboxLayout({
                        game: this.Game,
                        scene: this,

                        first: {
                            varName: 'skipTripleChests',
                            text: 'Skip Triple',
                        },

                        second: {
                            varName: 'autoTripleChestsConfirm',
                            text: 'Auto Confirm',
                        },

                        line: 4,
                    }),

                    // Penta chests options
                    new layouts.DoubleTextCheckboxLayout({
                        game: this.Game,
                        scene: this,

                        first: {
                            varName: 'skipPentaChests',
                            text: 'Skip Penta',
                        },

                        second: {
                            varName: 'autoPentaChestsConfirm',
                            text: 'Auto Confirm',
                        },

                        line: 5,
                    }),
                ]),
            ],
        })
    }
}

module.exports = ChestsOptionsScene
