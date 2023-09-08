
const MainScene = {
    create() {
        if (self.Game.default.Core.PlayerOptions.qolModOptions.debugModeEnabled) {
            this.input.keyboard
            .addKey(Phaser.Input.Keyboard.KeyCodes.B)
            .on("down", () => {
                self.Game.default.Core.debug_destructibles();
            }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.X)
                .on("down", () => {
                    self.Game.default.Core.Player.AddXP(
                        self.Game.default.Core.LevelUpFactory.XpRequiredToLevelUp -
                        self.Game.default.Core.LevelUpFactory.PreviousXpRequiredToLevelUp),
                        self.Game.default.Core.CheckForLevelUp();
                }),
            //this.input.keyboard
            //.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
            // .on("down", () => {
            //    self.Game.default.Core.SceneManager.EnterDebug();
            // }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.Z)
                .on("down", () => {
                    for (
                        let i = self.Game.default.Core.LevelUpFactory.WeaponStore.length - 1;
                        i >= 0;
                        i--
                    ) {
                        const weapon =
                            self.Game.default.Core.LevelUpFactory.WeaponStore[i];
                        self.Game.default.Core.LevelWeaponUp(weapon),
                            self.Game.default.Core.Player.LevelUp();
                    }
                    self.Game.default.Core.Player.xp =
                        self.Game.default.Core.LevelUpFactory.PreviousXpRequiredToLevelUp;
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.P)
                .on("down", () => {
                    self.Game.default.Core.TimeStop();
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.L)
                .on("down", () => {
                    self.Game.default.Core.PlayerOptions.AddCoins(1000);
                    self.Game.default.Core.MainUI.UpdateCoins()
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.M)
                .on("down", () => {
                    self.Game.default.Core.Player.moveSpeed = 10 <= self.Game.default.Core.Player.moveSpeed ? 1.2 : 10;
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.G)
                .on("down", () => {
                    self.Game.default.Core.debug_Treasure(self.Game.default.Core.PlayerOptions.qolModOptions.debugChestLvl);
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.N)
                .on("down", () => {
                    self.Game.default.Core.debug_Arcana();
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.J)
                .on("down", () => {
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.I)
                .on("down", () => {
                    self.Game.default.Core.Player.SetInvulForMilliSeconds(
                        Number.MAX_SAFE_INTEGER),
                        self.Game.default.Core.Player.restoreTint(),
                        this.time.addEvent({
                            delay: 100,
                            callback: () => {
                                self.Game.default.Core.Player.restoreTint();
                            },
                        });
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.H)
                .on("down", () => {
                    self.Game.default.Core.Player.RecoverHp(9999, false);
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.K)
                .on("down", () => {
                    self.Game.default.Core.RosaryDamage();
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.V)
                .on("down", () => {
                    self.Game.default.Core.TurnOnVacuum();
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.O)
                .on("down", () => {
                    self.Game.default.Core.Player.OnDeath();
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.E)
                .on("down", () => {
                    self.Game.default.Core.debug_SpawnEnemies();
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.Q)
                .on("down", () => {
                    self.Game.default.Core.SceneManager.EnterWeaponSelection();
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.T)
                .on("down", () => {
                    self.Game.default.Core.debug_NextMinute();
                }),
            this.input.keyboard
                .addKey(Phaser.Input.Keyboard.KeyCodes.F)
                .on("down", () => {
                    self.Game.default.Core.debug_FireAll();
                }),
            this.input.on(
                "wheel",
                function () {
                    (this.cameras.main.zoom -= 0.005 * this.cameras.main.zoom),
                        (this.cameras.main.zoom = Math.min(
                            Math.max(this.cameras.main.zoom, 0.05), 4
                        ));
                }
                    .bind(this));
            let pause = this.add
                .image(0, 96, "UI", "pause.png")
                .setScrollFactor(0)
                .setScale(3)
                .setInteractive()
                .setAlpha(0.3)
                .setOrigin(0, 0);
            self.Game['DEBUG_INFO'] || pause.setAlpha(0.001),
                pause.on("pointerdown", () => {
                    self.Game.default.Core.SceneManager.EnterDebug();
                });
        }
    }
}

module.exports = {
    mods: [
        {
            key: 'post',
            callback: 'MainScene.create',
            target: MainScene.create
        }
    ]
}
