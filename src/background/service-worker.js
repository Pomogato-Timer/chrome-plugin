import { general, storageKeys } from '../constants/app-consts';

import { clearStoreValues, removePluginBadge } from '../utils';


let pomodoroWindowId = null;

let whiteColorInterval = {
    value: null,
    delay: 1000
};

let redColorInterval = {
    value: null,
    delay: 2000
};

let intervalTimeout = {
    value: null,
    delay: 5 * 60000 //5min
};

chrome.action.onClicked.addListener(handlePluginClick);
chrome.runtime.onMessage.addListener(handleMessage);
chrome.alarms.onAlarm.addListener(handleTimerAlarm);


function closeFinishWindow() {
    if (!pomodoroWindowId) return;

    chrome.windows.remove(pomodoroWindowId).catch(e => { });
    pomodoroWindowId = null;
}

function handlePluginClick() {
    removePluginBadge();

    clearInterval(whiteColorInterval);
    clearInterval(redColorInterval);
    clearTimeout(intervalTimeout);

    whiteColorInterval.value = null;
    redColorInterval.value = null;
    intervalTimeout.value = null;
};

function handleMessage(message) {
    const actions = {
        startTimer: () => {
            chrome.alarms.create(general.alarmName, { when: message.options[storageKeys.endTime] });
            closeFinishWindow();
            handlePluginClick();
        },
        stopTimer: () => chrome.alarms.clear(general.alarmName),
        closeFinishWindow: () => {
            closeFinishWindow();
            handlePluginClick();
        },
    };

    actions[message.action] && actions[message.action]();
};

function handleTimerAlarm(alarm) {
    if (alarm.name !== general.alarmName) return;

    clearStoreValues();
    setBadgeBlinkAnimation();

    chrome.windows.create({
        url: general.finishedFileLocation,
        type: "popup",
        width: 400,
        height: 300
    }, (window) => {
        pomodoroWindowId = window.id;
    });
};

function setBadgeBlinkAnimation() {
    chrome.action.setBadgeText({ text: "Done" });
    chrome.action.setBadgeBackgroundColor({ color: "#FF4500" });

    whiteColorInterval.value = setInterval(() => {
        chrome.action.setBadgeBackgroundColor({ color: "#FFF" });
    }, whiteColorInterval.delay);

    redColorInterval.value = setInterval(() => {
        chrome.action.setBadgeBackgroundColor({ color: "#FF4500" });
    }, redColorInterval.delay);

    intervalTimeout.value = setTimeout(() => {
        clearInterval(whiteColorInterval);
        clearInterval(redColorInterval);

        chrome.action.setBadgeBackgroundColor({ color: "#FFF" });
    }, intervalTimeout.delay);
};