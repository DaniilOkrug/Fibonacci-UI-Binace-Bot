import {
    fiboLevel,
    fiboEmptyLevel,
    templateOption,
    avalablePair
} from './variables';
import {
    get,
    postAuthed
} from './requests';
import * as variables from './variables';

import * as responses from './responses'; //Only for tests

/**
 * Sends new template to the server
 * 
 * @param {Object} requestBody 
 * @param {Array} templates 
 * @param {String} URL 
 * @returns {Boolean} request success
 */
export function sendNewTemplate(requestBody, templates, URL, token) {
    //Validate input values
    const isTemplateNameExists = templates.every((template) => {
        return template.name != requestBody.name
    });

    if (!isTemplateNameExists) {
        alert('Такое имя темплейта уже существует')
        return false
    }

    if (!validatePairSettings({
        "name": requestBody.name,
        "cycleDuration": requestBody.cycleDuration,
        "waitSignal": requestBody.waitSignal,
        "delay": requestBody.delay,
        "price1": requestBody.price1,
        "price2": requestBody.price2,
        "skipLevels": requestBody.skipLevels,
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

    delete requestBody.fiboContainer;

    requestBody.levels = levels;
    requestBody.cycleDuration = requestBody.cycleDuration == '' ? '0m' : requestBody.cycleDuration + 'm';
    requestBody.delay += 'm';

    requestBody.skipLevels = Number(requestBody.skipLevels);
    requestBody.levelCount = Number(requestBody.levelCount);

    console.log(requestBody);

    postAuthed(requestBody, 'newTemplate', token);
    return true;
}

/**
 * 
 * @param {Object} form object of the HTML elements
 * @param {Object} templates curretly availble pait templates
 * @param {String} URL URL of the POST request
 * @returns {Boolean} request success
 */
export function sendPairSettings(requestBody, templates, URL, token) {
    //Validate input values
    if (!validatePairSettings({
        "cycleDuration": requestBody.cycleDuration,
        "waitSignal": requestBody.waitSignal,
        "delay": requestBody.delay,
        "price1": requestBody.price1,
        "price2": requestBody.price2,
        "skipLevels": requestBody.skipLevels,
        "levelCount": requestBody.levelCount,
        "fiboContainer": requestBody.fiboContainer
    })) return false;

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

    delete requestBody.fiboContainer;

    requestBody.levels = levels;
    const promise = new Promise((resolve, reject) => {
        const templateName = checkForTemplate(requestBody, templates);
        requestBody.template = templateName;
        resolve();
    });

    promise.then(() => {
        requestBody.skipLevels = Number(requestBody.skipLevels);
        requestBody.levelCount = Number(requestBody.levelCount);

        requestBody.cycleDuration += 'm';
        requestBody.delay += 'm';

        postAuthed(requestBody, URL, token);
    });
}

/**
 * Set new pair settings
 * 
 * @param {Object} settings 
 * @param {Boolean} checkTemplate Determine choosen template and select it
 */
export function setNewPairSettings(settings, checkTemplate) {
    console.log(settings);
    const cycleDuration_input = document.querySelector('div.newPair #cycle-duration');
    const waitSignal_checkBox = document.querySelector('div.newPair #waitSignal');
    const delay_input = document.querySelector('div.newPair #cycle-delay');
    const timeframe_select = document.querySelector('div.newPair #timeframe');

    const secondAlgorithm_checkBox = document.querySelector('div.newPair #secondAlgorithm');

    const price1_input = document.querySelector('div.newPair #price1-fibo');
    const price2_input = document.querySelector('div.newPair #price2-fibo');
    const price2SkipLevels_input = document.querySelector('div.newPair #skip-levels');

    const fiboContainer = document.querySelector('div.newPair div.fibo-container');
    const ordersNumber_input = document.querySelector('div.newPair #orders-number');

    if (checkTemplate) determineTemplate(settings.template);

    for (let i = 0; i < timeframe_select.options.length; i++) {
        if (timeframe_select.options[i].text == settings.timeframe) {
            timeframe_select.options[i].selected = true;
            break;
        }
    }

    waitSignal_checkBox.checked = settings.waitSignal;
    cycleDuration_input.value = settings.cycleDuration;
    delay_input.value = settings.delay;

    secondAlgorithm_checkBox.checked = settings.cycleType == "Alternative" ? true : false

    price1_input.value = settings.stopPrice;
    price2_input.value = settings.skipPrice;
    price2SkipLevels_input.value = settings.skipLevels;

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
 * Set settings to the current pair
 * 
 * @param {Object} settings 
 * @param {Boolean} checkTemplate Determine choosen template and select it
 */
export function setPairSettings(settings, checkTemplate) {
    const cycleDuration_input = document.querySelector('#pairSettings #cycle-duration');
    const waitSignal_checkBox = document.querySelector('#pairSettings #waitSignal');
    const delay_input = document.querySelector('#pairSettings #cycle-delay');
    const timeframe_select = document.querySelector('#pairSettings #timeframe');

    const secondAlgorithm_checkBox = document.querySelector('#pairSettings #secondAlgorithm');

    const price1_input = document.querySelector('#pairSettings #price1-fibo');
    const price2_input = document.querySelector('#pairSettings #price2-fibo');
    const price2SkipLevels_input = document.querySelector('#pairSettings #skip-levels');

    const fiboContainer = document.querySelector('#pairSettings div.fibo-container');
    const ordersNumber_input = document.querySelector('#pairSettings #orders-number');

    if (checkTemplate) determineTemplate(settings.template);

    for (let i = 0; i < timeframe_select.options.length; i++) {
        if (timeframe_select.options[i].text == settings.timeframe) {
            timeframe_select.options[i].selected = true;
            break;
        }
    }

    waitSignal_checkBox.checked = settings.waitSignal;
    cycleDuration_input.value = settings.cycleDuration;
    delay_input.value = settings.delay;

    secondAlgorithm_checkBox.checked = settings.cycleType == "Alternative" ? true : false

    price1_input.value = settings.stopPrice;
    price2_input.value = settings.skipPrice;
    price2SkipLevels_input.value = settings.skipLevels;

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
export function clearNewPairSettings() {
    const cycleDuration_input = document.querySelector('div.newPair #cycle-duration');
    const waitSignal_checkBox = document.querySelector('div.newPair #waitSignal');
    const delay_input = document.querySelector('div.newPair #cycle-delay');

    const price1_input = document.querySelector('div.newPair #price1-fibo');
    const price2_input = document.querySelector('div.newPair #price2-fibo');
    const price2SkipLevels_input = document.querySelector('div.newPair #skip-levels');

    const fiboContainer = document.querySelector('div.newPair div.fibo-container');
    const ordersNumber_input = document.querySelector('div.newPair #orders-number');


    waitSignal_checkBox.checked = false;
    cycleDuration_input.value = '';
    delay_input.value = '';

    price1_input.value = '';
    price2_input.value = '';
    price2SkipLevels_input.value = '';

    ordersNumber_input.value = '';

    cycleDuration_input.disabled = false;

    fiboContainer.innerHTML = '';
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

    const skipLevels_input = document.querySelector('#pairSettings #skip-levels');

    const fiboContainer = document.querySelector('#pairSettings div.fibo-container');
    const ordersNumber_input = document.querySelector('#pairSettings #orders-number');

    waitSignal_checkBox.checked = false;
    cycleDuration_input.value = '';
    delay_input.value = '';

    price1_input.value = '';
    price2_input.value = '';

    skipLevels_input.value = '';

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
export function settingsButtonsActions(settingsButtons, authToken) {
    settingsButtons.forEach(button => {
        button.addEventListener('click', () => {
            settings.update = settingsFormatter(JSON.parse(requests.get(`symbols?symbol=${button.name}`, authToken)));
            const pairTitle = document.querySelector('#pairSettings span.pair');
            pairTitle.innerHTML = settings.current.symbol;
            setPairSettings(settings.current, true);
        });
    });
}

/**
 * Set templates to the templates container
 * 
 * @param {Object} container HTML elemelt -> templates container
 */
export function setSettingsTemplatesList(container, templates) {
    container.innerHTML = `
        <option value="none">Пустой</option>
        <option value="default">Настройки пары</option>
        `;
    for (let i = 0; i < templates.length; i++) {
        container.insertAdjacentHTML('beforeend', templateOption(i, templates[i].name));
    }
}

/**
 * Set templates list to select element
 * 
 * @param {Object} container HTML element
 * @param {Array} templates array of templates
 */
export function setTemplatesList(container, templates) {
    container.innerHTML = `
        <option value="none">Пустой</option>
        `;
    for (let i = 0; i < templates.length; i++) {
        container.insertAdjacentHTML('beforeend', templateOption(i, templates[i].name));
    }
}

export function setListOfTemplates(container, templates) {
    container.innerHTML = '';
    if (templates.length > 0) {
        templates.forEach(template => {
            console.log(template.name);
            container.insertAdjacentHTML('beforeend', variables.templateListItem(template.name));
        });
    }
}

export function setAvailablePairs(container, avalablePairs) {
    container.innerHTML = '';
    for (let i = 0; i < avalablePairs.length; i++) {
        container.insertAdjacentHTML('beforeend', avalablePair(i, avalablePairs[i]));
    }
}

/**
 * Fromate settings after request
 * 
 * @param {Object} settings JSON settings of template or pair
 * @returns formatting settings
 */
export function settingsFormatter(settings) {
    console.log('{Formatter}');
    if (Object.prototype.toString.call(settings) === '[object Array]') {
        settings.forEach((setting) => {
            if (setting.delay.includes('m') || setting.delay.includes('s')) {
                setting.delay = setting.delay.slice(0, -1);
            }
            if (setting.cycleDuration.includes('m') || setting.cycleDuration.includes('s')) {
                setting.cycleDuration = setting.cycleDuration.slice(0, -1);
            }
        });
    } else {
        if (settings.delay.includes('m') || settings.delay.includes('s')) {
            settings.delay = settings.delay.slice(0, -1);
        }
        if (settings.cycleDuration.includes('m') || settings.cycleDuration.includes('s')) {
            settings.cycleDuration = settings.cycleDuration.slice(0, -1);
        }
    }

    console.log(settings);
    return settings;
}

/**
 * Recreate HTML elements for deleteng eventListeners
 * 
 * @param {Object} el HTML element
 * @param {Boolean} withChildren TRUE if element include children elements
 */
export function recreateNode(el, withChildren) {
    if (withChildren) {
        el.parentNode.replaceChild(el.cloneNode(true), el);
    }
    else {
        var newEl = el.cloneNode(false);
        while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
        el.parentNode.replaceChild(newEl, el);
    }
}

/**
 * Validate pair settings
 * 
 * @param {Oject} form Object contains HTML elements of the settings form
 * {
 *      "name": tenplateName, -> for validating template
        "cycleDuration": value,
        "waitSignal": value,
        "delay": value,
        "price1": value,
        "price2": value,
        "ordersNumber": value,
        "fiboContainer": constainer {}
    }
 * 
 * @returns {Boolean} value of the validation
 */
function validatePairSettings(form) {
    const fiboContainer = form.fiboContainer;

    if (form?.name == '') {
        alert('Назавние темплейта не задано!');
        return false;
    }

    if ((form.cycleDuration == '' || form.cycleDuration < 0) && form.waitSignal == false) {
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

    if (form.skipLevels == '' || form.skipLevels < 0) {
        alert('Неверное количество пропускаемых уровней при достижении цены 2');
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
        pairTemplate.options[1].selected = true;
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
        if (template.cycleType == settings.cycleType)
            if (template.timeframe == settings.timeframe)
                if (template.waitSignal == settings.waitSignal)
                    if (template.cycleDuration == settings.cycleDuration)
                        if (template.delay == settings.delay)
                            if (template.skipPrice == settings.skipPrice)
                                if (template.skipLevels == settings.skipLevels)
                                    if (template.stopPrice == settings.stopPrice)
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