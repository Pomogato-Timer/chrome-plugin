//@ts-nocheck
import { useState, useRef, useEffect } from 'react';

import { timer } from '@src/constants/app-consts';

import TimerOff from './TimerOff';
import TimerOn from './TimerOn';

import { 
  startTimer,
  setStoreValues,
  clearStoreValues, 
  removePluginBadge 
} from './utils';


export default function MainLayout() {
  const [timeSelect, setTimeSelect] = useState(timer.defaultTime);
  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    removePluginBadge();

    (async () => {
      const endTimeData = await chrome.storage.local.get('endTime');
      const timeSelectData = await chrome.storage.local.get("timeSelect");
      const storageData = {
        endTime: endTimeData.endTime,
        timeSelect: timeSelectData.timeSelect
      }

      if (storageData.endTime) {
        const isExpired = storageData.endTime < Date.now();

        if (isExpired) clearStoreValues();

        setTargetDate(isExpired ? null : storageData.endTime);
      };

      if (storageData.timeSelect) setTimeSelect(data.timeSelect);
    })();
  }, [])

  function onTimerStart() {
    const timerTime = Date.now() + timeSelect.value;

    setStoreValues(timerTime, timeSelect);
    startTimer(timerTime);
    setTargetDate(timerTime);
  }

  function onTimerEnd() {
    setTargetDate(null);
    // setTimeSelect(timer.defaultTime);
  }

  function onTimeSelect(time) {
    setTimeSelect(time);
  }

  // document.addEventListener("DOMContentLoaded", () => {
  //   const volumeSlider = document.getElementById("volume");

  //   // Load saved volume level
  //   chrome.storage.local.get(["volume"], (result) => {
  //     volumeSlider.value = result.volume ?? 0.5; // Default to 50%
  //   });

  //   // Save new volume when changed
  //   volumeSlider.addEventListener("input", () => {
  //     chrome.storage.local.set({ volume: volumeSlider.value });
  //   });
  // });

  return (
    <>
      {targetDate ? (
        <TimerOn {...{ targetDate, onTimerEnd }} />
      ) : (
        <TimerOff {...{ targetDate, onTimeSelect, onTimerStart, timeSelect, setTimeSelect }} />
      )}
    </>
  );
}