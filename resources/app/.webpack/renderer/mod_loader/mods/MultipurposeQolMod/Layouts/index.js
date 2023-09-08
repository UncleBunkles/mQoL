
const layouts = require('./Layouts')
const elements = require('./Elements')

module.exports = {
    MultipleImageCheckboxLayout: layouts.MultipleImageCheckboxLayout,
    MultipleImageTickerLayout: layouts.MultipleImageTickerLayout,

    TextCheckboxLayout: layouts.TextCheckboxLayout,
    TextTickerLayout: layouts.TextTickerLayout,
    TextSliderLayout: layouts.TextSliderLayout,

    DoubleTextCheckboxLayout: layouts.DoubleTextCheckboxLayout,
    DoubleTextTickerLayout: layouts.DoubleTextTickerLayout,
    TextCheckboxTextTickerLayout: layouts.TextCheckboxTextTickerLayout,

    PageScrollerLayout: layouts.PageScrollerLayout,

    Page: elements.Page,
}
