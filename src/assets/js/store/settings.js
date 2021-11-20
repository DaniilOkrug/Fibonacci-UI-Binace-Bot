export class Setting {
    #settings = {
        symbol: '',
        template: '',
        waitSignal: false,
        cycleDuration: 0,
        delay: 0,
        price1: 0,
        price2: 0,
        levelCount: 0,
        levels: []
    };

    constructor(settings) {
        this.#settings = settings;
    }

    get current() {
        return this.#settings;
    }

    /**
     * @param {{ symbol: string; 
     *           template: string; 
     *           waitSignal: boolean; 
     *           cycleDuration: number; 
     *           delay: number; 
     *           price1: number; 
     *           price2: number; 
     *           levelCount: number; 
     *           levels: { 
     *              level: string; 
     *              amount: string; 
     *              takeProfit: string;
     *              stopLoss: string; }[];
     *          }} settings
     */
    set update(settings) {
        this.#settings = settings;
    }
}