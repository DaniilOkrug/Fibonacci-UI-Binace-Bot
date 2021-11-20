import * as responses from './responses'; //Only for tests

import { Setting } from './store/settings';
import { Templates } from './store/templates';
import {
    setPairSettings, clearSettings, generateFiboLevels, sendPairSettings,
    sendNewTemplate, setTemplatesList, setAvailablePairs, setSettingsTemplatesList, setNewPairSettings, clearNewPairSettings
} from './functionality';
import * as variables from './variables';
import * as requests from './requests';

document.addEventListener('DOMContentLoaded', () => {
    const settings = new Setting();
    const templates = new Templates(responses.templates);

    //Global variables
    let activePairsContainer = document.querySelector('div.activePairs ul.list-group');
    const availablePairsContainer = document.querySelector('div.newPair #available-pairs');
    const templateContainer = document.querySelector('div.newPair #pair-template');
    const templateContainer_settings = document.querySelector('#pairSettings #pair-template');

    //--API keys--
    const inputApiKey = document.getElementById('api-key-active');

    // !!!! const initialState = JSON.parse(requests.get("initialStateURL"));
    let initialApiState = responses.initialApiState;
    inputApiKey.innerHTML = initialApiState.apiKey;

    //Connect API
    const connectAPI_button = document.querySelector('#connectAPI #connect');
    connectAPI_button.addEventListener('click', () => {
        const apiKeyInput = document.querySelector('#connectAPI #api-key');
        const apiSecretKeyInput = document.querySelector('#connectAPI #secret-key');

        if (apiKeyInput.value == '' || apiSecretKeyInput.value == '') {
            alert('Ключи не заданы');
            return;
        }

        const requestBody = {
            'key': apiKeyInput.value,
            'secret': apiSecretKeyInput.value
        };

        requests.post(requestBody, 'connectApi');

        const apiKey = JSON.parse(requests.get('api'));
    });
    //--Active pairs--

    // !!!! const acrivePairs = JSON.parse(requests.get("activePairs"));
    let activePairs = responses.activePairs;

    activePairsContainer.innerHTML = '';
    if (activePairs.length > 0) {
        activePairs.forEach(pair => {
            activePairsContainer.insertAdjacentHTML('beforeend', variables.activePair(pair.symbol));
        });
    }

    const closeOrders_buttons = document.querySelectorAll('div.activePairs button.close-orders');
    closeOrders_buttons.forEach((button) => {
        button.addEventListener('click', () => {
            console.log(`Request to closeOrders?symbol=${button.name}`);

            // !!!! const activePairs = JSON.parse(requests.get(`closeOrders?symbol=${button.name}`));
            let activePairs = responses.activePairsNew;
            activePairsContainer.innerHTML = '';
            if (activePairs.length > 0) {
                activePairs.forEach(pair => {
                    activePairsContainer.insertAdjacentHTML('beforeend', variables.activePair(pair.symbol));
                });
            }
        });
    })

    //--Available Pairs--
    // let avalablePairs = JSON.parse(requests.get('avalablePairs'));
    let avalablePairs = responses.avalablePairs;

    setAvailablePairs(availablePairsContainer, avalablePairs);

    //--Settings--
    let settingsButtons = document.querySelectorAll("button.settings-orders");
    settingsButtons.forEach(button => {
        button.addEventListener('click', () => {
            // variables.pairSettings = JSON.parse(requests.get(`settings?symbol=${button.name}`));
            settings.update = responses.pairSettings;

            const pairTitle = document.querySelector('#pairSettings span.pair');
            pairTitle.innerHTML = settings.current.symbol;
            setPairSettings(settings.current, true);
        });
    });

    //Generate initial list of templates
    setTemplatesList(templateContainer_settings, templates.current);

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
        // const pairSettings = JSON.parse(getRequest(`settings?symbol=${button.name}`));
        settings.update = responses.pairSettings;
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

    //Save current setting in the template
    const saveTemplate_Modalbutton = document.querySelector('#pairSettings button.saveTemplate');
    saveTemplate_Modalbutton.addEventListener('click', () => {
        const templateName_input = document.querySelector('#pairSettings input.template-name');

        const cycleDuration_input = document.querySelector('#pairSettings #cycle-duration');
        const waitSignal_checkBox = document.querySelector('#pairSettings #waitSignal');
        const delay_input = document.querySelector('#pairSettings #cycle-delay');

        const price1_input = document.querySelector('#pairSettings #price1-fibo');
        const price2_input = document.querySelector('#pairSettings #price2-fibo');

        const fiboContainer = document.querySelector('#pairSettings div.fibo-container');
        const ordersNumber_input = document.querySelector('#pairSettings #orders-number');

        const requestState = sendNewTemplate({
            "name": templateName_input.value,
            "waitSignal": waitSignal_checkBox.checked,
            "cycleDuration": cycleDuration_input.value, //minutes
            "delay": delay_input.value, //minutes
            "price1": price1_input.value,
            "price2": price2_input.value,
            "levelCount": ordersNumber_input.value,
            "fiboContainer": fiboContainer
        }, templates.current, 'newTemplate')

        //Request -> Fail
        if (!requestState) return

        //Request -> Success

        //Get new templates and update lists
        // templates.current = JSON.parse(requests.get('templates'));
        templates.update = responses.templates;

        setSettingsTemplatesList(templateContainer, templates.current);
        setTemplatesList(templateContainer_settings, templates.current);
    });


    //Save button sends new seetings to the server
    const save_button = document.querySelector('#pairSettings #save');
    save_button.addEventListener('click', () => {
        const pairTitle = document.querySelector('#pairSettings span.pair');
        const cycleDuration_input = document.querySelector('#pairSettings #cycle-duration');
        const waitSignal_checkBox = document.querySelector('#pairSettings #waitSignal');
        const delay_input = document.querySelector('#pairSettings #cycle-delay');

        const price1_input = document.querySelector('#pairSettings #price1-fibo');
        const price2_input = document.querySelector('#pairSettings #price2-fibo');

        const fiboContainer = document.querySelector('#pairSettings div.fibo-container');
        const ordersNumber_input = document.querySelector('#pairSettings #orders-number');

        sendPairSettings({
            "symbol": pairTitle.innerText,
            "template": '',
            "waitSignal": waitSignal_checkBox.checked,
            "cycleDuration": cycleDuration_input.value, //minutes
            "delay": delay_input.value, //minutes
            "price1": price1_input.value,
            "price2": price2_input.value,
            "levelCount": ordersNumber_input.value,
            "fiboContainer": fiboContainer
        }, templates.current, 'settingsUpdate');
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

    const saveTemplate_button = document.querySelector('div.newPair button.saveTemplate');
    saveTemplate_button.addEventListener('click', () => {
        const templateName_input = document.querySelector('div.newPair input.template-name');

        const cycleDuration_input = document.querySelector('div.newPair #cycle-duration');
        const waitSignal_checkBox = document.querySelector('div.newPair #waitSignal');
        const delay_input = document.querySelector('div.newPair #cycle-delay');

        const price1_input = document.querySelector('div.newPair #price1-fibo');
        const price2_input = document.querySelector('div.newPair #price2-fibo');

        const fiboContainer = document.querySelector('div.newPair div.fibo-container');
        const ordersNumber_input = document.querySelector('div.newPair #orders-number');

        const requestState = sendNewTemplate({
            "name": templateName_input.value,
            "waitSignal": waitSignal_checkBox.checked,
            "cycleDuration": cycleDuration_input.value, //minutes
            "delay": delay_input.value, //minutes
            "price1": price1_input.value,
            "price2": price2_input.value,
            "levelCount": ordersNumber_input.value,
            "fiboContainer": fiboContainer
        }, templates.current, 'newTemplate')

        //Request -> Fail
        if (!requestState) return

        //Request -> Success

        //Get new templates and update lists
        // templates.current = JSON.parse(requests.get('templates'));
        templates.update = responses.templates;

        setTemplatesList(templateContainer, templates.current);
        setTemplatesList(templateContainer_settings, templates.current);
    });

    //Add new pair button
    const addNewPair_button = document.querySelector('div.newPair #addNewPair');
    addNewPair_button.addEventListener('click', () => {
        const pairTitle = document.querySelector('div.newPair #available-pairs');
        const cycleDuration_input = document.querySelector('div.newPair #cycle-duration');
        const waitSignal_checkBox = document.querySelector('div.newPair #waitSignal');
        const delay_input = document.querySelector('div.newPair #cycle-delay');

        const price1_input = document.querySelector('div.newPair #price1-fibo');
        const price2_input = document.querySelector('div.newPair #price2-fibo');

        const fiboContainer = document.querySelector('div.newPair div.fibo-container');
        const ordersNumber_input = document.querySelector('div.newPair #orders-number');

        const requestState = sendPairSettings({
            "symbol": pairTitle.selectedOptions[0].text,
            "template": '',
            "waitSignal": waitSignal_checkBox.checked,
            "cycleDuration": cycleDuration_input.value, //minutes
            "delay": delay_input.value, //minutes
            "price1": price1_input.value,
            "price2": price2_input.value,
            "levelCount": ordersNumber_input.value,
            "fiboContainer": fiboContainer
        }, templates.current, 'newPair');

        if (!requestState) return;

        // let avalablePairs = JSON.parse(requests.get('avalablePairs'));
        avalablePairs = responses.avalablePairsNew;
        setAvailablePairs(availablePairsContainer, avalablePairs);
    });


    //--Close all orders
    const closeAllOrders_button = document.querySelector('div.actions #close-orders-all');
    closeAllOrders_button.addEventListener('click', () => {
        const result = confirm('Вы уверены, что хотите закрыть все сделки?');

        if (result) {
            requests.get('closeAll');
        }
    });
});