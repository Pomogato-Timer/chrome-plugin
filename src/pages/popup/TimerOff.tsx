//@ts-nocheck
import { useState, useRef } from 'react';

import pomogatoLogo from '@assets/images/pomogato-logo.png';
import startMessageImage from '@assets/images/start-message.png';

import { timer } from '@src/constants/app-consts';


export default function TimerOff({
	onTimeSelect,
	onTimerStart,
	timeSelect,
	setTimeSelect,
	defaultTime
}) {
	function onStart() {
		onTimerStart();
	}

	return (
		<div>
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
				{timer.options.map(time => (
					<button
						onClick={() => onTimeSelect(time)}
						style={{
							borderRadius: '8px',
							height: 32,
							width: 64,
							background: 'white',
							border: time.id === timeSelect.id ? '2px solid tomato' : '2px solid black',
							fontSize: '1.25rem',
							// boxShadow: '0px 5px 3px -1px rgba(148,148,148,1)'
							'&:hover': {
								border: '2px solid grey'
							}
						}}
					>
						{time.label}
					</button>
				))}

				{/* <button
					onClick={onTimeSelect}
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
				</button> */}
			</div>

			{/* <div>
        <label>Volume:</label>
        <input ref={volumeInput} type="range" min="0" max="1" step="0.1" />
      </div> */}
		</div>
	);
}
