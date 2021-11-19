export class Templates {
    #templates = [];

    constructor(templates) {
        this.#templates = templates;
    }

    get current() {
        return this.#templates;
    }

    set update(templates) {
        this.#templates = templates;
    }
}