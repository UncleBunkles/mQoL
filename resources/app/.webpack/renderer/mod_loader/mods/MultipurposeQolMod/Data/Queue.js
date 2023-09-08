
/**
 * @typedef Queue
 */

/** @type Queue */
class Queue {
    #size
    #elements
    #head
    #tail
    #sumOfRemovedElements

    /**
     * @param size {Number}
     */
    constructor(size = 5) {
        this.#size = size

        this.#elements = {}

        this.#head = 0
        this.#tail = 0
        this.#sumOfRemovedElements = 0
    }

    /**
     * @param {*} element
     */
    enqueue(element) {
        this.#elements[this.#tail] = element
        this.#tail++

        if (this.length > this.#size) {
            this.dequeue()
        }
    }

    /**
     * @return {*}
     */
    dequeue() {
        const item = this.#elements[this.#head]
        delete this.#elements[this.#head]

        this.#head += 1

        this.#sumOfRemovedElements += item

        return item
    }

    /**
     * @return {Number}
     */
    get length() {
        return this.#tail - this.#head
    }

    /**
     * @return {Array}
     */
    get elements() {
        return Object.values(this.#elements)
    }

    /**
     * @return {Number}
     */
    get sum() {
        return this.elements.reduce((sum, el) => sum + el, 0)
    }

    /**
     * @return {Number}
     */
    get lifetimeSum() {
        return (this.sum || 0) + this.#sumOfRemovedElements
    }

    /**
     * @return {*}
     */
    get last() {
        return this.#elements[this.#tail - 1]
    }

    /**
     * @param {*} newValue
     */
    set last(newValue) {
        this.#elements[this.#tail - 1 >= 0 ? this.#tail - 1 : 0] = newValue
    }
}

module.exports = Queue
