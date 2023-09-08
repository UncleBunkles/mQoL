
function createLimitBreakOptions(limitBreakConfigs) {
    let limitBreakOptions = {}

    Object.keys(limitBreakConfigs).forEach((name, index) => {
        limitBreakOptions[name] = index + 1

        limitBreakOptions[`${name}_uniqueWeightsEnabled`] = true

        limitBreakConfigs[name].forEach((option, index) => {
            limitBreakOptions[
                `${name}_${Object.keys(option).filter(value => !['max', 'rarity'].includes(value))[0]}`
                ] = index + 1
        })
    })

    console.log(JSON.stringify(limitBreakOptions))
}

module.exports = createLimitBreakOptions
