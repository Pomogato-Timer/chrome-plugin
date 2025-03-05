let pomodoroWindowId = null;

chrome.runtime.onMessage.addListener((message) => {
    console.log('options', message);
    
    if (message.action === "startTimer") {
        chrome.alarms.create("pomodoroTimer", { when: message.options.endTime });
    } else if (message.action === "stopTimer") {
        chrome.alarms.clear("pomodoroTimer");
    }

    console.log('pomodoroWindowId', pomodoroWindowId);
    
    if (pomodoroWindowId) {
        chrome.windows.remove(pomodoroWindowId);
        pomodoroWindowId = null; // Reset stored ID
    }
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "pomodoroTimer") {
        console.log('alarm', alarm);
        chrome.storage.local.remove("endTime"); // Clear stored time

        // Try opening the extension popup (this requires user interaction first)
        // chrome.action.openPopup().catch(() => {
            // If popup cannot be opened, show a badge

            //TODO: clear after few sec
            chrome.action.setBadgeText({ text: "Done" });
            chrome.action.setBadgeBackgroundColor({ color: "#FF4500" });

            const aInterval = setInterval(() => {
                chrome.action.setBadgeBackgroundColor({ color: "#FFF" });
            }, 1000);

            const bInterval = setInterval(() => {
                chrome.action.setBadgeBackgroundColor({ color: "#FF4500" });
            }, 2000);

            //TODO: also clear timeouts after clicking on the plugin
            setTimeout(() => {
                clearInterval(aInterval);
                clearInterval(bInterval);

                chrome.action.setBadgeBackgroundColor({ color: "#FFF" });
            }, 10000);

            // Open a fallback window
            chrome.windows.create({
                url: "src/pages/finished/index.html",
                type: "popup",
                width: 400,
                height: 300
            }, (window) => {
                pomodoroWindowId = window.id; // Store the window ID
            });
        // });
    }
});


