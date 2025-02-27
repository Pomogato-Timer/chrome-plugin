//@ts-nocheck
import React from 'react';
import logo from '@assets/img/logo.svg';

export default function Finished() {
  let audio = new Audio(chrome.runtime.getURL("src/assets/alarm.mp3"));
  audio.volume = 0.5; // Default to 50%
  audio.play();

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-800">
      <h1>Time's Up!</h1>
      <p>Take a break before the next session.</p>
    </div>
  );
}
