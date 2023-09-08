
const UI_selectWeaponScene = {
    getAllWeapons() {
        let weapons = [];

        for (const weaponName in self.WeaponConfigs.default) {
            let weaponConfig = self.WeaponConfigs.default[weaponName];

            if (
                weaponConfig && weaponConfig[0] &&
                !self.Game.default.Core.Weapons.find((weap) => weap.bulletType === weaponName) &&
                !self.Game.default.Core.RemovedWeapons.find((weap) => weap.bulletType === weaponName) &&
                weaponName !== "CANDYBOX" &&
                weaponName !== 0
            ) {
                weapons.push(weaponName)
            }
        }

        weapons.additionalLines = Math.max(0, Math.ceil((weapons.length - 27) / 4)) + 0.3

        return weapons;
    },

    create() {
        const burstFrames = this.anims.generateFrameNames("vfx", {
            start: 1,
            end: 6,
            zeroPad: 0,
            prefix: "Burst",
            suffix: ".png",
        });
        (this.OnEnterAnimation = this.add.sprite(
                    0.5 * this.renderer.width,
                    0.5 * this.renderer.width,
                    "vfx",
                    "Burst1.png")),
        this.OnEnterAnimation.anims.create({
            key: "enter",
            frames: burstFrames,
            frameRate: 30,
            repeat: 0,
        }),
        (this.OnEnterAnimation.visible = true),
        this.OnEnterAnimation.setScale(8),
        this.OnEnterAnimation.setDepth(1000),
        (this.OnEnterAnimation.blendMode = self.BlendModes.BlendModes.ADD);
        let width = 2 * self.Game.SAFEAREA.width * 0.8,
        height = 0.8 * self.Game.DEFAULT_HEIGHT;
        (this.background = new self.Plugins.NineSlice(this, self.NineSliceConfig.default.MenuBackground, {
                x: 0,
                y: 0,
                width: width,
                height: height,
            })),
        this.background.setPosition(0.5 * this.renderer.width, 0.5 * this.renderer.height),
        this.background.setOrigin(0.5),
        this.background.setScale(self.Core.default.PixelScale),
        this.background.setAlpha(1),
        this.add.existing(this.background),
        this.tweens.add({
            targets: this.background,
            alpha: 0.95,
            duration: 2000,
            yoyo: true,
            repeat: -1,
        }),
        (this.TopLeft.x = this.background.x - 0.5 * this.background.width * self.Core.default.PixelScale),
        (this.TopLeft.y = this.background.y - 0.5 * this.background.height * self.Core.default.PixelScale);
        let title = self.Game.default.Lang.getLang("weaponSelection_header") || "Weapon Selection";
        (this.header = new Phaser.GameObjects.Text(
                    this,
                    0.5 * this.renderer.width,
                    this.TopLeft.y + 45,
                    title, {})
                .setScale(2 * self.Core.default.PixelScale)
                .setOrigin(0.5)),
        self.Game.default.Lang.scaleToMaxFast(this.header, false, 250),
        this.add.existing(this.header);
        let weapons =
            self.Game.default.Core.PlayerOptions.qolModOptions.extendedCandyboxEnabled ?
            this.getAllWeapons()
            : "evo" === self.Game.default.Core.WeaponSelectionType
            ? this.getEvolvedWeapons()
            : this.constructor.getBaseWeapons();
        this.panels = [];
        for (let i = 0; i < weapons.length + 1; i++)
            (this.panels[i] = new self.SelectWeaponPanel.default(
                        this,
                        this.renderer.width,
                        this.TopLeft.y + 96 + 64 * Math.floor(i / 4) - 0.025 * width,
                        192,
                        64)),
            (this.panels[i].OnEnterTween = this.tweens.add({
                    targets: this.panels[i],
                    x: this.TopLeft.x + 0.025 * width + (i % 4) * 192,
                    duration: 150 + 8 * i,
                    ease: "Linear",
                })),
            i < weapons.length
             ? this.panels[i].AssignData(weapons[i])
             : this.panels[i].AssignData(),
            this.add.existing(this.panels[i]);
        this.background.setScale(-0.2, -0.1),
        this.background.setAngle(180),
        (this.OnEnterTween = this.tweens.add({
                targets: this.background,
                scale: self.Core.default.PixelScale,
                angle: 0,
                duration: 150,
                ease: "Linear",
                yoyo: false,
            })),
        (this.ScrollBar = new self.Plugins.NineSlice(this, self.NineSliceConfig.default.Scrollbar, {
                x: 935,
                y: this.TopLeft.y + 75,
                width: 8,
                height: height - 100,
            })
                .setScale(self.Core.default.PixelScale)
                .setOrigin(0.5, 0)),
        this.add.existing(this.ScrollBar),
        (this.ScrollCursor = this.add
                .image(this.ScrollBar.x, this.ScrollBar.y, "UI", "menu_slider_button_strip3.png")
                .setScale(self.Core.default.PixelScale)
                .setOrigin(0.5, 0));
        const graphics = new Phaser.GameObjects.Graphics(this, {
            x: 0,
            y: 0,
        });
        graphics.lineStyle(1, 16777215, 0.9),
        graphics.fillStyle(65535, 0.2),
        graphics.fillRect(0, this.TopLeft.y + 75, this.renderer.width, this.ScrollBar.height);
        let geometryMask = graphics.createGeometryMask();
        (this.sc = new self.ScrollableContainer.default(this, 0, 63 * (weapons.additionalLines || 1))),
        this.sc.setBounds(
            new Phaser.Geom.Rectangle(this.TopLeft.x, this.TopLeft.y, this.renderer.width, this.renderer.height)),
        this.sc.setMask(geometryMask),
        this.sc.SetSize(1850, 126 * (weapons.additionalLines || 1), true, 1100 * (weapons.additionalLines || 1)),
        this.sc.AddChildren(this.panels),
        self.Game.default.Core.SceneManager.UI_overlayScene.UI_highlightL.setMask(geometryMask),
        self.Game.default.Core.SceneManager.UI_overlayScene.UI_highlightR.setMask(geometryMask),
        this.HandleInput(),
        (this.IsInitialised = true),
        self.Game.default.Sound.PlaySound("LevelUp", {
            volume: 1,
            detune: -200,
        }),
        self.Game.default.Sound.PlaySound("LevelUp", {
            volume: 0.5,
            detune: -1500,
        }),
        this.ShowPanels();
    }
}

module.exports = {
    mods: [
        {
            key: 'overwrite',
            callback: 'UI_selectWeaponScene.getAllWeapons',
            target: UI_selectWeaponScene.getAllWeapons
        },

        {
            key: 'overwrite',
            callback: 'UI_selectWeaponScene.create',
            target: UI_selectWeaponScene.create
        }
    ]
}
