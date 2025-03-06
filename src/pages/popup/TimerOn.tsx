//@ts-nocheck
import { useState, useRef } from 'react';

import pomogatoLogo from '@assets/images/pomogato-logo.png';
import startMessageImage from '@assets/images/start-message.png';

import Timer from './Timer';

const seconds = 30000;

export default function TimerOn({ timeSelect, targetDate, defaultTime, onTimerEnd }) {
  const timerDisplay = document.getElementById("timer");

  function onStop() {
    chrome.storage.local.remove("endTime");
    chrome.runtime.sendMessage({ action: "stopTimer" });

    setTimeSelect(defaultTime);
    onTimerEnd();
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

    //       setTimeSelect(time);
    //     }, 1000);
    //   }
    // });
  };

  return (
    <div style={{ marginTop: 40 }}>
      <Timer {...{ targetDate }} />

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',

        marginTop: '0.5rem'
      }}>
        <button
          onClick={onStop}
          style={{
            borderRadius: '8px',
            height: 32,
            width: 64,
            background: 'white',
            border: '2px solid black',
            fontSize: '1.25rem',
            // boxShadow: '0px 5px 3px -1px rgba(148,148,148,1)'
            '&:hover': {
              border: '2px solid grey'
            }
          }}
        >
          Stop
        </button>
      </div>

      <div>
        {/* <div>
          <img style={{ width: 180 }} src={startMessageImage} />
        </div> */}

        <div style={{ marginTop: 35 }} className="boop-btn">
          <img style={{ width: 88 }} src={pomogatoLogo} className="logo" alt="Start Timer Image" />
        </div>
      </div>
    </div>
  );
}
