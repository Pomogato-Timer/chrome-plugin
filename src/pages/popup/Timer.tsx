import { useState, useEffect, useRef } from "react";

export default function Timer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  function calculateTimeLeft(target) {
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { hrs: '00', mins: '00', secs: '00', expired: true };
    }

    return {
      hrs: String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
      mins: String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
      secs: String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0"),
      expired: false
    };
  }

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, targetDate]);

  // const pauseTimer = () => {
  //   setIsRunning(false);
  //   clearInterval(intervalRef.current);
  // };

  // const resumeTimer = () => {
  //   if (!timeLeft.expired) {
  //     setIsRunning(true);
  //   }
  // };

  // const stopTimer = () => {
  //   setIsRunning(false);
  //   clearInterval(intervalRef.current);
  //   setTimeLeft({ hrs: 0, mins: 0, secs: 0, expired: true });
  // };

  return <div style={{ fontSize: 56 }}>{timeLeft.mins}:{timeLeft.secs}</div>;
};