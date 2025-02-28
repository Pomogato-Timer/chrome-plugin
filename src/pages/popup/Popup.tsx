//@ts-nocheck
import { useState, useRef } from 'react';

import pomogatoLogo from '@assets/images/pomogato-logo.png'
import startMessageImage from '@assets/images/start-message.png'

import Clouds from '../../components/clouds/Clouds';

const defaultTimer = '25:00';

export default function Popup() {
  const [timer, setTimer] = useState(defaultTimer);
  const volumeInput = useRef(null);

  const timerDisplay = document.getElementById("timer");

  chrome.action.setBadgeText({ text: "" });

  console.log(111);
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

  function onStart() {
    const endTime = Date.now() + 0.1 * 60 * 1000; // 25 minutes from now

    chrome.storage.local.set({ endTime }).then(() => {
      console.log("Value is set", endTime);
    });
    chrome.runtime.sendMessage({ action: "startTimer" });

    updateTimerUI();
  }

  function onStop() {
    chrome.storage.local.remove("endTime");
    chrome.runtime.sendMessage({ action: "stopTimer" });
    setTimer(defaultTimer);
  }

  function updateTimerUI() {
    chrome.storage.local.get("endTime", (data) => {
      if (data.endTime) {
        const interval = setInterval(() => {
          const remaining = Math.max(0, data.endTime - Date.now());
          const minutes = Math.floor(remaining / 60000);
          const seconds = Math.floor((remaining % 60000) / 1000);

          let time = `${minutes}:${seconds.toString().padStart(2, "0")}`;

          if (remaining <= 0) {
            clearInterval(interval);
            time = '00:00';
          }

          setTimer(time);
        }, 1000);
      }
    });
  };

  return (
    <main className="main">
      <Clouds />

      <div>
        <div>
          <img style={{ width: 180 }} src={startMessageImage} />
        </div>

        <button style={{ marginTop: -24 }} className="boop-btn" onClick={onStart}>
          <img style={{ width: 88 }} src={pomogatoLogo} className="logo" alt="Start Timer Image" />
        </button>
      </div>

      {/* <div>
        <label>Volume:</label>
        <input ref={volumeInput} type="range" min="0" max="1" step="0.1" />
      </div> */}
    </main>
  );
}
