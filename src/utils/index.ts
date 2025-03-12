import { storageKeys, actions } from '@src/constants/app-consts';


export function setStoreValues(endTime: number, timeSelect: object) {
    chrome.storage.local.set({
        endTime, 
        timeSelect
    });
};

export function clearStoreValues() {
    chrome.storage.local.remove(storageKeys.endTime);
    // chrome.storage.local.remove(storageKeys.timeSelect);
};

export function startTimer(endTime: number) {
    chrome.runtime.sendMessage({
        action: actions.startTimer,
        options: {
            endTime
        }
    });
};

export function stopTimer() {
    chrome.runtime.sendMessage({ action: actions.stopTimer });
};

export function closeFinishWindow() {
    chrome.runtime.sendMessage({ action: actions.closeFinishWindow });
};

export function removePluginBadge() {
    chrome.action.setBadgeText({ text: "" });
};