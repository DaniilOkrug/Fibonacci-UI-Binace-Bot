/**
 * Additional requsets:
 * POST connectApi 
 *      {
            'key': value,
            'secret': value
        }
    GET closeOrders?symbol=${button.name}
    POST setTime
        {
            'to': value,
            'from': value
        }
    POST newCycle
        {
            'minPrice': value,
            'macPrice': value
        }
    POST newTemplate
        {
            algorithm2: false
            cycleDuration: "1m"
            delay: "1m"
            levelCount: "1"
            levels: [{level: '1', amount: '1', takeProfit: '1', stopLoss: '1'}]
            length: 1
            name: "1"
            price1: "1"
            price2: "2"
            skipLevels: "1"
            timeframe: "1m"
            waitSignal: true
        }
 */

//GET /api
export const initialApiState = {
    'apiKey': '1123',
}

//GET /availablePairs
export const avalablePairs = [
    "XRPUSDTPERP",
    "ADAUSDTPERP",
    "DASHUSDTPERP",
    "ATOMUSDTPERP"
]

//GET /availablePairs
export const avalablePairsNew = [
    "ADAUSDTPERP",
    "DASHUSDTPERP",
    "ATOMUSDTPERP"
]

//GET /symbols
export const activePairs = [
    "BTCUSDT",
    "ETHUSDT",
    "DOGEUSDT"
]

//GET /symbols
export const activePairsNew = [
    "BTCUSDT",
    "ETHUSDT"
]

//GET /symbols
export const activePairsNew2 = [
    "BTCUSDT",
    "ETHUSDT",
    "DOGEUSDT",
    "XRPUSDT"
]

//GET settings?symbol=pair
export const pairSettings = {
    "symbol": "ETHUSDT",
    "algorithm2": false,
    "template": "", //"name" or ""
    "timeframe": "30m",
    "waitSignal": true,
    "cycleDuration": 100, //minutes
    "delay": 1, //minutes
    "price1": 61238182,
    "price2": 312793719,
    "skipLevels": 0,
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
    "timeframe": "1m",
    "algorithm2": false,
    "waitSignal": false,
    "cycleDuration": 100, //minutes
    "delay": 1, //minutes
    "price1": 61238182,
    "price2": 312793719,
    "skipLevels": 1,
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
    "algorithm2": true,
    "timeframe": "15m",
    "waitSignal": false,
    "cycleDuration": 5, //minutes
    "delay": 0.5, //minutes
    "price1": 12.5,
    "price2": 15,
    "skipLevels": 31231,
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