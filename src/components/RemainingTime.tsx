import { useState, useEffect } from 'react';

interface RemainingTime {
  hours: number;
  minutes: number;
  seconds: number;
}

function RemainingTime() {
  const [remainingTime, setRemainingTime] = useState<RemainingTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const getRemainingTimeUntilEndOfDay = (): RemainingTime => {
    const now: Date = new Date();
    const endOfDay: Date = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const timeDifference: number = endOfDay.getTime() - now.getTime();

    const remainingHours: number = Math.floor(
      timeDifference / (1000 * 60 * 60),
    );
    const remainingMinutes: number = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const remainingSeconds: number = Math.floor(
      (timeDifference % (1000 * 60)) / 1000,
    );

    return {
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    };
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRemainingTime = getRemainingTimeUntilEndOfDay();
      setRemainingTime(newRemainingTime);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  if (
    remainingTime.hours !== 0 &&
    remainingTime.minutes !== 0 &&
    remainingTime.seconds !== 0
  ) {
    return (
      <>
        {`${remainingTime.hours}:${remainingTime.minutes}:${remainingTime.seconds}`}
      </>
    );
  } else {
    return <></>;
  }
}

export default RemainingTime;
