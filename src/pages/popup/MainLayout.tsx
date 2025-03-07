//@ts-nocheck
import { useState, useRef, useEffect } from 'react';

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
  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    // (async () => {
      chrome.storage.local.get("endTime", (data) => {
        if (data.endTime) {
          console.log('data', data);
          setTargetDate(data.endTime);
        }
      });

      chrome.storage.local.get("timeSelect", (data) => {
        if (data.timeSelect) {
          console.log('data', data);
          setTimeSelect(data.timeSelect);
        }
      });
    // })();
  }, [])

  function onTimerStart() {
    const timerTime = Date.now() + timeSelect.value;

    chrome.storage.local.set({ 
			endTime: timerTime,
			timeSelect: timeSelect
		})
			.then(() => {
			console.log("Value is set", timeSelect, timerTime);
		});

		chrome.runtime.sendMessage({
			action: "startTimer",
			options: {
				endTime: timerTime
			}
		});

    setTargetDate(timerTime);
  }

  function onTimerEnd() {
    setTargetDate(null);
    setTimeSelect(defaultTime);
  }

  const volumeInput = useRef(null);

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

  console.log('targetDate', targetDate);

  return (
    <>
      {targetDate ? (
        <TimerOn {...{ targetDate, onTimerEnd }} />
      ) : (
        <TimerOff {...{ times, targetDate, onTimeSelect, onTimerStart, timeSelect, setTimeSelect }} />
      )}
    </>
  );
}
