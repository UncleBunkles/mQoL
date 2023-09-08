
const PickupPool = {
    SpawnAt(x, y, pickupType, atlasName) {
        const pickup = this.Spawn(pickupType, atlasName);
        return (
            this.scene.children.add(pickup),
            (pickup.x = x),
            (pickup.y = y),
            pickup.OnRecycle(),
            pickup);
    },

    Spawn(pickupType, atlasName) {
        let pickup;

        return (
            this.stored[pickupType]
             ? (pickup = this.stored[pickupType].pop())
             : ((this.stored[pickupType] = []), (this.spawned[pickupType] = [])),
            pickup || ((pickup = this.Make(pickupType, atlasName)), pickup.Init()),
            this.add(pickup, true),
            this.spawned[pickupType].push(pickup),
            self.Game.default.Core.PickupGroup.add(pickup, false),
            pickup);
    },

    Make(pickupType, atlasName) {
        if (pickupType === "TREASURE") {
            return new self.TreasureClass.default(this, 0, 0, atlasName)
        }
    }
}
const PickupPool_hooks = [
    {
        key: 'overwrite',
        callback: 'PickupPool.SpawnAt',
        target: PickupPool.SpawnAt
    },

    {
        key: 'overwriteSignature',
        callback: 'PickupPool.SpawnAt',
        target: 'x, y, pickupType, atlasName'
    },

    {
        key: 'overwrite',
        callback: 'PickupPool.Spawn',
        target: PickupPool.Spawn
    },

    {
        key: 'overwriteSignature',
        callback: 'PickupPool.Spawn',
        target: 'pickupType, atlasName'
    },

    {
        key: 'pre',
        callback: 'PickupPool.Make',
        target: PickupPool.Make
    },

    {
        key: 'overwriteSignature',
        callback: 'PickupPool.Make',
        target: 'pickupType, atlasName'
    },
]

const TreasureClass = {
    constructor(pool, x, y, atlasName) {
        _super(pool, x, y, "TREASURE", atlasName),
        (this.radius = 20),
        self.Game.default.Core.scene.add.existing(this),
        this.setScale(self.Core.default.PixelScale),
        (this.Cursor = this.scene.add.sprite(x, y, "UI", "arrow_01.png")),
        this.Cursor.setDepth(9999),
        this.Cursor.setScale(2),
        this.Cursor.setAlpha(0.75),
        this.Cursor.setBlendMode(self.BlendModes.BlendModes.ADD);
        const frames = this.anims.generateFrameNames("UI", {
            start: 1,
            end: 8,
            zeroPad: 2,
            prefix: "arrow_",
            suffix: ".png",
        });
        this.Cursor.anims.create({
            key: "idle",
            frames: frames,
            frameRate: 16,
            repeat: -1,
        }),
        this.Cursor.play("idle"),
        this.body.setCircle(16, -8, -8);
    }
}
const TreasureClass_hooks = [
    {
        key: 'overwrite',
        callback: 'TreasureClass.constructor',
        target: TreasureClass.constructor
    },

    {
        key: 'overwriteSignature',
        callback: 'TreasureClass.constructor',
        target: 'pool, x, y, atlasName'
    }
]

const BasePickup = {
    constructor(pool, x, y, type, atlasName = 'items') {
        _super(pool.scene, x, y, atlasName || "items"),
        (this.DEFAULT_SPEED = 250),
        (this.radius = 10),
        (this.frameName = "GemRed.png"),
        (this.speed = this.DEFAULT_SPEED),
        (this.goToPlayer = false),
        (this.time = 0),
        (this.originPos = new Phaser.Math.Vector2(0, 0)),
        (this.currentDirection = new Phaser.Math.Vector2(0, 0)),
        (this.value = 0),
        (this.isStationary = false),
        (this.owner = null),
        (this.disableGet = false),
        (this.isCullable = true),
        (this.isTeleportOnCull = false),
        (this.feverMS = 0),
        (this.pool = pool),
        (this.itemType = type);
        let itemType = self.PickupConfigs.default[type];
        (this.frameName = itemType.frameName),
        (this.value = itemType.value),
        (this.feverMS = itemType.feverMS),
        this.setFrame(this.frameName),
        pool.scene.add.existing(this),
        pool.scene.physics.add.existing(this),
        this.setScale(self.Core.default.PixelScale),
        this.body.setCircle(this.radius),
        (this.originPos.x = x),
        (this.originPos.y = y),
        (this.vacuumTween = this.scene.tweens.add({
                targets: this,
                time: 1,
                duration: 500,
                ease: "Linear",
            })),
        this.vacuumTween.pause();
    }
}
const BasePickup_hooks = [
    {
        key: 'overwrite',
        callback: 'BasePickup.constructor',
        target: BasePickup.constructor
    },

    {
        key: 'overwriteSignature',
        callback: 'BasePickup.constructor',
        target: "pool, x, y, type, atlasName = 'items'"
    },
]

const Core = {
    MakeTreasure(x, y, config) {
        let treasure

        if (config.prizeTypes[0] === 'EVO_ARCANA' && this.PlayerOptions.qolModOptions.coloredChestsEnabled) {
            treasure = this.MakePickup(
                x,
                y,
                "TREASURE",
                0,
                0,
                0,
                'qolModAtlas'
            ).setFrame('BoxOpen4.png');

            if (this.PlayerOptions.qolModOptions.coloredGuidesEnabled) {
                treasure.Cursor.setTint(8267255)
            }
        } else if (config.prizeTypes[0] === 'EVOLUTION' && this.PlayerOptions.qolModOptions.coloredChestsEnabled) {
            treasure = this.MakePickup(
                x,
                y,
                "TREASURE",
                0,
                0,
                0,
                'qolModAtlas'
            ).setFrame('BoxOpen3.png');

            if (this.PlayerOptions.qolModOptions.coloredGuidesEnabled) {
                treasure.Cursor.setTint(16768312)
            }
        } else {
            treasure = this.MakePickup(
                x,
                y,
                "TREASURE",
                0,
                0,
                0,
                'qolModAtlas'
            );

            if (this.PlayerOptions.qolModOptions.coloredGuidesEnabled) {
                treasure.Cursor.setTint(13196344)
            }
        }

        (treasure.CurrentTreasureLevel = config.level),
        (treasure.CurrentTreasureTypes = config.prizeTypes),
        (treasure.CurrentFixedTreasures = [null, null, null, null, null]),
        config.fixedPrizes &&
        config.fixedPrizes.length > 0 &&
        (treasure.CurrentFixedTreasures = config.fixedPrizes);
    },

    MakePickup(
        arguments_0 = null,
        arguments_1 = null,
        arguments_2 = "COIN",
        arguments_3 = 0,
        arguments_4 = 0,
        arguments_5 = 0,
        atlasName
    ) {
        let spawnedGems,
        spawnedGems2;
        let pickup,
        pickupConfig =
            null === arguments_0 && null === arguments_1
             ? this.GetPositionOutOfSight(90)
             : new Phaser.Math.Vector2(arguments_0, arguments_1);
        if (arguments_2 === "GEM") {
            let pickupValue = 0,
            elementOnSceen = false,
            maxGems = this.MaxGems,
            currentGemsAmount = 0;
            if (
                (null === (spawnedGems = this.gemsPool.spawned["GEM"]) || void 0 === spawnedGems
                     ? void 0
                     : spawnedGems.length) > this.MaxGems) {
                for (;
                    (null === (spawnedGems2 = this.gemsPool.spawned["GEM"]) || void 0 === spawnedGems2
                         ? void 0
                         : spawnedGems2.length) > this.MaxGems;
                    ) {
                    if ((furthestGem = this.furthest(this.Player, this.gemsPool.spawned["GEM"]))) {
                        if (this.containmentRect_Screen.Contains(furthestGem)) {
                            elementOnSceen = true;
                            break;
                        }
                        (pickupValue += furthestGem.value),
                        furthestGem.DeSpawn();
                    }
                    if (++currentGemsAmount > maxGems)
                        break;
                }
                var furthestGem;

                if (
                    ((furthestGem = this.furthest(this.Player, this.gemsPool.spawned["GEM"])) &&
                        furthestGem.SetValue(pickupValue + furthestGem.value),
                        elementOnSceen))
                    return (furthestGem.value += arguments_4), null;
                pickup = this.gemsPool.SpawnAt(pickupConfig.x, pickupConfig.y, "GEM");
            } else
                pickup = this.gemsPool.SpawnAt(pickupConfig.x, pickupConfig.y, "GEM");
        } else
            pickup = this.pickupPool.SpawnAt(pickupConfig.x, pickupConfig.y, arguments_2, atlasName);
        return (
            pickup.itemType === "WEAPON" && arguments_3 !== 0
             ? pickup.SetWeaponType(arguments_3)
             : pickup.itemType === "RELIC" &&
            arguments_5 !== 0 &&
            pickup.SetItemType(arguments_5),
            pickup);
    }
}
const Core_hooks = [
    {
        key: 'overwrite',
        callback: 'Core.MakeTreasure',
        target: Core.MakeTreasure
    },

    {
        key: 'overwriteSignature',
        callback: 'Core.MakeTreasure',
        target: 'x = null, y = null, config'
    },

    {
      key: 'overwrite',
      callback: 'Core.MakePickup',
      target: Core.MakePickup
    },

    {
        key: 'overwriteSignature',
        callback: 'Core.MakePickup',
        target: 'arguments_0 = null, arguments_1 = null, arguments_2 = "COIN", arguments_3 = 0, arguments_4 = 0, arguments_5 = 0, atlasName'
    },
]

const PreloadScene = {
    loadAssets() {
        this.load.atlas("qolModAtlas", "./mod_loader/mods/MultipurposeQolMod/assets/qolModAtlas.png", "./mod_loader/mods/MultipurposeQolMod/assets/qolModAtlas.json")
    }
}
const PreloadScene_hooks = [
    {
        key: 'post',
        callback: 'PreloadScene.loadAssets',
        target: PreloadScene.loadAssets
    },
]

const TreasureMapPanel = {
    constructor() {
        this.list.forEach(el => {
            if (el.type === 'Sprite' && el.frame.name === 'BoxOpen.png') {
                el.setVisible(false)
            }
        })

        let treasures = self.Game.default.Core.PickupGroup.children.entries.filter(
            (item) => item.itemType === "TREASURE"
        );

        for (let i = 0; i < treasures.length; i++) {
            const treasure = treasures[i];
            let item;
            if (
                (treasure.itemType,
                    treasure.itemType && (item = self.PickupConfigs.default[treasure.itemType]),
                    !item))
                return;

            let offset = (self.Game.default.Core.Player.x - treasure.x) / (0.5 * arguments[3]),
            mapX = 0.5 * arguments[3] - 3 * offset;
            offset = (self.Game.default.Core.Player.y - treasure.y) / (0.5 * arguments[3]);
            let mapY = 0.5 * arguments[3] - 3 * offset;

            mapX > arguments[3] && (mapX = arguments[3]),
            mapX < 0 && (mapX = 0),
            mapY > arguments[3] && (mapY = arguments[3]),
            mapY < 0 && (mapY = 0);

            let icon = this.scene.add
                .sprite(mapX, mapY, treasure.texture.key, treasure.frame.name)
                .setScale(1);

            this.add(icon);
        }
    }
}
const TreasureMapPanel_hooks = [
    {
        key: 'post',
        callback: 'TreasureMapPanel.constructor',
        target: TreasureMapPanel.constructor
    }
]

module.exports = {
    mods: [
        ...PickupPool_hooks,
        ...TreasureClass_hooks,
        ...BasePickup_hooks,
        ...Core_hooks,
        ...PreloadScene_hooks,
        ...TreasureMapPanel_hooks
    ]
}
