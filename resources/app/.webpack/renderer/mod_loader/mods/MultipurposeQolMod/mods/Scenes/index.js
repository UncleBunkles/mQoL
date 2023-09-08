
function init() {
    const ModOptionsScene = require('./ModOptionsScene')
    const MagnetOptionsScene = require('./MagnetOptionsScene')
    const ChestsOptionsScene = require('./ChestsOptionsScene')
    const LimitBreakOptionsScene = require('./LimitBreakOptionsScene')

    this.Game.default.Core.Game.scene.add("ModOptionsScene", new ModOptionsScene(this))
    this.Game.default.Core.Game.scene.add("MagnetOptionsScene", new MagnetOptionsScene(this))
    this.Game.default.Core.Game.scene.add("ChestsOptionsScene", new ChestsOptionsScene(this))
    this.Game.default.Core.Game.scene.add("LimitBreakOptionsScene", new LimitBreakOptionsScene(this))

    const SceneManager = this.Game.default.Core.SceneManager

    SceneManager.ModOptionsScene = SceneManager.scene.get("ModOptionsScene")
    SceneManager.MagnetOptionsScene = SceneManager.scene.get("MagnetOptionsScene")
    SceneManager.ChestsOptionsScene = SceneManager.scene.get("ChestsOptionsScene")
    SceneManager.LimitBreakOptionsScene = SceneManager.scene.get("LimitBreakOptionsScene")
}

const SceneManager = {
    ModOptionsFromOptions() {
        this.UI_overlayScene.DestroyGrid()
        this.scene.launch(this.ModOptionsScene)
        this.scene.bringToTop(this.ModOptionsScene)
        this.scene.pause(this.OptionsScene)
        this.scene.setVisible(false, this.OptionsScene)
        this.UI_topBar.EnableBack2(this.OptionsFromModOptions.bind(this))
        this.UI_topBar.DisableOptions()
        this.scene.bringToTop(this.UI_overlayScene);
    },

    OptionsFromModOptions() {
        this.UI_overlayScene.DestroyGrid()

        this.scene.launch(this.OptionsScene)
        this.scene.bringToTop(this.OptionsScene)
        this.scene.pause(this.ModOptionsScene)

        this.scene.setVisible(false, this.ModOptionsScene)
        this.scene.stop(this.ModOptionsScene)
        this.scene.resume(this.OptionsScene)

        this.UI_topBar.DisableBack2()
        this.UI_topBar.DisableBack3()

        this.UI_topBar.EnableBack(this.ExitOptions.bind(this))
        this.scene.bringToTop(this.UI_overlayScene);
    },

    MagnetOptionsFromModOptions() {
        this.UI_overlayScene.DestroyGrid()
        this.scene.launch(this.MagnetOptionsScene)
        this.scene.bringToTop(this.MagnetOptionsScene)
        this.scene.pause(this.ModOptionsScene)
        this.scene.setVisible(false, this.ModOptionsScene)
        this.UI_topBar.DisableOptions()
        this.UI_topBar.EnableBack3(this.ModOptionsFromMagnetOptions.bind(this))
        this.scene.bringToTop(this.UI_overlayScene);
    },

    ChestsOptionsFromModOptions() {
        this.UI_overlayScene.DestroyGrid()
        this.scene.launch(this.ChestsOptionsScene)
        this.scene.bringToTop(this.ChestsOptionsScene)
        this.scene.pause(this.ModOptionsScene)
        this.scene.setVisible(false, this.ModOptionsScene)
        this.UI_topBar.DisableOptions()
        this.UI_topBar.EnableBack3(this.ModOptionsFromChestsOptions.bind(this))
        this.scene.bringToTop(this.UI_overlayScene);
    },

    LimitBreakOptionsFromModOptions() {
        this.UI_overlayScene.DestroyGrid()
        this.scene.launch(this.LimitBreakOptionsScene)
        this.scene.bringToTop(this.LimitBreakOptionsScene)
        this.scene.pause(this.ModOptionsScene)
        this.scene.setVisible(false, this.ModOptionsScene)
        this.UI_topBar.EnableBack(this.ModOptionsFromLimitBreakOptions.bind(this))
        this.UI_topBar.DisableOptions()
        this.scene.bringToTop(this.UI_overlayScene);
    },

    ModOptionsFromMagnetOptions() {
        this.UI_overlayScene.DestroyGrid()

        this.scene.launch(this.ModOptionsScene)
        this.scene.bringToTop(this.ModOptionsScene)
        this.scene.pause(this.MagnetOptionsScene)

        this.scene.setVisible(false, this.MagnetOptionsScene)
        this.scene.stop(this.MagnetOptionsScene)
        this.scene.resume(this.ModOptionsScene)

        this.UI_topBar.DisableBack3()
        this.UI_topBar.DisableBack2()

        this.UI_topBar.EnableBack2(this.OptionsFromModOptions.bind(this))
        this.scene.bringToTop(this.UI_overlayScene);
    },

    ModOptionsFromChestsOptions() {
        this.UI_overlayScene.DestroyGrid()

        this.scene.launch(this.ModOptionsScene)
        this.scene.bringToTop(this.ModOptionsScene)
        this.scene.pause(this.ChestsOptionsScene)

        this.scene.setVisible(false, this.ChestsOptionsScene)
        this.scene.stop(this.ChestsOptionsScene)
        this.scene.resume(this.ModOptionsScene)

        this.UI_topBar.DisableBack3()
        this.UI_topBar.DisableBack2()

        this.UI_topBar.EnableBack2(this.OptionsFromModOptions.bind(this))
        this.scene.bringToTop(this.UI_overlayScene);
    },

    ModOptionsFromLimitBreakOptions() {
        this.UI_overlayScene.DestroyGrid()

        this.scene.launch(this.ModOptionsScene)
        this.scene.bringToTop(this.ModOptionsScene)
        this.scene.pause(this.LimitBreakOptionsScene)

        this.scene.setVisible(false, this.LimitBreakOptionsScene)
        this.scene.stop(this.LimitBreakOptionsScene)
        this.scene.resume(this.ModOptionsScene)

        this.UI_topBar.DisableBack()
        this.UI_topBar.DisableBack2()

        this.UI_topBar.EnableBack3(this.OptionsFromModOptions.bind(this))
        this.scene.bringToTop(this.UI_overlayScene);
    },

    ExitOptions() {
        this.UI_topBar.DisableBack2()
        this.UI_topBar.DisableBack3();
    }
}
const SceneManager_hooks = [
    {
        key: 'overwrite',
        callback: 'SceneManager.ModOptionsFromOptions',
        target: SceneManager.ModOptionsFromOptions
    },

    {
        key: 'overwrite',
        callback: 'SceneManager.OptionsFromModOptions',
        target: SceneManager.OptionsFromModOptions
    },

    {
        key: 'overwrite',
        callback: 'SceneManager.MagnetOptionsFromModOptions',
        target: SceneManager.MagnetOptionsFromModOptions
    },

    {
        key: 'overwrite',
        callback: 'SceneManager.ChestsOptionsFromModOptions',
        target: SceneManager.ChestsOptionsFromModOptions
    },

    {
        key: 'overwrite',
        callback: 'SceneManager.LimitBreakOptionsFromModOptions',
        target: SceneManager.LimitBreakOptionsFromModOptions
    },

    {
        key: 'overwrite',
        callback: 'SceneManager.ModOptionsFromMagnetOptions',
        target: SceneManager.ModOptionsFromMagnetOptions
    },

    {
        key: 'overwrite',
        callback: 'SceneManager.ModOptionsFromChestsOptions',
        target: SceneManager.ModOptionsFromChestsOptions
    },

    {
        key: 'overwrite',
        callback: 'SceneManager.ModOptionsFromLimitBreakOptions',
        target: SceneManager.ModOptionsFromLimitBreakOptions
    },

    {
        key: 'post',
        callback: 'SceneManager.ExitOptions',
        target: SceneManager.ExitOptions
    },

]

const UI_topBar = {
    create() {
        this.BackButton2 = new self.Plugins.NineSlice(this, self.NineSliceConfig.default.BackButton, {
            x: self.Game.SAFEAREA.right - 6,
            y: 3,
            width: 48,
            height: 30,
        })
            .setScale(4 * self.Game.MASTER_SCALE)
            .setOrigin(1, 0)
            .setDepth(Number.MAX_SAFE_INTEGER)
        this.add.existing(this.BackButton2)

        this.BackButton3 = new self.Plugins.NineSlice(this, self.NineSliceConfig.default.BackButton, {
            x: self.Game.SAFEAREA.right - 6,
            y: 3,
            width: 48,
            height: 30,
        })
            .setScale(4 * self.Game.MASTER_SCALE)
            .setOrigin(1, 0)
            .setDepth(Number.MAX_SAFE_INTEGER)
        this.add.existing(this.BackButton3);

        this.BackText2 = this.add
            .text(
                this.BackButton2.x - 0.5 * this.BackButton2.displayWidth,
                this.BackButton2.y + 0.5 * this.BackButton2.displayHeight,
                self.Game.default.Lang.getLang("topBar_back"), {
                fontFamily: self.Game.default.Lang.FONTFAMILY,
            })
            .setOrigin(0.5, 0.5)
            .setScale(2 * self.Game.MASTER_SCALE)
            .setDepth(Number.MAX_SAFE_INTEGER)
            
        self.Game.default.Lang.scaleToMaxFast(this.BackText2, false, 70)

        this.BackText3 = this.add
            .text(
                this.BackButton3.x - 0.5 * this.BackButton3.displayWidth,
                this.BackButton3.y + 0.5 * this.BackButton3.displayHeight,
                self.Game.default.Lang.getLang("topBar_back"), {
                fontFamily: self.Game.default.Lang.FONTFAMILY,
            })
            .setOrigin(0.5, 0.5)
            .setScale(2 * self.Game.MASTER_SCALE)
            .setDepth(Number.MAX_SAFE_INTEGER)
        self.Game.default.Lang.scaleToMaxFast(this.BackText3, false, 70)

        this.DisableBack2()
        this.DisableBack3()
    },

    EnableBack() {
        this.DisableBack2()
        this.DisableBack3()

        this.DisableOptions()
    },

    DisableBack2() {
        this.BackButton2.setVisible(false)
        this.BackText2.setVisible(false)
        this.BackButton2.removeAllListeners()
    },

    EnableBack2(callback) {
        this.BackButton2.removeAllListeners()
        this.BackButton2.setVisible(true)
        this.BackText2.setVisible(true)
        this.BackButton2.setInteractive()
        this.BackButton2.on("pointerdown", () => {
            callback()
            this.BackButton2.setInteractive(false)
            this.BackButton2.removeAllListeners()
            self.Game.default.Sound.PlaySound("ClickOut")
            self.Game.default.Core.PlayerOptions.Save()
        }),
        this.DisableBack()
        this.DisableBack3()

        this.DisableOptions()
    },

    DisableBack3() {
        this.BackButton3.setVisible(false)
        this.BackText3.setVisible(false)
        this.BackButton3.removeAllListeners()
    },

    EnableBack3(callback) {
        this.BackButton3.removeAllListeners()
        this.BackButton3.setVisible(true)
        this.BackText3.setVisible(true)
        this.BackButton3.setInteractive()

        this.BackButton3.on("pointerdown", () => {
            callback()
            this.BackButton3.setInteractive(false)
            this.BackButton3.removeAllListeners()
            self.Game.default.Sound.PlaySound("ClickOut")
            self.Game.default.Core.PlayerOptions.Save()
        })

        this.DisableBack()
        this.DisableBack2()

        this.DisableOptions();
    },

    EnableOptions() {
        this.DisableBack2()
        this.DisableBack3()
    }
}
const UI_topBar_hooks = [
    {
        key: 'post',
        callback: 'UI_topBar.create',
        target: UI_topBar.create
    },

    {
        key: 'post',
        callback: 'UI_topBar.EnableBack',
        target: UI_topBar.EnableBack
    },

    {
        key: 'overwrite',
        callback: 'UI_topBar.DisableBack2',
        target: UI_topBar.DisableBack2
    },

    {
        key: 'overwrite',
        callback: 'UI_topBar.EnableBack2',
        target: UI_topBar.EnableBack2
    },

    {
        key: 'overwrite',
        callback: 'UI_topBar.DisableBack3',
        target: UI_topBar.DisableBack3
    },

    {
        key: 'overwrite',
        callback: 'UI_topBar.EnableBack3',
        target: UI_topBar.EnableBack3
    },

    {
        key: 'pre',
        callback: 'UI_topBar.EnableOptions',
        target: UI_topBar.EnableOptions
    },
]

const OptionsScene = {
    create() {
        this.ModOptionsButton = new self.Plugins.NineSlice(this, self.NineSliceConfig.default.OptionsButton, {
            x: this.renderer.width - 8 - 100,
            y: this.renderer.height - 128 - 64,
            width: 100,
            height: 32,
        })
            .setScale(2 * self.Core.default.PixelScale)
            .setOrigin(0.5)
        this.add.existing(this.ModOptionsButton)
        this.ModOptionsText = this.add
            .text(
                this.ModOptionsButton.x,
                this.ModOptionsButton.y,
                "Mod Options", {
                    align: "center",
                })
            .setScale(1 * self.Core.default.PixelScale)
            .setOrigin(0.5)

        this.ModOptionsButton.setInteractive(),
        this.ModOptionsText.setVisible(true);
    },

    EnableInput() {
        this.ModOptionsButton.setInteractive(),
        this.ModOptionsButton.on("pointerdown", () => {
            self.Game.default.Core.SceneManager.ModOptionsFromOptions(),
            self.Game.default.Sound.PlaySound("ClickIn");
        });
    }
}
const OptionsScene_hooks = [
    {
        key: 'pre',
        callback: 'OptionsScene.create',
        target: OptionsScene.create
    },

    {
        key: 'pre',
        callback: 'OptionsScene.EnableInput',
        target: OptionsScene.EnableInput
    },
]

module.exports = {
    init: init,

    mods: [
        ...UI_topBar_hooks,
        ...SceneManager_hooks,
        ...OptionsScene_hooks
    ],
}
