//@ts-nocheck
import { useState, useRef } from 'react';

import { clearStoreValues, stopTimer } from '@src/utils';

import pomogatoLogo from '@assets/images/pomogato-logo.png';
import startMessageImage from '@assets/images/start-message.png';

import Timer from './Timer';


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
        gap: '8px',

        marginTop: '0.75rem'
      }}>
        <button
						className="pixel-corners-btn--wrapper"
						onClick={onStop}
						style={{
							borderRadius: '8px',
							background: 'white',
						}}
					>
						<div
							className="pixel-corners-btn"
							style={{
                minWidth: '72px',
                
								textAlign: 'center',
								background: 'white',
								fontSize: '20px',
								padding: '4px 8px'
							}}>
							<div>Stop</div>
						</div>
					</button>
      </div>

      <div>
        <div style={{ marginTop: 27 }}>
          <img style={{ width: 88 }} src={pomogatoLogo} alt="Start Timer Image" />
        </div>
      </div>
    </div>
  );
}