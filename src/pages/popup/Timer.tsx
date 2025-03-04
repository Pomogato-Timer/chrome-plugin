import { useState, useEffect } from "react";

export default function Timer({ seconds = 10 }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [prevTimestamp, setPrevTimestamp] = useState(null);

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop when reaching 0

    const tick = (timestamp: number) => {
      if (!prevTimestamp) {
        setPrevTimestamp(timestamp);
      } else {
        const deltaTime = (timestamp - prevTimestamp) / 1000; // Convert ms to s
        setPrevTimestamp(timestamp);
        setTimeLeft((prev) => Math.max(prev - deltaTime, 0));
      }
      requestAnimationFrame(tick);
    };

    const requestId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestId);
  }, [timeLeft, prevTimestamp]);

  const formatTime = (totalSeconds: number) => {
    // const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(Math.floor(totalSeconds % 60)).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return <div style={{ fontSize: 56 }}>{formatTime(timeLeft)}</div>;
};