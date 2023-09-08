
const Core = {
    SwapToLevelUpScene() {
        let limitBreakEnabled =
            self.Game.default.Core.PlayerOptions.CollectedItems.indexOf("RELIC_GGOSPEL") > -1 &&
            self.Game.default.Core.PlayerOptions.SelectedLimitBreak;
        if (self.Game.default.Core.LevelUpFactory.HasPowerupsInStore())
            (self.Game.default.Core.SceneManager.MainScene.blockInput = true),
            self.Game.default.Core.SceneManager.EnterLevelUp(),
            self.Game.default.Sound.FadeMusic(self.Game.default.Core.CurrentBGM, 0.2, 500);
        else {
            if (limitBreakEnabled) {
                if (this.AlwaysRandomLimitBreak && this.LimitBreakManager.hasLimitBreaks()) {
                    let randomWeightedWeapon

                    if (this.weightedLimitBreak) {
                        let options = this.LimitBreakManager.GetLimitBreakBonuses()
                        let weightedWeapons = {}
                        let weightedOptions = {}

                        options.forEach(option => {
                            if (!weightedWeapons[this.PlayerOptions.limitBreakOptions[option.weaponType]]) {
                                weightedWeapons[this.PlayerOptions.limitBreakOptions[option.weaponType]] = []
                            }

                            weightedWeapons[this.PlayerOptions.limitBreakOptions[option.weaponType]].push(
                                option.weaponType
                            )

                            let optionName = `${option.weaponType}_${
                                Object.keys(option.keyValues).filter(value => !['max', 'rarity'].includes(value))[0]
                            }`

                            if (!weightedOptions[option.weaponType]) {
                                weightedOptions[option.weaponType] = {}
                            }

                            if (!weightedOptions[option.weaponType][this.PlayerOptions.limitBreakOptions[optionName]]) {
                                weightedOptions[option.weaponType][this.PlayerOptions.limitBreakOptions[optionName]] = []
                            }

                            weightedOptions[option.weaponType][this.PlayerOptions.limitBreakOptions[optionName]].push(
                                option
                            )
                        })

                        let highestWeaponType = Phaser.Math.RND.pick(
                            weightedWeapons[
                                Math.max(...Object.keys(weightedWeapons).map(el => Number(el)))
                            ]
                        )

                        randomWeightedWeapon = Phaser.Math.RND.pick(
                            weightedOptions[highestWeaponType][
                                Math.max(...Object.keys(weightedOptions[highestWeaponType]).map(el => Number(el)))
                            ]
                        )
                    } else {
                        randomWeightedWeapon = this.LimitBreakManager.GetRandomWeightedWeapon();
                    }

                    if (this.LimitBreakWeaponUp(randomWeightedWeapon)) {
                        let title = self.WeaponPanelClass.default.ParseLimitBreakUpInfo(randomWeightedWeapon.keyValues);
                        this.GizmoManager.DisplayLimitBreakLevelUp(),
                        this.GizmoManager.DisplayIconOverhead(
                            self.WeaponConfigs.default[randomWeightedWeapon.weaponType][0].frameName,
                            title,
                            null),
                        self.Game.default.Sound.PlaySound("ClickIn");
                    } else
                        (self.Game.default.Core.SceneManager.MainScene.blockInput = true),
                        self.Game.default.Core.SceneManager.EnterLevelUp(),
                        self.Game.default.Sound.FadeMusic(self.Game.default.Core.CurrentBGM, 0.2, 500);
                } else {
                    if (this.AlwaysCoinbag || this.AlwaysRoast) {
                        this.MakeAndActivatePickup("COINBAG2");
                        let coins = 25 * this.constructor.GoldMultiplier;
                        self.Game.default.Core.Player && (coins *= self.Game.default.Core.Player.greed),
                        this.GizmoManager.DisplayIconOverhead("CoinGold.png", Math.round(coins), 16776960),
                        this.GizmoManager.DisplayLevelUp();
                    } else
                        (self.Game.default.Core.SceneManager.MainScene.blockInput = true),
                        self.Game.default.Core.SceneManager.EnterLevelUp(),
                        self.Game.default.Sound.FadeMusic(self.Game.default.Core.CurrentBGM, 0.2, 500);
                }
            } else {
                if (this.AlwaysRoast && self.Game.default.Core.Player.hp < self.Game.default.Core.Player.maxHp)
                    this.MakeAndActivatePickup("ROAST"),
                    this.GizmoManager.DisplayIconOverhead("Roast.png", "", null),
                    this.GizmoManager.DisplayLevelUp();
                else {
                    if (this.AlwaysCoinbag || this.AlwaysRoast) {
                        this.MakeAndActivatePickup("COINBAG2");
                        let coins = 25 * this.constructor.GoldMultiplier;
                        self.Game.default.Core.Player && (coins *= self.Game.default.Core.Player.greed),
                        this.GizmoManager.DisplayIconOverhead("CoinGold.png", Math.round(coins), 16776960),
                        this.GizmoManager.DisplayLevelUp();
                    } else
                        (self.Game.default.Core.SceneManager.MainScene.blockInput = true),
                        self.Game.default.Core.SceneManager.EnterLevelUp(),
                        self.Game.default.Sound.FadeMusic(self.Game.default.Core.CurrentBGM, 0.2, 500);
                }
            }
        }
    }
}

const UI_levelUpScene = {
    makeLimitBreakButtons() {
        this.WeightedLimitBreak_RandomAlways_Button = new self.Plugins.NineSlice(this, self.NineSliceConfig.default.OptionsButton, {
            x: this.BanishButton.x,
            y: this.BanishButton.y,
            width: 96,
            height: 32,
        })
            .setScale(2)
            .setOrigin(0.5)
            .setVisible(false)

        this.add.existing(this.WeightedLimitBreak_RandomAlways_Button)

        this.WeightedLimitBreak_RandomAlways_Text = new Phaser.GameObjects.Text(
            this,
            this.BanishButton.x,
            this.BanishButton.y - 9,
            'WEIGHTED', {})
        .setOrigin(0.5, 0.5)
        .setScale(2)
        .setVisible(false)

        this.add.existing(this.WeightedLimitBreak_RandomAlways_Text)

        this.WeightedLimitBreak_RandomAlways_Text2 = new Phaser.GameObjects.Text(
            this,
            this.BanishButton.x,
            this.BanishButton.y + 11,
            'random always', {})
        .setOrigin(0.5, 0.5)
        .setScale(1)
        .setVisible(false)

        this.add.existing(this.WeightedLimitBreak_RandomAlways_Text2)
    },

    EnableLimitBreakButtonsInput() {
        this.isaDoingaLimitaBreaka
         ? (this.WeightedLimitBreak_RandomAlways_Button.setVisible(true),
            this.WeightedLimitBreak_RandomAlways_Text.setVisible(true),
            this.WeightedLimitBreak_RandomAlways_Text2.setVisible(true),
            this.WeightedLimitBreak_RandomAlways_Button.removeAllListeners(),
            this.WeightedLimitBreak_RandomAlways_Button.setInteractive(),
            this.WeightedLimitBreak_RandomAlways_Button.once("pointerdown", () => {
                self.Game.default.Core.AlwaysRandomLimitBreak = true
                self.Game.default.Core.weightedLimitBreak = true

                this.ChooseRandomLimitBreak();
            }))
         : this.WeightedLimitBreak_RandomAlways_Button.setVisible(false)
    }
}

module.exports = {
    mods: [
        {
            key: 'overwrite',
            callback: 'Core.SwapToLevelUpScene',
            target: Core.SwapToLevelUpScene
        },

        {
          key: 'post',
          callback: 'UI_levelUpScene.makeLimitBreakButtons',
          target: UI_levelUpScene.makeLimitBreakButtons
        },

        {
          key: 'post',
          callback: 'UI_levelUpScene.EnableLimitBreakButtonsInput',
          target: UI_levelUpScene.EnableLimitBreakButtonsInput
        },
    ]
}
