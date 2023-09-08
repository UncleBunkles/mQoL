
const Core = {
    InitGame() {
        this.MainUI.ShowPassiveBlocks(6 - self.Game.default.Core.PlayerOptions.qolModOptions.maxPowerUpWeapons)
    },
}

const MainUI = {
    constructor() {
        this.BlockedPassiveSlots = []

        for (let i = 1; i < 6; i++) {
            let blockedSlot = this.scene.add
                .image(9 + this.xIncrease * i, 7+ this.yOffset * 2, "UI", "no16.png")
                .setAlpha(0.5)
                .setScrollFactor(0)
                .setOrigin(0.5)
                .setScale(1)
                .setDepth(Number.MAX_SAFE_INTEGER - 1000 - 2)
                .setVisible(false);

            this.BlockedPassiveSlots.push(blockedSlot);
        }

        this.BlockedPassiveSlots.reverse()
    },

    ShowPassiveBlocks(amount) {
        for (let i = 0; i < amount; i++)
            this.BlockedPassiveSlots[i] && (this.BlockedPassiveSlots[i].visible = true);
    }
}

const LevelUpFactory = {
    constructor() {
        this.maxPowerUpWeapons = self.Game ? self.Game.default.Core.PlayerOptions.qolModOptions.maxPowerUpWeapons : 6
    }
}

module.exports = {
    mods: [
        {
            key: 'post',
            callback: 'Core.InitGame',
            target: Core.InitGame
        },

        {
            key: 'overwrite',
            callback: 'MainUI.ShowPassiveBlocks',
            target: MainUI.ShowPassiveBlocks
        },

        {
            key: 'post',
            callback: 'MainUI.constructor',
            target: MainUI.constructor
        },

        {
            key: 'post',
            callback: 'LevelUpFactory.constructor',
            target: LevelUpFactory.constructor
        }
    ]
}
