// import * as responses from './responses'; //Only for tests
import {
    Setting
} from './store/settings';
import {
    Templates
} from './store/templates';
import {
    setPairSettings,
    clearSettings,
    generateFiboLevels,
    sendPairSettings,
    sendNewTemplate,
    setTemplatesList,
    setAvailablePairs,
    setSettingsTemplatesList,
    setNewPairSettings,
    clearNewPairSettings,
    settingsFormatter,
    setListOfTemplates,
    recreateNode
} from './functionality';
import * as variables from './variables';
import * as requests from './requests';

document.addEventListener('DOMContentLoaded', () => {
    let authToken = JSON.parse(requests.post({ "password": "123" }, 'login')).token;
    console.log('authToken:' + authToken);

    const settings = new Setting();
    const templates = new Templates(settingsFormatter(JSON.parse(requests.get('templates', authToken))));

    //Global variables
    const activePairsContainer = document.querySelector('div.activePairs ul.list-group');
    const templatesExistedListContainer = document.querySelector('#templates div.templates-container ul.list-group');
    const activePairs_select = document.querySelector('div.manualTrading #active-pairs');
    const availablePairsContainer = document.querySelector('div.newPair #available-pairs');
    const templateContainer = document.querySelector('div.newPair #pair-template');
    const templateContainer_settings = document.querySelector('#pairSettings #pair-template');

    //--API keys--
    const inputApiKey = document.getElementById('api-key-active');

    const initialApiState = JSON.parse(requests.get('api', authToken));

    inputApiKey.innerHTML = initialApiState.clientId;

    // Connect API
    const connectAPI_button = document.querySelector('#connectAPI #connect');
    connectAPI_button.addEventListener('click', () => {
        const apiKeyInput = document.querySelector('#connectAPI #api-key');
        const apiSecretKeyInput = document.querySelector('#connectAPI #secret-key');

        if (apiKeyInput.value == '' || apiSecretKeyInput.value == '') {
            alert('Ключи не заданы');
            return;
        }

        const requestBody = {
            'clientId': apiKeyInput.value,
            'clientSecret': apiSecretKeyInput.value
        };

        requests.postAuthed(requestBody, 'connectApi', authToken);

        const apiKey = JSON.parse(requests.get('api', authToken)).clientId;
        inputApiKey.innerHTML = apiKey;
    });

    //--Existing templates--
    const templates_button = document.querySelector('ul.navbar-nav #templatesList');
    templates_button.addEventListener('click', () => {
        setListOfTemplates(templatesExistedListContainer, templates.current);

        //Delete template button
        document.querySelectorAll('#templates button.delete-template').forEach((button) => {
            recreateNode(button);
        });

        const deleteTemplate_buttons = document.querySelectorAll('#templates button.delete-template');

        deleteTemplateActions(deleteTemplate_buttons, templatesExistedListContainer, templateContainer_settings, authToken);
    });

    //--Active pairs--

    //Generate initial list of active pairs
    const activePairs = JSON.parse(requests.get('activeSymbols', authToken));

    activePairsContainer.innerHTML = '';
    if (activePairs.length > 0) {
        activePairs.forEach(pair => {
            activePairsContainer.insertAdjacentHTML('beforeend', variables.activePair(pair));
        });
    }

    //Pair cycle state button
    const cycleState_buttons = document.querySelectorAll('div.activePairs button.cycle-state');
    cycleStateButtonsActions(cycleState_buttons);

    //Settings button
    const settings_buttons = document.querySelectorAll("button.settings-orders");
    settingsButtonsActions(settings_buttons);

    //Close order for pair button
    const closeOrders_buttons = document.querySelectorAll('div.activePairs button.close-orders');
    closeOrdersButtonsActions(closeOrders_buttons);

    //Delete the specific pair button
    const deletePair_buttons = document.querySelectorAll('div.activePairs button.delete-pair');
    deleteActivePairActions(activePairsContainer, deletePair_buttons, authToken);

    //--Available Pairs--
    let avalablePairs = JSON.parse(requests.get('availableSymbols', authToken));
    console.log('Availabale pairs: ' + avalablePairs);
    setAvailablePairs(availablePairsContainer, avalablePairs);

    //--Settings--
    //Generate initial list of templates
    setSettingsTemplatesList(templateContainer_settings, templates.current);

    //Set template setting to pair
    templateContainer_settings.addEventListener('change', () => {
        const pairTemplate = document.querySelector('#pairSettings #pair-template');

        let activeTemplate = {}
        for (let i = 0; i < templates.current.length; i++) {
            if (pairTemplate.selectedOptions[0].text == templates.current[i].name) {
                activeTemplate = templates.current[i];
                break;
            }
        }

        switch (templateContainer_settings.selectedOptions[0].value) {
            case 'none':
                clearSettings();
                break;
            case 'default':
                setPairSettings(settings.current);
                break;
            default:
                setPairSettings(activeTemplate);
                break;
        }
    });

    //Wait next signal checkbox
    const waitSignal_ModalCheckBox = document.querySelector('#pairSettings #waitSignal');
    const cycleDutarion_ModalInput = document.querySelector('#pairSettings #cycle-duration');
    waitSignal_ModalCheckBox.addEventListener('click', () => {
        if (waitSignal_ModalCheckBox.checked) cycleDutarion_ModalInput.disabled = true;
        else cycleDutarion_ModalInput.disabled = false;
    });

    //Generate orders
    const ordersNumber_ModalInput = document.querySelector('#pairSettings #orders-number');
    const chooseOrdersNumber_ModalButton = document.querySelector('#pairSettings button.choose-orders-number');
    chooseOrdersNumber_ModalButton.addEventListener('click', () => {
        const levelsNumber = ordersNumber_ModalInput.value;
        const fiboContainer = document.querySelector('#pairSettings div.fibo-container');
        generateFiboLevels(fiboContainer, settings.current, levelsNumber);
    });

    //Save current setting as a template
    const saveTemplate_Modalbutton = document.querySelector('#pairSettings button.saveTemplate');
    saveTemplate_Modalbutton.addEventListener('click', () => {
        const templateName_input = document.querySelector('#pairSettings input.template-name');

        const timeframe_select = document.querySelector('#pairSettings #timeframe');
        const cycleDuration_input = document.querySelector('#pairSettings #cycle-duration');
        const waitSignal_checkBox = document.querySelector('#pairSettings #waitSignal');
        const delay_input = document.querySelector('#pairSettings #cycle-delay');

        const secondAlgorithm_checkBox = document.querySelector('#pairSettings #secondAlgorithm');

        const price1_input = document.querySelector('#pairSettings #price1-fibo');
        const price2_input = document.querySelector('#pairSettings #price2-fibo');
        const price2SkipLevels_input = document.querySelector('#pairSettings #skip-levels');

        const fiboContainer = document.querySelector('#pairSettings div.fibo-container');
        const ordersNumber_input = document.querySelector('#pairSettings #orders-number');

        const requestState = sendNewTemplate({
            "name": templateName_input.value,
            "cycleType": secondAlgorithm_checkBox.checked ? 'Alternative' : 'Normal',
            "timeframe": timeframe_select.selectedOptions[0].text,
            "waitSignal": waitSignal_checkBox.checked,
            "cycleDuration": cycleDuration_input.value, //minutes
            "delay": delay_input.value, //minutes
            "stopPrice": price1_input.value,
            "skipPrice": price2_input.value,
            "skipLevels": price2SkipLevels_input.value,
            "levelCount": ordersNumber_input.value,
            "fiboContainer": fiboContainer
        }, templates.current, 'newTemplate', authToken);

        //Request -> Fail
        if (!requestState) return

        //Request -> Success

        //Get new templates and update lists
        templates.update = settingsFormatter(JSON.parse(requests.get('templates', authToken)));

        setTemplatesList(templateContainer, templates.current);
        setSettingsTemplatesList(templateContainer_settings, templates.current);
    });


    //Save button sends new setings to the server
    const save_button = document.querySelector('#pairSettings #save');
    save_button.addEventListener('click', () => {
        const pairTitle = document.querySelector('#pairSettings span.pair');

        const timeframe_select = document.querySelector('#pairSettings #timeframe');
        const cycleDuration_input = document.querySelector('#pairSettings #cycle-duration');
        const waitSignal_checkBox = document.querySelector('#pairSettings #waitSignal');
        const delay_input = document.querySelector('#pairSettings #cycle-delay');

        const secondAlgorithm_checkBox = document.querySelector('#pairSettings #secondAlgorithm');

        const price1_input = document.querySelector('#pairSettings #price1-fibo');
        const price2_input = document.querySelector('#pairSettings #price2-fibo');
        const price2SkipLevels_input = document.querySelector('#pairSettings #skip-levels');

        const fiboContainer = document.querySelector('#pairSettings div.fibo-container');
        const ordersNumber_input = document.querySelector('#pairSettings #orders-number');

        sendPairSettings({
            "symbol": pairTitle.innerText,
            "template": '',
            "cycleType": secondAlgorithm_checkBox.checked ? 'Alternative' : 'Normal',
            "timeframe": timeframe_select.selectedOptions[0].text,
            "waitSignal": waitSignal_checkBox.checked,
            "cycleDuration": cycleDuration_input.value, //minutes
            "delay": delay_input.value, //minutes
            "stopPrice": price1_input.value,
            "skipPrice": price2_input.value,
            "skipLevels": price2SkipLevels_input.value,
            "levelCount": ordersNumber_input.value,
            "fiboContainer": fiboContainer
        }, templates.current, 'newSymbol', authToken);
    });

    //--Time settings--
    const setTime_button = document.querySelector('div.schedule button.sendTime');
    setTime_button.addEventListener('click', () => {
        const timeFrom_input = document.querySelector('div.schedule input.time-from');
        const timeTo_input = document.querySelector('div.schedule input.time-to');

        if (timeFrom_input.value == '' || timeTo_input.value == '') {
            alert('Время работы скрипта не задано');
            return
        }

        const from = timeFrom_input.value.split(':');
        const to = timeTo_input.value.split(':');

        const fromMinutes = Number(from[0]) * 60 + Number(from[1]);
        const toMinutes = Number(to[0]) * 60 + Number(to[1]);

        console.log('form: ' + fromMinutes);
        console.log('to: ' + toMinutes);

        const requestBody = {
            "from": fromMinutes + 'm',
            "to": toMinutes + 'm'
        };

        requests.postAuthed(requestBody, 'setTime', authToken);
        console.log(requestBody);
        console.log('Send request to /setTime');
    });

    //--Manual trading--
    //Genrerate initial list of pairs
    activePairs_select.innerHTML = '';
    activePairs.forEach((pair) => {
        activePairs_select.insertAdjacentHTML('beforeend', `
            <option value="${pair}">${pair}</option>
        `);
    })

    //Send signal to the server
    const sendSignal_button = document.querySelector('div.manualTrading button.sendSignal');
    sendSignal_button.addEventListener('click', () => {
        const selectedPair = document.querySelector('div.manualTrading #active-pairs');
        const minPrice_input = document.querySelector('div.manualTrading input.minimum-price');
        const maxPrice_input = document.querySelector('div.manualTrading input.maximum-price');
        const signalType = document.querySelector('div.manualTrading #impulseDirection');

        if ((minPrice_input.value == '' || minPrice_input.value < 0) || (maxPrice_input.value == '' || maxPrice_input.value < 0)) {
            alert('Минимальная или максимальная цена заданы неверно')
            return
        }

        const requestBody = {
            "symbol": selectedPair.selectedOptions[0].text,
            "type": signalType.selectedOptions[0].text.toLocaleLowerCase(),
            "minPrice": minPrice_input.value,
            "maxPrice": maxPrice_input.value
        };

        requests.postAuthed(requestBody, 'startCycle', authToken);
        console.log(requestBody);
        console.log('Send request to /startCycle');
    });

    //--New pair--
    //Set templates to templates list
    setTemplatesList(templateContainer, templates.current);

    //Set template setting to pair
    templateContainer.addEventListener('change', () => {
        const pairTemplate = document.querySelector('div.newPair #pair-template');

        let activeTemplate = {}
        for (let i = 0; i < templates.current.length; i++) {
            if (pairTemplate.selectedOptions[0].text == templates.current[i].name) {
                activeTemplate = templates.current[i];
                break;
            }
        }

        switch (templateContainer.selectedOptions[0].value) {
            case 'none':
                clearNewPairSettings();
                break;
            default:
                setNewPairSettings(activeTemplate);
                break;
        }
    });

    //Wait next signal checkbox
    const waitSignal_checkBox = document.querySelector('div.newPair #waitSignal');
    const cycleDutarion_input = document.querySelector('div.newPair #cycle-duration');
    waitSignal_checkBox.addEventListener('click', () => {
        if (waitSignal_checkBox.checked) cycleDutarion_input.disabled = true;
        else cycleDutarion_input.disabled = false;
    });

    //Generate orders
    const ordersNumber_input = document.querySelector('div.newPair #orders-number');
    const chooseOrdersNumber_button = document.querySelector('div.newPair button.choose-orders-number');
    chooseOrdersNumber_button.addEventListener('click', () => {
        const levelsNumber = ordersNumber_input.value;
        const fiboContainer = document.querySelector('div.newPair div.fibo-container');
        generateFiboLevels(fiboContainer, {}, levelsNumber);
    });

    //Save as template button
    const saveTemplate_button = document.querySelector('div.newPair button.saveTemplate');
    saveTemplate_button.addEventListener('click', () => {
        const templateName_input = document.querySelector('div.newPair input.template-name');

        const timeframe_select = document.querySelector('div.newPair #timeframe');
        const cycleDuration_input = document.querySelector('div.newPair #cycle-duration');
        const waitSignal_checkBox = document.querySelector('div.newPair #waitSignal');
        const delay_input = document.querySelector('div.newPair #cycle-delay');

        const secondAlgorithm_checkBox = document.querySelector('div.newPair #secondAlgorithm');

        const price1_input = document.querySelector('div.newPair #price1-fibo');
        const price2_input = document.querySelector('div.newPair #price2-fibo');
        const price2SkipLevels_input = document.querySelector('div.newPair #skip-levels');

        const fiboContainer = document.querySelector('div.newPair div.fibo-container');
        const ordersNumber_input = document.querySelector('div.newPair  #orders-number');

        sendNewTemplate({
            "name": templateName_input.value,
            "cycleType": secondAlgorithm_checkBox.checked ? 'Alternative' : 'Normal',
            "timeframe": timeframe_select.selectedOptions[0].text,
            "waitSignal": waitSignal_checkBox.checked,
            "cycleDuration": cycleDuration_input.value, //minutes
            "delay": delay_input.value, //minutes
            "stopPrice": price1_input.value,
            "skipPrice": price2_input.value,
            "skipLevels": price2SkipLevels_input.value,
            "levelCount": ordersNumber_input.value,
            "fiboContainer": fiboContainer
        }, templates.current, 'newTemplate', authToken);


        //Get new templates and update lists
        templates.update = settingsFormatter(JSON.parse(requests.get('templates', authToken)));

        setTemplatesList(templateContainer, templates.current);
        setSettingsTemplatesList(templateContainer_settings, templates.current);
    });

    //Add new pair button
    const addNewPair_button = document.querySelector('div.newPair #addNewPair');
    addNewPair_button.addEventListener('click', () => {
        const pairTitle = document.querySelector('div.newPair #available-pairs');

        const timeframe_select = document.querySelector('div.newPair #timeframe');
        const cycleDuration_input = document.querySelector('div.newPair #cycle-duration');
        const waitSignal_checkBox = document.querySelector('div.newPair #waitSignal');
        const delay_input = document.querySelector('div.newPair #cycle-delay');

        const secondAlgorithm_checkBox = document.querySelector('div.newPair #secondAlgorithm');

        const price1_input = document.querySelector('div.newPair #price1-fibo');
        const price2_input = document.querySelector('div.newPair #price2-fibo');
        const price2SkipLevels_input = document.querySelector('div.newPair #skip-levels');

        const fiboContainer = document.querySelector('div.newPair div.fibo-container');
        const ordersNumber_input = document.querySelector('div.newPair #orders-number');

        const requestSuccess = sendPairSettings({
            "symbol": pairTitle.selectedOptions[0].text,
            "template": '',
            "cycleType": secondAlgorithm_checkBox.checked ? 'Alternative' : 'Normal',
            "timeframe": timeframe_select.selectedOptions[0].text,
            "waitSignal": waitSignal_checkBox.checked,
            "cycleDuration": cycleDuration_input.value == '' ? 0 : cycleDuration_input.value, //minutes
            "delay": delay_input.value == '' ? 0 : delay_input.value, //minutes
            "stopPrice": price1_input.value,
            "skipPrice": price2_input.value,
            "skipLevels": price2SkipLevels_input.value,
            "levelCount": ordersNumber_input.value,
            "fiboContainer": fiboContainer
        }, templates.current, 'newSymbol', authToken);

        requestSuccess.then(() => {
            //Generate new list of active pairs
            const activePairs = JSON.parse(requests.get('activeSymbols', authToken));
            console.log(activePairs);

            activePairsContainer.innerHTML = '';
            if (activePairs.length > 0) {
                activePairs.forEach(pair => {
                    activePairsContainer.insertAdjacentHTML('beforeend', variables.activePair(pair));
                });
            }

            setActionsToPairsWithSettings();

            const newCloseOrder_buttons = activePairsContainer.querySelectorAll('button.delete-pair');
            deleteActivePairActions(activePairsContainer, newCloseOrder_buttons, authToken);


            activePairs_select.innerHTML = '';
            activePairs.forEach((pair) => {
                activePairs_select.insertAdjacentHTML('beforeend', `
                    <option value="${pair}">${pair}</option>
                `);
            })

            //Generate new list of available pairs for new pair adding
            let avalablePairs = JSON.parse(requests.get('availableSymbols', authToken));
            setAvailablePairs(availablePairsContainer, avalablePairs);
        })
    });


    //--Close all orders
    const closeAllOrders_button = document.querySelector('div.actions #close-orders-all');
    closeAllOrders_button.addEventListener('click', () => {
        const result = confirm('Вы уверены, что хотите закрыть все сделки?');

        if (result) {
            requests.get('closeAllOrders', authToken);
        }
    });

    function cycleStateButtonsActions(buttons) {
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                button.classList.toggle('active');

                button.classList.toggle('btn-dark');
                button.classList.toggle('btn-success');

                if (button.classList.contains('active')) {
                    button.innerHTML = 'Работает';
                    requests.postAuthed({ "symbol": button.name }, 'pauseCycle', authToken);
                } else {
                    requests.postAuthed({ "symbol": button.name }, 'pauseCycle', authToken);
                    button.innerHTML = 'Остановлено';
                }
            });
        });
    }

    function settingsButtonsActions(buttons) {
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                settings.update = settingsFormatter(JSON.parse(requests.get(`symbols?symbol=${button.name}`, authToken)));
                const pairTitle = document.querySelector('#pairSettings span.pair');
                pairTitle.innerHTML = settings.current.symbol;
                setPairSettings(settings.current, true);
            });
        });
    }

    function closeOrdersButtonsActions(buttons) {
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const result = confirm('Закрыть ордера?');

                if (!result) return;

                requests.postAuthed({ "symbol": button.name }, 'stopCycle', authToken);
            });
        });
    }

    function deleteActivePairActions(activePairsContainer, buttons, authToken) {
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const result = confirm('Вы уверены, что хотите удалить пару?');
                if (!result) return

                requests.postAuthed({ "symbol": button.name }, 'deleteSymbol', authToken)
                const activePairs = JSON.parse(requests.get('activeSymbols', authToken));

                //Generate new list of active pairs
                activePairsContainer.innerHTML = '';
                if (activePairs.length > 0) {
                    activePairs.forEach(pair => {
                        activePairsContainer.insertAdjacentHTML('beforeend', variables.activePair(pair));
                    });
                }

                //Set new click event listeners to buttons
                setActionsToPairsWithSettings();

                const newCloseOrder_buttons = activePairsContainer.querySelectorAll('button.delete-pair');
                deleteActivePairActions(activePairsContainer, newCloseOrder_buttons, authToken);

                //Generate new list of active pairs for manual trading
                const activePairs_select = document.querySelector('div.manualTrading #active-pairs');
                activePairs_select.innerHTML = '';
                activePairs.forEach((pair) => {
                    activePairs_select.insertAdjacentHTML('beforeend', `
                        <option value="${pair}">${pair}</option>
                    `);
                });

                //Generate new list for available pairs
                let avalablePairs = JSON.parse(requests.get('availableSymbols', authToken));
                setAvailablePairs(availablePairsContainer, avalablePairs);
            });
        });
    }

    function setActionsToPairsWithSettings() {
        const cycleState_buttonsNew = document.querySelectorAll('div.activePairs button.cycle-state');
        const settings_buttonsNew = document.querySelectorAll('button.settings-orders');
        const closeOrders_buttonsNew = document.querySelectorAll('div.activePairs button.close-orders');

        cycleStateButtonsActions(cycleState_buttonsNew);
        settingsButtonsActions(settings_buttonsNew);
        closeOrdersButtonsActions(closeOrders_buttonsNew);
    }

    function deleteTemplateActions(buttons, templatesExistedListContainer, templateContainer_settings) {
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const requestBody = { "templateName": button.name };
                requests.postAuthed(requestBody, 'deleteTemplate', authToken);

                templates.update = settingsFormatter(JSON.parse(requests.get('templates', authToken)));
                setListOfTemplates(templatesExistedListContainer, templates.current);
                setTemplatesList(templateContainer, templates.current);
                setSettingsTemplatesList(templateContainer_settings, templates.current);

                const newButtons = document.querySelectorAll('#templates button.delete-template');
                deleteTemplateActions(newButtons, templatesExistedListContainer, templateContainer_settings, authToken);
            });
        });
    }
});