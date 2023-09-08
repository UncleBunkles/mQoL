
const ArcanaClass = {
    constructor() {
        this.Max = self.Game.default.Core.PlayerOptions.qolModOptions.maxArcanas
    }
}

module.exports = {
    mods: [
        {
            key: 'post',
            callback: 'ArcanaClass.constructor',
            target: ArcanaClass.constructor
        }
    ]
}
