const URL = '123';

const initialApiState = {
    'apiKey': '1123',
}

const activePairs = [
    {
        "symbol": "BTCUSDT",
        "levelCount": 1,
        "levels": [
            {
                "level": "0.1",
                "amount": "10",
                "takeProfit": "0.2",
                "stopLoss": "0.13"
            }
        ]
    },
    {
        "symbol": "ETHUSDT",
        "levelCount": 2,
        "levels": [
            {
                "level": "0.1",
                "amount": "10",
                "takeProfit": "0.2",
                "stopLoss": "0.13"
            },
            {
                "level": "0.5",
                "amount": "20",
                "takeProfit": "0.3",
                "stopLoss": "0.56"
            }
        ]
    }

]

document.addEventListener('DOMContentLoaded', () => {

    //--Initial API states--
    inputApiKey = document.getElementById('api-key-active');

    // !!!! const initialState = JSON.parse(getRequest("initialStateURL"));

    inputApiKey.innerHTML = initialApiState.apiKey;

    //--Active pairs--
    let activePairsContainer = document.querySelector('div.activePairs ul.list-group');

    // !!!! const acrivePairs = JSON.parse(getRequest("activePairsURL"));


    activePairsContainer.innerHTML = '';
    if (activePairs.length > 0) {
        activePairs.forEach(pair => {
            activePairsContainer.insertAdjacentHTML('beforeend', `
                <li class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="align-middle">${pair.symbol}</span>
                        <div class="btn-group">
                            <button name="${pair.symbol}" type="button" class="settings-orders btn btn-sm btn-primary mx-4" data-bs-toggle="modal"
                                data-bs-target="#pairSettings">Настройка</button>
                            <button name="${pair.symbol}" type="button" class="close-orders btn btn-sm btn-warning">Закрыть сделки</button>
                        </div>
                    </div>
                </li>
            `);
        });
    }

    let settingsButtons = document.querySelectorAll("button.settings-orders");
    settingsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pair_title = document.querySelector('#pairSettings span.pair');

            const cycleDuration = document.querySelector('#pairSettings #cycle-duration');
            const delay = document.querySelector('#pairSettings #cycle-delay');

            const price1 = document.querySelector('#pairSettings ');

            const fiboContainer = document.querySelector('#pairSettings div.fibo-container');
            const levelsNumber = document.querySelector('#pairSettings #orders-number');

            // let pairSettings = JSON.parse(getRequest(`/symbols?symbol=${button.name}`));
            let pairSettings = {
                "symbol": "ETHUSDT",
                "waitSignal": true,
                "cycleDuration": 25, //minutes
                "delay": 1, //minutes
                "price1": 123,
                "price2": 321,
                "levelCount": 2,
                "levels": [
                    {
                        "level": "0.1", //fibo
                        "amount": "10", //$
                        "takeProfit": "0.2", //fibo
                        "stopLoss": "0.13" //fibo
                    },
                    {
                        "level": "0.5",
                        "amount": "20",
                        "takeProfit": "0.3",
                        "stopLoss": "0.56"
                    }
                ]
            }

            pair_title.innerHTML = pairSettings.symbol;

            cycleDuration.value = pairSettings.cycleDuration;
            delay.value = pairSettings.delay;
            levelsNumber.value = pairSettings.levelCount;
            
            if (pairSettings.waitSignal) {
                cycleDuration.disabled = true;
            } else {
                cycleDuration.disabled = false;
            }

            fiboContainer.innerHTML = '';
            pairSettings.levels.forEach((fibo) => {
                fiboContainer.insertAdjacentHTML('beforeend', `
                    <div class="row">
                        <div class="col">
                            <div class="input-group mb-3">
                                <input id="fibo-level" type="text" class="form-control" value="${fibo.level}" aria-label="Fibo level"
                                    aria-describedby="Fibo level">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <input id="profit" type="text" class="form-control" value="${fibo.amount}" aria-label="profit"
                                    aria-describedby="profit">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <input id="takeprofit" type="text" class="form-control" value="${fibo.takeProfit}" aria-label="takeprofit"
                                    aria-describedby="takeprofit">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <input id="stoploss" type="text" class="form-control" value="${fibo.stopLoss}" aria-label="stoploss"
                                    aria-describedby="stoploss">
                            </div>
                        </div>
                    </div>
                `);
            });

        });
    });

});

function getRequest(additionalURL) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', URL + additionalURL, false);
    xhr.send();

    if (xhr.status != 200) {
        //Error
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        return xhr.responseText;
    }
}

function postRequest(body, header) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', URL, false);

    xhr.setRequestHeader('Content-Type', header);

    xhr.send(body);

    if (xhr.status != 200) {
        //Error
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        return xhr.responseText;
    }
}