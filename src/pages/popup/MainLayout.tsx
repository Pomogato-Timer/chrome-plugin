//@ts-nocheck
import { useState, useRef } from 'react';

import TimerOff from './TimerOff';
import TimerOn from './TimerOn';


const times = [
  {
    id: 'default-1',
    label: '25 min',
    value: 25000 * 60
  },
  {
    id: 'default-2',
    label: '45 min',
    value: 45000 * 60
  },
  {
    id: 'default-3',
    label: '1 hr',
    value: 60000 * 60
  }
];

const defaultTime = times[0];

export default function MainLayout() {
  const [timeSelect, setTimeSelect] = useState(defaultTime);
  const [timerStart, setTimerStart] = useState(false);

  const targetDate = new Date().getTime() + timeSelect.value;

  chrome.storage.local.get("endTime", (data) => {
    if (data.endTime) {
      setTimeSelect(timeSelect);
      setTimerStart(true);
    }
  });

  function onTimerStart() {
    setTimerStart(true)
  }

  function onTimerEnd() {
    setTimerStart(false)
  }

  const volumeInput = useRef(null);

  const timerDisplay = document.getElementById("timer");

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

  function onTimeSelect(time) {
    setTimeSelect(time);
  }

  return (
    <>
      {timerStart ? (
        <TimerOn {...{ times, targetDate, onTimerStart, onTimerEnd, timeSelect, setTimeSelect, defaultTime }} />
      ) : (
        <TimerOff {...{ times, targetDate, onTimeSelect, onTimerStart, timeSelect, setTimeSelect, defaultTime }} />
      )}
    </>
  );
}
