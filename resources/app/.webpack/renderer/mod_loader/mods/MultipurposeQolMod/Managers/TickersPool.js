
directions = {
    UP: 0,
    DOWN: 1
}

class TickersPool {
    constructor(toggler) {
        this.elements = []

        if (toggler instanceof Function) {
            Object.defineProperty(this, 'toggler', {
                get: () => toggler()
            })
        } else {
            this.toggler = toggler || true
        }
    }

    /**
     * @param {Ticker} element
     */
    add(element) {
        this.elements.push(element)
    }

    /**
     * @param {Ticker} aheadEl
     * @param {string} direction
     */
    updateBy(aheadEl, direction) {
        if (!this.toggler) {
            return
        }

        this.elements.forEach(overTakenEl => {
            if (overTakenEl.varValue === aheadEl.varValue && overTakenEl !== aheadEl) {
                if (direction === directions.UP) {
                    overTakenEl.varValue -= 1

                    if (overTakenEl.varValue < overTakenEl.min) {
                        overTakenEl.varValue = overTakenEl.max
                    }
                } else {
                    overTakenEl.varValue += 1

                    if (overTakenEl.varValue > overTakenEl.max) {
                        overTakenEl.varValue = overTakenEl.min
                    }
                }

                overTakenEl.ReadPlayerOptions()
            }
        })
    }
}

module.exports = TickersPool
