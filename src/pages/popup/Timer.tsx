import { useState, useEffect, useRef } from "react";


export default function Timer({
  targetDate,
  onTimerEnd
}: {
  targetDate: number,
  onTimerEnd: Function
}) {
  const [timeVal, setTimeVal] = useState(calculateTimeLeft(targetDate));
  const intervalRef = useRef<any | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const tempTime = calculateTimeLeft(targetDate);

      setTimeVal(tempTime);

      if (tempTime.expired) {
        clearInterval(intervalRef.current);
        onTimerEnd();
      }
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
    <div style={{ fontSize: 56 }}>{timeVal.mins}:{timeVal.secs}</div>
  );
};