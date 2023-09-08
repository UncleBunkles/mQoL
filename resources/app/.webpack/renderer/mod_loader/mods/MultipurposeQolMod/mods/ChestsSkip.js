
const UI_treasureScene = {
    SetupTreasureLevel1() {
        this.MakePrize(1),
        this.MakeRibbons(2, this.Chest.x, this.Chest.y - 50, 1500, -1),
        this.textures.removeKey("reel_1_blue_powerup"),
        this.textures.removeKey("reel_1_blue_powerup_empty");
        let reelConfig = new self.ReelConfig.ReelConfig();
        (reelConfig.textureName = "reel_1_blue_powerup"),
        (reelConfig.alpha = 0.5),
        (reelConfig.color = 255),
        (reelConfig.prizeType = this.prizes[0].prizeType),
        this.MakeReels([reelConfig]),
        this.MakeCoinsEmitter(1),
        this.MakeWinIcons(),
        this.openButton.on("pointerdown", () => {
            self.Game.default.Sound.StopSound("ThingFound"),
            this.disableInput(),
            this.openButton.removeAllListeners()

            const skipMultiplier = +(!self.Game.default.Core.PlayerOptions.qolModOptions.skipSingleChests);

            if (skipMultiplier) {
                self.Game.default.Sound.PlaySound("Treasure1", {
                    volume: 1,
                })
            }

            this.OpenChest(),
            this.StartCounter(7500),
            this.HideHeader(),
            this.StartCoinsEmitters(6300 * skipMultiplier),
            this.StartRibbons(),
            this.StartReels(),
            this.bubbles.Show(6000, 6710784),
            (this.QSCounterDelay = 1200 * skipMultiplier),
            (this.QSSeekTrack = 6.3),
            (this.QS_SFX = "Treasure1"),
            (this.QSEvent = this.Delay(6300 * skipMultiplier, () => {
                    (this.hasSkipped = true),
                    this.StopReels(),
                    this.StopRibbons(),
                    this.StartPrizes(),
                    this.bubbles.Hide(),
                    this.escKey.removeAllListeners(),
                    (this.QSSecondEvent = this.Delay(6000 * skipMultiplier, () => {
                            this.HideReels(),
                            this.MoveCounter(),
                            this.ShowOKButton();

                            if (self.Game.default.Core.PlayerOptions.qolModOptions.autoSingleChestsConfirm) {
                                this.disableInput()
                                this.DismissScene()
                                this.openButton.removeAllListeners()
                            }
                        }));
                })),
            (self.PickupConfigs.default["STATS_TREASURE_1"].pickedupAmount >= 5 ||
                self.PickupConfigs.default["STATS_TREASURE_3"].pickedupAmount >= 1 ||
                self.PickupConfigs.default["TREASURE"].pickedupAmount >= 50) &&
            this.Delay(900 * skipMultiplier, () => {
                this.EnableQS();
            });
        });

        const confirmInterval = setInterval(() => {
            if (self.Game.default.Core.SceneManager.UI_overlayScene.UI_grid) {
                this.openButton._events.pointerdown.fn()
                clearInterval(confirmInterval)
            }
        }, 0)
    },

    SetupTreasureLevel2() {
        this.MakePrize(2),
        this.MakeRibbons(6, this.Chest.x, this.Chest.y - 50, 1500, -1),
        this.MakeTextureNamesFromPrizes();
        let reelConfig1 = new self.ReelConfig.ReelConfig();
        (reelConfig1.textureName = this.TextureNames[0]),
        (reelConfig1.alpha = 0.5),
        (reelConfig1.color = 8913151),
        (reelConfig1.prizeType = this.prizes[0].prizeType);
        let reelConfig2 = new self.ReelConfig.ReelConfig();
        (reelConfig2.textureName = this.TextureNames[2]),
        (reelConfig2.alpha = 0.5),
        (reelConfig2.color = 16711935),
        (reelConfig2.prizeType = this.prizes[1].prizeType);
        let reelConfig3 = new self.ReelConfig.ReelConfig();
        (reelConfig3.textureName = this.TextureNames[4]),
        (reelConfig3.alpha = 0.5),
        (reelConfig3.color = 16711935),
        (reelConfig3.prizeType = this.prizes[2].prizeType),
        this.MakeReels([reelConfig1, reelConfig2, reelConfig3]),
        this.MakeCoinsEmitter(2),
        this.MakeWinIcons()

        const skipMultiplier = +(!self.Game.default.Core.PlayerOptions.qolModOptions.skipTripleChests);

        this.openButton.on("pointerdown", () => {
            self.Game.default.Sound.StopSound("ThingFound"),
            this.disableInput(),
            this.openButton.removeAllListeners()

            if (skipMultiplier) {
                self.Game.default.Sound.PlaySound("Treasure2", {
                    volume: 1,
                })
            }

            this.OpenChest(),
            this.StartCounter(11000 * skipMultiplier),
            this.HideHeader(),
            this.StartCoinsEmitters(11000),
            this.StartRibbons(),
            this.StartReels([2]),
            this.Delay(80 * skipMultiplier, () => this.StartReels([0])),
            this.Delay(160 * skipMultiplier, () => this.StartReels([1])),
            this.bubbles.Show(9700, 13421568),
            this.tweens.add({
                targets: this.backgroundOverlay,
                alpha: 0.7,
                duration: 9700 * skipMultiplier,
            }),
            (this.QSCounterDelay = 1300 * skipMultiplier),
            (this.QSSeekTrack = 9.7),
            (this.QS_SFX = "Treasure2"),
            (this.QSEvent = this.Delay(9700 * skipMultiplier, () => {
                    (this.hasSkipped = true),
                    this.tweens.add({
                        targets: this.backgroundOverlay,
                        alpha: 0,
                        duration: 1000 * skipMultiplier,
                    }),
                    this.StopReels(),
                    this.StopRibbons(),
                    this.StartPrizes(),
                    this.bubbles.Hide(),
                    this.escKey.removeAllListeners(),
                    (this.QSSecondEvent = this.Delay(6000 * skipMultiplier, () => {
                            this.HideReels(),
                            this.MoveCounter(),
                            this.ShowOKButton();

                            if (self.Game.default.Core.PlayerOptions.qolModOptions.autoTripleChestsConfirm) {
                                this.disableInput()
                                this.DismissScene()
                                this.openButton.removeAllListeners()
                            }
                        }));
                }));
        }),
        (self.PickupConfigs.default["STATS_TREASURE_1"].pickedupAmount >= 3 ||
            self.PickupConfigs.default["STATS_TREASURE_3"].pickedupAmount >= 1 ||
            self.PickupConfigs.default["TREASURE"].pickedupAmount >= 50) &&
        this.Delay(1800 * skipMultiplier, () => {
            this.EnableQS();
        });

        const confirmInterval = setInterval(() => {
            if (self.Game.default.Core.SceneManager.UI_overlayScene.UI_grid) {
                this.openButton._events.pointerdown.fn()
                clearInterval(confirmInterval)
            }
        }, 0)
    },

    SetupTreasureLevel3() {
        this.MakePrize(3),
        this.MakeTextureNamesFromPrizes();
        let reelConfig1 = new self.ReelConfig.ReelConfig();
        (reelConfig1.textureName = this.TextureNames[0]),
        (reelConfig1.alpha = 0.5),
        (reelConfig1.color = 16711680),
        (reelConfig1.prizeType = this.prizes[0].prizeType);
        let reelConfig2 = new self.ReelConfig.ReelConfig();
        (reelConfig2.textureName = this.TextureNames[2]),
        (reelConfig2.alpha = 0.5),
        (reelConfig2.color = 16746496),
        (reelConfig2.prizeType = this.prizes[1].prizeType);
        let reelConfig3 = new self.ReelConfig.ReelConfig();
        (reelConfig3.textureName = this.TextureNames[4]),
        (reelConfig3.alpha = 0.5),
        (reelConfig3.color = 16746496),
        (reelConfig3.prizeType = this.prizes[2].prizeType);
        let reelColfig4 = new self.ReelConfig.ReelConfig();
        (reelColfig4.textureName = this.TextureNames[6]),
        (reelColfig4.alpha = 0.5),
        (reelColfig4.color = 16776960),
        (reelColfig4.prizeType = this.prizes[3].prizeType);
        let reelConfig5 = new self.ReelConfig.ReelConfig();
        (reelConfig5.textureName = this.TextureNames[8]),
        (reelConfig5.alpha = 0.5),
        (reelConfig5.color = 16776960),
        (reelConfig5.prizeType = this.prizes[4].prizeType),
        this.MakeReels([reelConfig1, reelConfig2, reelConfig3, reelColfig4, reelConfig5]),
        this.MakeRibbons(8, this.Chest.x, this.Chest.y - 50, 1500, -1),
        this.MakeRibbonsLevel3(),
        this.MakeCoinsEmitter(3),
        this.MakeWinIcons(),
        this.openButton.on("pointerdown", () => {
            self.Game.default.Sound.StopSound("ThingFound"),
            this.disableInput(),
            this.openButton.removeAllListeners();

            const skipMultiplier = +(!self.Game.default.Core.PlayerOptions.qolModOptions.skipPentaChests);

            if (skipMultiplier) {
                self.Game.default.Sound.PlaySound("Treasure3", {
                    volume: 1.1,
                });
            }

            this.StartFireworks(),
            this.Delay(1600 * skipMultiplier, () => {
                this.OpenChest(),
                this.tweens.add({
                    targets: this.backgroundOverlay,
                    alpha: 1,
                    duration: 30,
                    yoyo: true,
                    onComplete: () => {
                        this.tweens.add({
                            targets: this.backgroundOverlay,
                            alpha: 1,
                            duration: 6900,
                        });
                    },
                }),
                this.StartCounter(13900 * skipMultiplier),
                this.HideHeader(),
                this.StartCoinsEmitters(14400 * skipMultiplier),
                this.StartRibbons(),
                this.StartReels([0, 1, 2]),
                this.bubbles.Show(5200, 16776960),
                this.Delay(6900 * skipMultiplier, () => {
                    this.StartRibbons2(),
                    this.Delay(1000 * skipMultiplier, () => {
                        this.ribbons2[0].setMask(this.UpperMask),
                        this.ribbons2[1].setMask(this.UpperMask);
                    });
                }),
                this.Delay(7900 * skipMultiplier, () => {
                    this.StartReels([3, 4]);
                }),
                this.Delay(12100 * skipMultiplier, () => {
                    this.tweens.add({
                        targets: this.backgroundOverlay,
                        alpha: 0,
                        duration: 1000,
                    }),
                    this.StopReels(),
                    this.StopRibbons(),
                    this.StartPrizes(),
                    this.bubbles.Hide(),
                    this.Delay(6000 * skipMultiplier, () => {
                        this.HideReels(),
                        this.MoveCounter(),
                        this.ShowOKButton();

                        if (self.Game.default.Core.PlayerOptions.qolModOptions.autoPentaChestsConfirm) {
                            this.disableInput()
                            this.DismissScene()
                            this.openButton.removeAllListeners()
                        }
                    });
                });
            });
        });

        const confirmInterval = setInterval(() => {
            if (self.Game.default.Core.SceneManager.UI_overlayScene.UI_grid) {
                this.openButton._events.pointerdown.fn()
                clearInterval(confirmInterval)
            }
        }, 0)
    }
}

module.exports = {
    mods: [
        {
            key: 'overwrite',
            callback: 'UI_treasureScene.SetupTreasureLevel1',
            target: UI_treasureScene.SetupTreasureLevel1
        },

        {
            key: 'overwrite',
            callback: 'UI_treasureScene.SetupTreasureLevel2',
            target: UI_treasureScene.SetupTreasureLevel2
        },

        {
            key: 'overwrite',
            callback: 'UI_treasureScene.SetupTreasureLevel3',
            target: UI_treasureScene.SetupTreasureLevel3
        }
    ]
}
