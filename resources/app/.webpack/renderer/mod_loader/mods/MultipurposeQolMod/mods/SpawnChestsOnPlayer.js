
const Core = {
    MakeTreasure(x, y) {
        if (this.PlayerOptions.qolModOptions.spawnChestsOnPlayerEnabled) {
            x = this.Player.x;
            y = this.Player.y;
        }
    }
}

module.exports = {
    mods: [
        {
            key: 'pre',
            callback: 'Core.MakeTreasure',
            target: Core.MakeTreasure
        },

        {
            key: 'overwriteSignature',
            callback: 'Core.MakeTreasure',
            target: 'x = null, y = null, config'
        }
    ]
}
