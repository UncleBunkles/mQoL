
const MainUI = {
    constructor() {
        const { Queue } = require('../Data')

        if (self.Game.default.Core.PlayerOptions.qolModOptions.killsPSEnabled) {
            this.KillsIcon2 = this.scene.add
                .image(0.85 * this.scene.renderer.width - 4, 45, "UI", "SkullToken.png")
                .setScrollFactor(0)
                .setOrigin(1, 0.5)
                .setScale(self.Core.default.PixelScale)
                .setDepth(Number.MAX_SAFE_INTEGER)

            this.KillsPSText = this.scene.add
                .text(this.KillsIcon2.x - this.KillsIcon2.displayWidth - 4, this.KillsIcon2.y, "0/s", {
                    color: "white",
                    fontSize: "12px",
                    fontStyle: "bold",
                })
                .setScrollFactor(0)
                .setOrigin(1, 0.5)
                .setDepth(Number.MAX_SAFE_INTEGER)

            this.killsPSQueue = new Queue(self.Game.default.Core.PlayerOptions.qolModOptions.goldPSQueueSize)
        }

        if (self.Game.default.Core.PlayerOptions.qolModOptions.goldPSEnabled) {
            this.CoinsIcon2 = this.scene.add
                .image(this.scene.renderer.width - 4, 45, "UI", "CoinGold.png")
                .setScrollFactor(0)
                .setOrigin(1, 0.5)
                .setScale(self.Core.default.PixelScale)
                .setDepth(Number.MAX_SAFE_INTEGER)

            this.PlayerGoldPSText = this.scene.add
                .text(this.CoinsIcon2.x - this.CoinsIcon2.displayWidth - 4, this.CoinsIcon2.y, "0/s", {
                    color: "white",
                    fontSize: "12px",
                    fontStyle: "bold",
                })
                .setScrollFactor(0)
                .setOrigin(1, 0.5)
                .setDepth(Number.MAX_SAFE_INTEGER)

            this.goldPSQueue = new Queue(self.Game.default.Core.PlayerOptions.qolModOptions.killsPSQueueSize)
        }
    },

    SetSurvivedSeconds() {
        if (self.Game.default.Core.PlayerOptions.qolModOptions.killsPSEnabled) {
            this.killsPSQueue.enqueue(self.Game.default.Core.PlayerOptions.RunEnemies - this.killsPSQueue.lifetimeSum)
            this.KillsPSText.text = `${((this.killsPSQueue.sum / this.killsPSQueue.length) || 0).toFixed(0).toLocaleString()}/s`
        }

        if (self.Game.default.Core.PlayerOptions.qolModOptions.goldPSEnabled) {
            this.goldPSQueue.enqueue(self.Game.default.Core.PlayerOptions.RunCoins - this.goldPSQueue.lifetimeSum)
            this.PlayerGoldPSText.text = `${((this.goldPSQueue.sum / this.goldPSQueue.length) || 0).toFixed(0).toLocaleString()}/s`
        }
    },

    UpdateCoins() {
        if (self.Game.default.Core.PlayerOptions.qolModOptions.goldPSEnabled) {
            this.goldPSQueue.last = self.Game.default.Core.PlayerOptions.RunCoins - this.goldPSQueue.lifetimeSum + this.goldPSQueue.last
            this.PlayerGoldPSText.text = `${((this.goldPSQueue.sum / this.goldPSQueue.length) || 0).toFixed(0).toLocaleString()}/s`
        }
    },

    UpdateKills() {
        if (self.Game.default.Core.PlayerOptions.qolModOptions.killsPSEnabled) {
            this.killsPSQueue.last = self.Game.default.Core.PlayerOptions.RunEnemies - this.killsPSQueue.lifetimeSum + this.killsPSQueue.last
            this.KillsPSText.text = `${((this.killsPSQueue.sum / this.killsPSQueue.length) || 0).toFixed(0).toLocaleString()}/s`
        }
    }
}


module.exports = {
    mods: [
        {
            key: 'post',
            callback: '2.MainUI.constructor',
            target: MainUI.constructor
        },

        {
            key: 'post',
            callback: '2.MainUI.SetSurvivedSeconds',
            target: MainUI.SetSurvivedSeconds
        },

        {
            key: 'post',
            callback: 'MainUI.UpdateCoins',
            target: MainUI.UpdateCoins
        },

        {
            key: 'post',
            callback: 'MainUI.UpdateKills',
            target: MainUI.UpdateKills
        }
    ]
}
