//@ts-nocheck
import { useState, useRef } from 'react';

import { timer } from '@src/constants/app-consts';

import pomogatoLogo from '@assets/images/pomogato-logo.png';
import startMessageImage from '@assets/images/start-message.png';


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
				<div className="pixel-corners--wrapper" style={{
					margin: '0 auto',
					marginBottom: '0.75rem'
				}}>
					<div className="pixel-corners" style={{
						textAlign: 'center',
						background: 'white',
						fontSize: '24px',
						padding: '6px 12px'
					}}>
						<div>Boop my nose to start</div>
					</div>
				</div>

				<button className="boop-btn" onClick={onStart}>
					<img style={{ width: 88 }} src={pomogatoLogo} alt="Start Timer Image" />
				</button>
			</div>

			<div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '8px',

				marginTop: '0.75rem'
			}}>
				{timer.options.map(time => (
					<button
						className={`pixel-corners-btn--wrapper ${time.id === timeSelect.id ? 'active' : ''}`}
						onClick={() => onTimeSelect(time)}
						style={{
							borderRadius: '8px',
							background: 'white',
						}}
					>
						<div
							className={`pixel-corners-btn ${time.id === timeSelect.id ? 'active' : ''}`}
							style={{
								minWidth: '72px',
								
								textAlign: 'center',
								background: 'white',
								fontSize: '20px',
								padding: '4px 8px'
							}}>
							<div>{time.label}</div>
						</div>
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
