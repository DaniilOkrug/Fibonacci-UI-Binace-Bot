import { fiboLevel, fiboEmptyLevel } from './variables';
import { post } from './requests';

export function sendPairNewSettings() {
    const pairTitle = document.querySelector('#pairSettings span.pair');
    const cycleDuration_input = document.querySelector('#pairSettings #cycle-duration');
    const waitSignal_checkBox = document.querySelector('#pairSettings #waitSignal');
    const delay_input = document.querySelector('#pairSettings #cycle-delay');

    const price1_input = document.querySelector('#pairSettings #price1-fibo');
    const price2_input = document.querySelector('#pairSettings #price2-fibo');

    const fiboContainer = document.querySelector('#pairSettings div.fibo-container');
    const ordersNumber_input = document.querySelector('#pairSettings #orders-number');

    const levels = [];

    for (let i = 0; i < fiboContainer.childElementCount; i++) {
        const order = fiboContainer.children[i];
        const level = {
            "level": order.querySelector('#fibo-level').value,
            "amount": order.querySelector('#profit').value,
            "takeProfit": order.querySelector('#takeprofit').value,
            "stopLoss": order.querySelector('#stoploss').value
        }

        levels[i] = level;
    }

    const requestBody = JSON.stringify({
        "symbol": pairTitle.innerText,
        "template": "My", //"name" or ""
        "waitSignal": waitSignal_checkBox.checked,
        "cycleDuration": cycleDuration_input.value, //minutes
        "delay": delay_input.value, //minutes
        "price1": price1_input.value,
        "price2": price2_input.value,
        "levelCount": ordersNumber_input.value,
        "levels": levels
    });

    console.log(requestBody);
    // post(requestBody, "application/json;charset=UTF-8");
}

/**
 * Set settings to the current pair
 * 
 * @param {Object} settings 
 * @param {Boolean} checkTemplate Determine choosen template and select it
 */
export function setPairSettings(settings, checkTemplate) {
    const cycleDuration_input = document.querySelector('#pairSettings #cycle-duration');
    const waitSignal_checkBox = document.querySelector('#pairSettings #waitSignal');
    const delay_input = document.querySelector('#pairSettings #cycle-delay');

    const price1_input = document.querySelector('#pairSettings #price1-fibo');
    const price2_input = document.querySelector('#pairSettings #price2-fibo');

    const fiboContainer = document.querySelector('#pairSettings div.fibo-container');
    const ordersNumber_input = document.querySelector('#pairSettings #orders-number');

    if (checkTemplate) determineTemplate(settings.template);

    waitSignal_checkBox.checked = settings.waitSignal;
    cycleDuration_input.value = settings.cycleDuration;
    delay_input.value = settings.delay;

    price1_input.value = settings.price1;
    price2_input.value = settings.price2;

    ordersNumber_input.value = settings.levelCount;

    if (settings.waitSignal) {
        cycleDuration_input.disabled = true;
    } else {
        cycleDuration_input.disabled = false;
    }

    fiboContainer.innerHTML = '';
    settings.levels.forEach((fibo) => {
        fiboContainer.insertAdjacentHTML('beforeend', fiboLevel(fibo.level, fibo.amount, fibo.takeProfit, fibo.takeProfit));
    });
}

/**
 * Clear current settings in modal inputs
 */
export function clearSettings() {
    const cycleDuration_input = document.querySelector('#pairSettings #cycle-duration');
    const waitSignal_checkBox = document.querySelector('#pairSettings #waitSignal');
    const delay_input = document.querySelector('#pairSettings #cycle-delay');

    const price1_input = document.querySelector('#pairSettings #price1-fibo');
    const price2_input = document.querySelector('#pairSettings #price2-fibo');

    const fiboContainer = document.querySelector('#pairSettings div.fibo-container');
    const ordersNumber_input = document.querySelector('#pairSettings #orders-number');

    waitSignal_checkBox.checked = false;
    cycleDuration_input.value = '';
    delay_input.value = '';

    price1_input.value = '';
    price2_input.value = '';

    ordersNumber_input.value = '';

    cycleDuration_input.disabled = false;

    fiboContainer.innerHTML = '';
}

/**
 * Generate orders and place it in the modal window
 * 
 * @param {Object} settings 
 */

export function generateFiboLevels(settings, levelsNumber) {
    const fiboContainer = document.querySelector('#pairSettings div.fibo-container');

    fiboContainer.innerHTML = '';

    for (let i = 0; i < levelsNumber; i++) {

        if (settings.levels.length > i) {
            let fibonacciLevel = settings.levels[i];
            fiboContainer.insertAdjacentHTML('beforeend', fiboLevel(fibonacciLevel.level, fibonacciLevel.amount, fibonacciLevel.takeProfit, fibonacciLevel.stopLoss));
        } else {
            fiboContainer.insertAdjacentHTML('beforeend', fiboEmptyLevel);
        }
    }
}
/**
 * Determine choosen template and select it
 * 
 * @param {String} activeTemplate template name
 */
function determineTemplate(activeTemplate) {
    const pairTemplate = document.querySelector('#pairSettings #pair-template');

    if (activeTemplate == '') {
        pairTemplate.options[0].selected = true;
    } else {
        for (let i = 0; i < pairTemplate.options.length; i++) {
            if (pairTemplate.options[i].text == activeTemplate) {
                pairTemplate.options[i].selected = true;
                break;
            }
        }
    }
}