import { fiboLevel, fiboEmptyLevel } from './variables';
import { post } from './requests';

/**
 * 
 * @param {Object} form object of the HTML elements
 * @param {Object} templates curretly availble pait templates
 * @param {String} URL URL of the POST request
 * @returns 
 */
export function sendPairSettings(requestBody, templates, URL) {

    //Validate input values
    if(!validatePairSettings({
        "cycleDuration": requestBody.cycleDuration,
        "delay": requestBody.delay,
        "price1": requestBody.price1,
        "price2": requestBody.price2,
        "levelCount": requestBody.levelCount,
        "fiboContainer": requestBody.fiboContainer
    })) return

    const levels = [];

    for (let i = 0; i < requestBody.fiboContainer.childElementCount; i++) {
        const order = requestBody.fiboContainer.children[i];
        const level = {
            "level": order.querySelector('#fibo-level').value,
            "amount": order.querySelector('#profit').value,
            "takeProfit": order.querySelector('#takeprofit').value,
            "stopLoss": order.querySelector('#stoploss').value  
        }

        levels[i] = level;
    }
    requestBody.levels = levels;

    delete requestBody.fiboContainer;

    const templateName = checkForTemplate(requestBody, templates);
    requestBody.template = templateName;

    console.log(requestBody);
    requestBody = JSON.stringify(requestBody);

    console.log('Send POST request to ' + URL);
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
        fiboContainer.insertAdjacentHTML('beforeend', fiboLevel(fibo.level, fibo.amount, fibo.takeProfit, fibo.stopLoss));
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
 * @param {Object} container HTML element for orders
 * @param {Object} settings 
 * @param {Int} levelsNumber
 */

export function generateFiboLevels(container, settings, levelsNumber) {
    container.innerHTML = '';

    for (let i = 0; i < levelsNumber; i++) {
        if (settings.levels?.length > i) {
            let fibonacciLevel = settings.levels[i];
            container.insertAdjacentHTML('beforeend', fiboLevel(fibonacciLevel.level, fibonacciLevel.amount, fibonacciLevel.takeProfit, fibonacciLevel.stopLoss));
        } else {
            container.insertAdjacentHTML('beforeend', fiboEmptyLevel);
        }
    }
}

/**
 * 
 * @param {Oject} form Object contains HTML elements of the settings form
 * {
        "cycleDuration": value,
        "delay": value,
        "price1": value,
        "price2": value,
        "ordersNumber": value,
        "fiboContainer": constainer {}
    }
 * 
 * @returns Boolean value of the validation
 */
function validatePairSettings(form) {
    const fiboContainer = form.fiboContainer;

    if (form.cycleDuration == '' || form.cycleDuration < 0) {
        alert('Неверное продолжительность цикла');
        return false;
    }
        
    if (form.delay == '' || form.delay < 0) {
        alert('Неверное задержка');
        return false;
    }
        
    if (form.price1 == '' || form.price1 < 0) {
        alert('Неверное цена 1');
        return false;
    }
        
    if (form.price2 == '' || form.price2 < 0) {
        alert('Неверное цена 2');
        return false;
    }
        
    if (form.levelCount == '' || form.levelCount < 1) {
        alert('Неверное количество ордеров');
        return false;
    }

    const profitValidation = nodeListToArray(fiboContainer.querySelectorAll('#profit')).every((input) => {
        return input.value != ''
    });

    if (!profitValidation) {
        alert('Один из объемов профита не задан');
        return false
    }

    const fiboLevelValidation = nodeListToArray(fiboContainer.querySelectorAll('#fibo-level')).every((input) => {
        return input.value != '' && input.value > 0
    })

    if (!fiboLevelValidation) {
        alert('Один из уровней срабатывания задан неверно');
        return false
    }

    const takeprofitValidation = nodeListToArray(fiboContainer.querySelectorAll('#takeprofit')).every((input) => {
        return input.value != ''
    });
    
    if (!takeprofitValidation) {
        alert('TakeProfit задан неврено');
        return false
    }

    const stoplossValidation = nodeListToArray(fiboContainer.querySelectorAll('#stoploss')).every((input) => {
        return input.value != ''
    });
    
    if (!stoplossValidation) {
        alert('StopLoss задан неврено');
        return false
    }

    return true;
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

/**
 * 
 * @param {Object} settings 
 * @param {Array} templates 
 * @returns name of the Template
 */
function checkForTemplate(settingsJSON, templates) {
    const settings = settingsJSON;

    let name = '';
    templates.forEach((template) => {
        if (template.waitSignal == settings.waitSignal)
            if (template.cycleDuration == settings.cycleDuration)
                if (template.delay == settings.delay)
                    if (template.price1 == settings.price1)
                        if (template.price2 == settings.price2)
                            if (template.levelCount == settings.levelCount) {
                                for (let i = 0; i < template.levels.length; i++) {
                                    const templateLevel = template.levels[i];
                                    const settingsLevel = settings.levels[i];

                                    if (templateLevel.level == settingsLevel.level)
                                        if (templateLevel.amount == settingsLevel.amount)
                                            if (templateLevel.takeProfit == settingsLevel.takeProfit)
                                                if (templateLevel.stopLoss == settingsLevel.stopLoss) {
                                                    name = template.name;
                                                }
                                }
                            }
    });

    return name;
}

function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
}