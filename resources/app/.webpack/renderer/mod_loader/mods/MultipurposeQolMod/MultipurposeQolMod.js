const fs = require("fs")
const path = require("path")

class MultipurposeQolMod {
    constructor(mod) {
        this.modLoader = mod

        this.pathModifier = '/mods'

        this.mods = this.getMods()
        this.initHooks = []

        this.mods.forEach((modExport) => {
            modExport.mods.forEach((hook) => {
                if (!this[hook.key]) {
                    this[hook.key] = {}
                }

                this[hook.key][hook.callback] = hook.target
            })

            modExport.init && this.initHooks.push(modExport.init)
        })
    }

    init() {
        this.defineModules([
            "Game", "Core", "NineSliceConfig",
            "Utils", "Plugins",
            "LimitBreakConfigs", "WeaponConfigs",
            "BlendModes", "ReelConfig", "WeaponPanelClass",
            "TreasureClass", "PickupConfigs",
            "SelectWeaponPanel", "ScrollableContainer",
        ])

        this.initHooks.forEach(hook => hook.bind(this)())
    }

    defineModules(modules) {
        modules.forEach(module => {
            this[module] = this.modLoader.importer(module)
        })
    }

    getMods() {
        return fs
            .readdirSync(path.join(__dirname, "mods/"), { withFileTypes: true })
            .map((dir) => require(path.join(__dirname, `mods/${dir.name}`)))
    }
}

module.exports = MultipurposeQolMod
