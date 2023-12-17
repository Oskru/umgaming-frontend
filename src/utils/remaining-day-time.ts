interface RemainingTime {
  hours: number;
  minutes: number;
  seconds: number;
}

function getRemainingTimeUntilEndOfDay(): RemainingTime {
  // Get the current date and time
  const now: Date = new Date();

  // Set the time to the end of the day (23:59:59)
  const endOfDay: Date = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // Calculate the time difference in milliseconds
  const timeDifference: number = endOfDay.getTime() - now.getTime();

  // Calculate remaining hours, minutes, and seconds
  const remainingHours: number = Math.floor(timeDifference / (1000 * 60 * 60));
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
}
// Example usage:
