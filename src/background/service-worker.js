import APP_CONSTS from '../constants/app-consts';

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

function handlePluginClick() {
    chrome.action.setBadgeText({ text: "" });

    clearInterval(whiteColorInterval);
    clearInterval(redColorInterval);
    clearTimeout(intervalTimeout);

    whiteColorInterval.value = null;
    redColorInterval.value = null;
    intervalTimeout.value = null;

    //TODO: Add? pomodoroWindowId = null;
};

function handleMessage(message) {
    console.log('options', message);

    const actions = {
        startTimer: () => chrome.alarms.create(APP_CONSTS.alarmName, { when: message.options[APP_CONSTS.storageKeys.endTime] }),
        stopTimer: () => chrome.alarms.clear(APP_CONSTS.alarmName)
    };

    actions[message] && actions[message]();

    console.log('pomodoroWindowId', pomodoroWindowId);

    if (pomodoroWindowId) {
        chrome.windows.remove(pomodoroWindowId);
        pomodoroWindowId = null;
    }
};

function handleTimerAlarm(alarm) {
    if (alarm.name !== alarmName) return;

    console.log('alarm', alarm);
    // Clear stored values
    chrome.storage.local.remove(APP_CONSTS.storageKeys.endTime);
    chrome.storage.local.remove(APP_CONSTS.storageKeys.timeSelect);

    setBadgeBlinkAnimation();

    chrome.windows.create({
        url: "src/pages/finished/index.html",
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
    }, (5 * 60 * 1000));
};
