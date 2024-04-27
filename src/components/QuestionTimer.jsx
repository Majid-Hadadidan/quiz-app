import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  useEffect(() => {
    // console.log("Setting Timeout");
    const timer = setTimeout(onTimeout, timeout);
    return () => {
        // console.log('Clear Timeout')
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    // console.log("Setting Interval");
    const interval = setInterval(
      () => setRemainingTime((prevRemainingTime) => prevRemainingTime - 100),
      100
    );
    return () => {
      // console.log("ClearInterval");
      clearInterval(interval);
    };
  }, []);
  return <progress id="question-time" value={remainingTime} max={timeout} />;
}
