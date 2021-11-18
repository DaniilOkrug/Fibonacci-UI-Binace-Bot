import * as responses from './responses'; //Only for tests

import { Setting } from './store/settings';
import * as variables from './variables';
import * as requests from './requests';
import { setPairSettings, clearSettings, generateFiboLevels,sendPairNewSettings } from './functionality';


document.addEventListener('DOMContentLoaded', () => {
    const settings = new Setting(responses.pairSettings);
    const newSettings = new Setting(responses.pairSettings);
    //--Initial API states--
    const inputApiKey = document.getElementById('api-key-active');

    // !!!! const initialState = JSON.parse(requests.get("initialStateURL"));
    let initialApiState = responses.initialApiState;
    inputApiKey.innerHTML = initialApiState.apiKey;

    //--Active pairs--
    let activePairsContainer = document.querySelector('div.activePairs ul.list-group');

    // !!!! const acrivePairs = JSON.parse(requests.get("activePairsURL"));
    let activePairs = responses.activePairs;

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

    //--Settings--

    let settingsButtons = document.querySelectorAll("button.settings-orders");
    settingsButtons.forEach(button => {
        button.addEventListener('click', () => {
            // variables.pairSettings = JSON.parse(getRequest(`/symbols?symbol=${button.name}`));
            settings.update = responses.pairSettings;

            const pairTitle = document.querySelector('#pairSettings span.pair');
            pairTitle.innerHTML = settings.current.symbol;
            setPairSettings(settings.current, true);
        });
    });

    //Generate initial list of templates
    const templates = responses.templates;
    const templateContainer = document.querySelector('#pairSettings #pair-template');
    templateContainer.innerHTML = `
        <option value="none">Пустой</option>
        <option value="default">Настройки пары</option>
        `;
    for (let i = 0; i < templates.length; i++) {
        templateContainer.insertAdjacentHTML('beforeend', variables.templateOption(i, templates[i].name));
    }

    //Set template setting to pair
    templateContainer.addEventListener('change', () => {
        const pairTemplate = document.querySelector('#pairSettings #pair-template');

        let activeTemplate = {}
        for (let i = 0; i < templates.length; i++) {
            if (pairTemplate.selectedOptions[0].text == templates[i].name) {
                activeTemplate = templates[i];
                break;
            }
            
        }

        switch(templateContainer.selectedOptions[0].value) {
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
    const waitSignal_checkBox = document.querySelector('#pairSettings #waitSignal');
    const cycleDutarion_input = document.getElementById('cycle-duration');
    waitSignal_checkBox.addEventListener('click', () => {
        if (waitSignal_checkBox.checked) cycleDutarion_input.disabled = true;
        else cycleDutarion_input.disabled = false;
    });

    //Generate orders
    const ordersNumber_input = document.querySelector('#pairSettings #orders-number');
    const chooseOrdersNumber_button = document.querySelector('#pairSettings button.choose-orders-number');
    chooseOrdersNumber_button.addEventListener('click', () => {
        const levelsNumber = ordersNumber_input.value;
        generateFiboLevels(settings.current, levelsNumber);
    });

    //Save button sends new date to the server
    const save_button = document.querySelector('#pairSettings #save');
    save_button.addEventListener('click', () => {
        sendPairNewSettings();
    });
});