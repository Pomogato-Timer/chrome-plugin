import { useState, useEffect, useRef } from "react";

export default function Timer({ targetDate }: { targetDate: number }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  const intervalRef = useRef<any | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const tempTime = calculateTimeLeft(targetDate);

      setTimeLeft(tempTime);

      tempTime.expired && clearInterval(intervalRef.current);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [targetDate]);

  function calculateTimeLeft(target: number) {
    const diff = target - Date.now();

    if (diff <= 0) {
      return {
        hrs: '00',
        mins: '00',
        secs: '00',
        expired: true
      };
    }

    return {
      hrs: String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
      mins: String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
      secs: String(Math.ceil((diff % (1000 * 60)) / 1000)).padStart(2, "0"),
      expired: false
    };
  }

  return (
    <div style={{ fontSize: 56 }}>{timeLeft.mins}:{timeLeft.secs}</div>
  );
};