
const singleLayouts = require('./SingleLayouts')
const doubleLayouts = require('./DoubleLayouts')
const dynamicLayouts = require('./DynamicLayouts')

const specialLayouts = require('./SpecialLayouts')

module.exports = {
    MultipleImageCheckboxLayout: dynamicLayouts.MultipleImageCheckboxLayout,
    MultipleImageTickerLayout: dynamicLayouts.MultipleImageTickerLayout,

    TextCheckboxLayout: singleLayouts.TextCheckboxLayout,
    TextTickerLayout: singleLayouts.TextTickerLayout,
    TextSliderLayout: singleLayouts.TextSliderLayout,

    DoubleTextCheckboxLayout: doubleLayouts.DoubleTextCheckboxLayout,
    DoubleTextTickerLayout: doubleLayouts.DoubleTextTickerLayout,
    TextCheckboxTextTickerLayout: doubleLayouts.TextCheckboxTextTickerLayout,

    PageScrollerLayout: specialLayouts.PageScrollerLayout
}
