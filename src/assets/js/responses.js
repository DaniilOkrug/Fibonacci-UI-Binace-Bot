//GET /api
export const initialApiState = {
    'apiKey': '1123',
}

//GET /activePairs
export const activePairs = [
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

//GET symbol?=pair
export const pairSettings = {
    "symbol": "ETHUSDT",
    "template": "My", //"name" or ""
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

//GET /templates
export const templates = [{
    "name": "Default",
    "waitSignal": true,
    "cycleDuration": 100, //minutes
    "delay": 1, //minutes
    "price1": 61238182,
    "price2": 312793719,
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
},
{
    "name": "My",
    "waitSignal": false,
    "cycleDuration": 5, //minutes
    "delay": 0.5, //minutes
    "price1": 12.5,
    "price2": 15,
    "levelCount": 3,
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
        },
        {
            "level": "0.7",
            "amount": "45",
            "takeProfit": "0.36",
            "stopLoss": "0.35"
        }
    ]
}
]