
const PlayerClass = {
    MakeLevelOne() {
        if (self.Game.default.Core.PlayerOptions.qolModOptions.candiesForEveryoneEnabled) {
            this.startingWeapon = 'CANDYBOX'
        }
    }
}

const CharSelectionScene = {
    create() {
        if (self.Game.default.Core.PlayerOptions.qolModOptions.candiesForEveryoneEnabled) {
            this.panels.children.entries.forEach(charPanel => {
                charPanel.myIconBG.setFrame('candybox.png')
                charPanel.myWeaponIcon.setFrame('candybox.png')
            })
        }
    }
}

const ConfirmationPanel = {
    AssignData() {
        if (self.Game.default.Core.PlayerOptions.qolModOptions.candiesForEveryoneEnabled) {
            this.myWeaponIcon.setTexture('items', 'candybox.png')
        }
    }
}

module.exports = {
    mods: [
        {
            key: 'post',
            callback: 'PlayerClass.MakeLevelOne',
            target: PlayerClass.MakeLevelOne
        },

        {
            key: 'post',
            callback: 'CharSelectionScene.create',
            target: CharSelectionScene.create
        },

        {
            key: 'post',
            callback: 'ConfirmationPanel.AssignData',
            target: ConfirmationPanel.AssignData
        },
    ]
}
