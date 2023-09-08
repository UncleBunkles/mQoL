
const SceneManager = {
    RestartMainScene(delay = 3000) {
        this.UI_overlayScene.DestroyGrid(),
        self.Game.default.Sound.StopMusic(self.Game.default.Core.CurrentBGM),
        self.Game.default.Core.OnPlayerQuit(),
        this.scene.stop(this.MainScene),
        this.OmniScene.time.addEvent({
            delay: delay,
            callback: () => {
                this.scene.launch(this.MainScene);
            },
        });
    },

    RestartMainSceneFromPause(delay) {
        this.scene.stop(this.PauseScene)
        this.RestartMainScene(delay)
    }
}

const PauseScene = {
    create() {
        this.RestartButton = new self.Plugins.NineSlice(this, self.NineSliceConfig.default.BackButton, {
            x: 0.5 * this.renderer.width - 400,
            y: this.renderer.height - 54,
            width: 96,
            height: 32,
        })
            .setScale(1.5)
            .setOrigin(0.5)

        this.RestartText = new Phaser.GameObjects.Text(
            this,
            this.RestartButton.x,
            this.RestartButton.y,
            'Restart', {})
        .setOrigin(0.5, 0.5)
        .setScale(1.5)

        this.add.existing(this.RestartButton)
        this.add.existing(this.RestartText)
    },

    OpenOptions() {
        this.RestartButton.x = this.RestartText.x = 0.5 * this.renderer.width - 16
        this.RestartButton.y = this.RestartText.y = this.renderer.height - 64

        this.OptionPages[0].QuitButton.x = this.OptionPages[0].QuitText.x = 0.5 * this.renderer.width - 120 - 48
        this.OptionPages[1].QuitButton.x = this.OptionPages[1].QuitText.x = 0.5 * this.renderer.width - 120 - 48

        this.OptionPages[0].ResumeButton.x = this.OptionPages[0].ResumeText.x = 0.5 * this.renderer.width + 120 + 36
        this.OptionPages[1].ResumeButton.x = this.OptionPages[1].ResumeText.x = 0.5 * this.renderer.width + 120 + 36
    },

    EnableButtons() {
        this.RestartButton.setInteractive()

        this.RestartButton.on("pointerdown", () => {
            self.Game.default.Core.SceneManager.RestartMainSceneFromPause(0)
        })
    }
}

module.exports = {
    mods: [
        {
            key: 'overwrite',
            callback: 'SceneManager.RestartMainScene',
            target: SceneManager.RestartMainScene
        },

        {
            key: 'overwrite',
            callback: 'SceneManager.RestartMainSceneFromPause',
            target: SceneManager.RestartMainSceneFromPause
        },

        {
            key: 'overwriteSignature',
            callback: 'SceneManager.RestartMainScene',
            target: 'delay = 3000'
        },

        {
            key: 'post',
            callback: 'PauseScene.create',
            target: PauseScene.create
        },

        {
            key: 'post',
            callback: 'PauseScene.OpenOptions',
            target: PauseScene.OpenOptions
        },

        {
            key: 'pre',
            callback: 'PauseScene.EnableButtons',
            target: PauseScene.EnableButtons
        }
    ]
}
