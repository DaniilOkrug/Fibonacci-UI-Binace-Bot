export const URL = '123';

export const fiboEmptyLevel = `
    <div class="row">
        <div class="col">
            <div class="input-group mb-3">
                <input id="profit" type="number" class="form-control" aria-label="profit"
                    aria-describedby="profit">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <input id="fibo-level" type="number" class="form-control" min="0" aria-label="Fibo level"
                    aria-describedby="Fibo level">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <input id="takeprofit" type="number" class="form-control" min="0" aria-label="takeprofit"
                    aria-describedby="takeprofit">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <input id="stoploss" type="number" class="form-control" min="0" aria-label="stoploss"
                    aria-describedby="stoploss">
            </div>
        </div>
    </div>`;

export function fiboLevel(level, amount, takeProfit, stopLoss) {
    return `
    <div class="row">
        <div class="col">
            <div class="input-group mb-3">
                <input id="profit" type="number" class="form-control" value="${amount}" aria-label="profit"
                    aria-describedby="profit">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <input id="fibo-level" type="number" class="form-control" value="${level}" min="0" aria-label="Fibo level"
                    aria-describedby="Fibo level">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <input id="takeprofit" type="number" class="form-control" value="${takeProfit}" min="0" aria-label="takeprofit"
                    aria-describedby="takeprofit">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <input id="stoploss" type="number" class="form-control" value="${stopLoss}" min="0" aria-label="stoploss"
                    aria-describedby="stoploss">
            </div>
        </div>
    </div>`;
}

export function templateOption(value, text){ return `<option value="${value}">${text}</option>`;}