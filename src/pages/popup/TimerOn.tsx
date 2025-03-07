//@ts-nocheck
import { useState, useRef } from 'react';

import pomogatoLogo from '@assets/images/pomogato-logo.png';
import startMessageImage from '@assets/images/start-message.png';

import Timer from './Timer';

import { clearStoreValues, stopTimer } from './utils';


export default function TimerOn({ 
  targetDate,
  onTimerEnd
}) {
  function onStop() {
    stopTimer();
    clearStoreValues();
    onTimerEnd();
  }

  return (
    <div style={{ marginTop: 40 }}>
      <Timer {...{ targetDate, onTimerEnd }} />

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