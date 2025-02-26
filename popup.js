const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startTimer");
const stopButton = document.getElementById("stopTimer");

chrome.action.setBadgeText({ text: "" });

document.addEventListener("DOMContentLoaded", () => {
    const volumeSlider = document.getElementById("volume");

    // Load saved volume level
    chrome.storage.local.get(["volume"], (result) => {
        volumeSlider.value = result.volume ?? 0.5; // Default to 50%
    });

    // Save new volume when changed
    volumeSlider.addEventListener("input", () => {
        chrome.storage.local.set({ volume: volumeSlider.value });
    });
});

startButton.addEventListener("click", () => {
    const endTime = Date.now() + 0.1 * 60 * 1000; // 25 minutes from now
    chrome.storage.local.set({ endTime }).then(() => {
        console.log("Value is set", endTime);
      });
    chrome.runtime.sendMessage({ action: "startTimer" });
    updateTimerUI();
});

stopButton.addEventListener("click", () => {
    chrome.storage.local.remove("endTime");
    chrome.runtime.sendMessage({ action: "stopTimer" });
    timerDisplay.textContent = "25:00"; // Reset display
});

// Update the timer UI every second
function updateTimerUI() {
    chrome.storage.local.get("endTime", (data) => {
        if (data.endTime) {
            const interval = setInterval(() => {
                const remaining = Math.max(0, data.endTime - Date.now());
                const minutes = Math.floor(remaining / 60000);
                const seconds = Math.floor((remaining % 60000) / 1000);
                timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

                if (remaining <= 0) {
                    clearInterval(interval);
                    timerDisplay.textContent = "00:00";
                }
            }, 1000);
        }
    });
}

// Load timer on popup open
updateTimerUI();
