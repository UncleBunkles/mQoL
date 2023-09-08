
const BasePickup = {
    GoToPlayer() {
        if (!self.Game.default.Core.PlayerOptions.magnetOptions[this.itemType] && !this.followPlayer) {
            let distanceToPlayer = Math.sqrt((this.x - self.Game.default.Core.Player.x) ** 2 + (this.y - self.Game.default.Core.Player.y) ** 2)

            if (
                distanceToPlayer < self.Game.default.Core.PlayerOptions.qolModOptions.minimalMagnetRange &&
                self.Game.default.Core.PlayerOptions.magnetOptions[this.itemType] !== undefined
            ) {
                if (self.Game.default.Core.PlayerOptions.qolModOptions.instantMagnetEnabled) {
                    this.GetTaken()
                    return
                }

                this.followPlayer = true
            } else {
                return
            }
        }

        if (self.Game.default.Core.PlayerOptions.qolModOptions.instantMagnetEnabled) {
            this.GetTaken()
            return
        }

        (this.currentDirection.x = self.Game.default.Core.Player.x - this.x),
        (this.currentDirection.y = self.Game.default.Core.Player.y - 8 - this.y),
        this.currentDirection.normalize(),
        this.setVelocity(
            this.speed * this.currentDirection.x * this.time,
            this.speed * this.currentDirection.y * this.time),
        this.speed++;
    }
}

module.exports = {
    mods: [
        {
            key: 'overwrite',
            callback: 'BasePickup.GoToPlayer',
            target: BasePickup.GoToPlayer
        }
    ]
}
