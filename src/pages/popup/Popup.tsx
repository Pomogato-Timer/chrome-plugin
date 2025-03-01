//@ts-nocheck
import { useState, useRef } from 'react';

import pomogatoLogo from '@assets/images/pomogato-logo.png'
import startMessageImage from '@assets/images/start-message.png'

import Clouds from './components/clouds/Clouds';

const times = [
  {
    id: 'default-1',
    label: '25 min',
    value: 25000
  },
  {
    id: 'default-2',
    label: '25 min',
    value: 45000
  }
];

const defaultTime = times[0];

export default function Popup() {
  const [timerTime, setTimerTime] = useState(defaultTime);

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
    setTimerTime(defaultTime);
  }

  function onSetTimerTime() {
    
  }

  function updateTimerUI() {
    // chrome.storage.local.get("endTime", (data) => {
    //   if (data.endTime) {
    //     const interval = setInterval(() => {
    //       const remaining = Math.max(0, data.endTime - Date.now());
    //       const minutes = Math.floor(remaining / 60000);
    //       const seconds = Math.floor((remaining % 60000) / 1000);

    //       let time = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    //       if (remaining <= 0) {
    //         clearInterval(interval);
    //         time = '00:00';
    //       }

    //       setTimerTime(time);
    //     }, 1000);
    //   }
    // });
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

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',

        marginTop: '0.5rem'
      }}>
        <button
          onClick={onSetTimerTime}
          style={{
            borderRadius: '8px',
            height: 32,
            width: 64,
            background: 'white',
            border: '2px solid black',
            fontWeight: 'bold',
            // boxShadow: '0px 5px 3px -1px rgba(148,148,148,1)'
          }}
        >
          25 min
        </button>

        <button
          onClick={onSetTimerTime}
          style={{
            borderRadius: '8px',
            height: 32,
            width: 64,
            background: 'white',
            border: '2px solid black',
            fontWeight: 'bold',
            // boxShadow: '0px 5px 3px -1px rgba(148,148,148,1)'
          }}
        >
          45 min
        </button>

        <button
          onClick={onSetTimerTime}
          style={{
            borderRadius: '8px',
            height: 32,
            width: 64,
            background: 'white',
            border: '2px solid black',
            fontWeight: 'bold',
            // boxShadow: '0px 5px 3px -1px rgba(148,148,148,1)'
          }}
        >
          ✏️ min
        </button>
      </div>

      {/* <div>
        <label>Volume:</label>
        <input ref={volumeInput} type="range" min="0" max="1" step="0.1" />
      </div> */}
    </main>
  );
}
