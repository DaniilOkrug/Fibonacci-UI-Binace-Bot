export class Setting {
    #settings = {};

    constructor(settings) {
        this.#settings = settings;
    }

    get current() {
        return this.#settings;
    }

    set update(settings) {
        this.#settings = settings;
    }
}