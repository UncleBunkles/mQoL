
class MagnetOptionsScene extends Phaser.Scene {
    constructor(key, modules) {
        super({ key: key })

        this.NineSliceConfig = modules.NineSliceConfig;
        this.Core = modules.Core;
        this.Utils = modules.Utils;
        this.Game = modules.Game;
        this.Plugins = modules.Plugins;

        this.headerText = 'Options'
    }

    preload() {}

    create() {
        let width = this.Game.SAFEAREA.width * this.Core.default.RPixelScale,
        height = (this.Game.SAFEAREA.height - 64) * this.Core.default.RPixelScale,
        backgroundHeight = height * this.Core.default.PixelScale;
        (this.background = new this.Plugins.NineSlice(this, this.NineSliceConfig.default.MenuBackground, {
                x: 0,
                y: 0,
                width: width,
                height: height,
            })),
        this.background.setPosition(this.Game.SAFEAREA.centerX, backgroundHeight),
        this.background.setOrigin(0.5, 1),
        this.background.setScale(this.Core.default.PixelScale),
        this.add.existing(this.background),
        this.background.setInteractive(),

        (this.header = this.add
                .text(this.Game.SAFEAREA.centerX, 33, this.headerText, {})
                .setScale(2 * this.Core.default.PixelScale)
                .setOrigin(0.5)),
        this.Game.default.Lang.scaleToMaxFast(this.header, false, 250);

        this.FillPage(),

        (this.UI_topBar = this.scene.get("UI_topBar")),
        (this.UI_mainMenu = this.scene.get("UI_mainMenu"));

        let _children = this.children.getAll();

        this.children.removeAll(),
        (this.SceneContainer = this.add.container(0, 0, _children)),
        this.SceneContainer.setScale((0, this.Game.GET_RATIO)()),
        this.Utils.default.CalculateAndSetContainerSize(this.SceneContainer),
        (this.SceneContainer.y = this.renderer.height - this.SceneContainer.displayHeight),
        this.EnableInput(),
        this.ReadPlayerOptions(),
        this.MakeUIGrid(this.UI_topBar.BackButton);
    }

    FillPage() {
        this.pageManager = new managers.PageManager({
            game: this.Game,
            scene: this,
            plugins: this.Plugins,

            pages: [],
        })
    }

    EnableInput() {
        this.pageManager.EnableInput()
    }

    ReadPlayerOptions() {
        this.pageManager.ReadPlayerOptions()
    }

    MakeUIGrid(UI) {
        let overlay = this.Game.default.Core.SceneManager.UI_overlayScene;
        overlay.MakeUIGrid(1, 9, false),
        overlay.UI_grid.SetContents(0, 0, this.UI_topBar.BackButton),
        overlay.ToggleCursorsVisibility(true),
        overlay.UI_grid.SelectGameObject(UI),
        (overlay.UI_selected = UI),
        this.Game.default.Core.SceneManager.scene.bringToTop(overlay),
        (overlay.OnCancelCallback = () => {
            let backBtn,
            btnEvnt,
            callback;
            null ===
            (callback =
                    null ===
                    (btnEvnt =
                            null === (backBtn = this.UI_topBar.BackButton) || void 0 === backBtn
                             ? void 0
                             : backBtn._events) || void 0 === btnEvnt
                     ? void 0
                     : btnEvnt.pointerdown) ||
            void 0 === callback ||
            callback.fn();
        });
    }

    DestroyUIGrid() {
        this.Game.default.Core.SceneManager.UI_overlayScene.DestroyGrid();
    }
}

module.exports = MagnetOptionsScene
