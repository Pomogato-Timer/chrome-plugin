//@ts-nocheck
import { useEffect } from 'react';

import { closeFinishWindow } from '@src/utils';

import finishPawImage from '@assets/images/finish-paw-300x300.png';
import startMessageImage from '@assets/images/start-message.png';
import textCloudBorderImage from '@assets/images/sprit.png';


export default function MainLayout() {
  useEffect(() => {
    let audio = new Audio(chrome.runtime.getURL("src/assets/cat-meow-sound.mp3"));
    audio.volume = 0.3; // Default to 30%
    audio.play();

    setTimeout(() => {
      audio.play();
    }, 1500);
  }, []);

  function onPawClick() {
    closeFinishWindow();
  }

  return (
    <div>
      <div className="pixel-corners--wrapper" style={{ margin: '0 auto' }}>
        <div className="pixel-corners" style={{
          textAlign: 'center',
          background: 'white',
          fontSize: '24px',
          padding: '6px 12px'
        }}>
          <div>You are ameowzing!</div>
          <div>Paws, stretch, and take a break</div>
        </div>
      </div>

      <button style={{ marginTop: 35 }} className="finish-paw-btn" onClick={onPawClick}>
        <img style={{ width: 120 }} src={finishPawImage} className="logo" alt="Start Timer Image" />
      </button>
    </div>
  );
}