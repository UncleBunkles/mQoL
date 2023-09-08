
function addModOptions() {
    const { qolModOptions, magnetOptions, limitBreakOptions } = require('../Data')

    this.qolModOptions = qolModOptions
    this.magnetOptions = magnetOptions
    this.limitBreakOptions = limitBreakOptions
}

module.exports = {
    mods: [
        {
            key: 'post',
            callback: 'PlayerOptions.constructor',
            target: addModOptions
        }
    ]
}
