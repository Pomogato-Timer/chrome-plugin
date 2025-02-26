let audio = new Audio(chrome.runtime.getURL("alarm.mp3"));
audio.volume = 0.5; // Default to 50%
audio.play();