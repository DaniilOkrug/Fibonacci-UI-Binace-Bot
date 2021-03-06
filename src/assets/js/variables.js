export const URL = '123/';

export function templateListItem(name) {
    return `
        <li class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
                <span class="align-middle">${name}</span>
                <div class="btn-group">
                    <button name="${name}" type="button"
                        class="delete-template btn btn-sm btn-warning">Удалить</button>
                </div>
            </div>
        </li>
    `
}

export function activePair(symbol) { 
    return `
    <li class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
            <span class="align-middle">${symbol}</span>
            <div class="btn-group">
                <button name="${symbol}" type="button" class="active cycle-state btn btn-sm btn-success me-4">Работает</button>
                <button name="${symbol}" type="button" class="settings-orders btn btn-sm btn-primary me-4" data-bs-toggle="modal"
                    data-bs-target="#pairSettings">Настройка</button>
                <button name="${symbol}" type="button" class="close-orders btn btn-sm btn-warning me-4">Закрыть сделки</button>
                <button name="${symbol}" type="button" class="delete-pair btn btn-sm btn-danger">Удалить</button>
            </div>
        </div>
    </li>`;
}

export function avalablePair(optionNumber, pair) {
    return `<option value="${optionNumber}">${pair}</option>`;
}

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

export function templateOption(value, text) { return `<option value="${value}">${text}</option>`; }