
const Core = {
    Update() {
        for (let i = 0; i < this.PickupsWithArrows.children.entries.length; i++)
            this.PickupsWithArrows.children.entries[i].Update(seconds);
        let updateTick = false;
        if (
            (this.updateTick++, this.updateTick % this.updateFreq === 0 && ((this.updateTick = 0), (updateTick = true)),
                updateTick)) {
            let xpRequiredToLevelUp = this.LevelUpFactory.XpRequiredToLevelUp;
            if (this.canInterrupt) {
                if (this.canPause && this.enterPause)
                    (this.enterPause = false), self.Game.default.Core.SceneManager.EnterPause();
                else {
                    if (this.EnterWeaponSelection)
                        (this.EnterWeaponSelection = false), this.SceneManager.EnterWeaponSelection();
                    else {
                        if (this.StartShopScene)
                            (this.StartShopScene = false), this.SceneManager.EnterShop();
                        else {
                            if (this.StartHealerScene)
                                (this.StartHealerScene = false), this.SceneManager.EnterHealer();
                            else {
                                if (this.GiveMainArcana && this.GiveMainArcana <= (
                                    this.Player.level === 1 ? this.PlayerOptions.qolModOptions.startingArcanas : 1))
                                    (this.GiveMainArcana += 1), self.Game.default.Core.SceneManager.EnterMainArcana();
                                else {
                                    if (this.GiveDraftArcana)
                                        (this.GiveDraftArcana = false), self.Game.default.Core.SceneManager.EnterDraftArcana();
                                    else {
                                        if (this.Player.xp >= xpRequiredToLevelUp)
                                            this.Player.LevelUp(),
                                            this.SwapToLevelUpScene(),
                                            this.LootManager.RecalculateLoot(),
                                            this.LevelUpFactory.CalculateXPfactor(),
                                            this.PlayerUI.Update(),
                                            this.MainUI.UpdatePlayerLevel();
                                        else {
                                            if (this.TreasureQueue.length > 0) {
                                                let treasure = this.TreasureQueue.pop();
                                                (this.CurrentTreasureLevel = treasure.level),
                                                (this.CurrentTreasureTypes = treasure.prizeTypes),
                                                (this.CurrentFixedTreasures = treasure.fixedPrizes),
                                                self.Game.default.Core.SceneManager.StartTreasureScene();
                                            } else
                                                this.RelicQueue.length > 0
                                                 ? ((this.CurrentFoundRelic = this.RelicQueue.pop()), this.SwapToRelicFoundScene())
                                                 : this.FoundWeaponQueue.length > 0
                                                 ? ((this.CurrentFoundItem = this.FoundWeaponQueue.pop()), this.SwapToItemFoundScene())
                                                 : this.CharQueue.length > 0 &&
                                                ((this.CurrentFoundChar = this.CharQueue.pop()),
                                                    (this.CharQueue = []),
                                                    this.SwapToCharFoundScene());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.Stage.dayNight && this.BGMan.DayNightHue();
            for (let i = 0; i < this.PickupGroup.children.entries.length; i++)
                this.PickupGroup.children.entries[i].Update(seconds);
            for (let i = 0; i < this.explosionPool.spawned.length; i++)
                this.explosionPool.spawned[i].Update(seconds);
        } else
            this.canPause &&
            this.enterPause &&
            ((this.enterPause = false), self.Game.default.Core.SceneManager.EnterPause());
        for (let i = 0; i < this.BulletGroup.children.entries.length; i++)
            this.BulletGroup.children.entries[i].Update(seconds);
        for (let i = 0; i < this.Weapons.length; i++)
            this.Weapons[i].Update(seconds);
        for (let i = this.HiddenWeapons.length - 1; i >= 0; i--)
            this.HiddenWeapons[i].Update(seconds);
        this.Player.Update(seconds),
        this.Magnet.Update(),
        this.BGMan.Update(seconds),
        this.GoldFever.Update(seconds),
        this.Arcanas.Update(seconds),
        this.WhiteHandManager.Update(seconds),
        this.GizmoManager.Update(seconds);
        for (let i = 0; i < this.Enemies.length; i++)
            this.Enemies[i].Update(seconds);
        this.Stage.hasLights &&
        ((this.spotlight.x = self.Game.default.Core.Player.x),
            (this.spotlight.y = self.Game.default.Core.Player.y));
    }
}

module.exports = {
    mods: [
        {
            key: 'overwrite',
            callback: 'Core.Update',
            target: Core.Update
        },

        {
            key: 'overwriteSignature',
            callback: 'Core.Update',
            target: 'seconds = 0'
        }
    ]
}
