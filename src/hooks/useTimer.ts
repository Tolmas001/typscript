import { useState, useEffect, useCallback } from 'react';

const TIMER_DURATION = 120; // 2 minutes in seconds

interface UseTimerReturn {
  timeRemaining: number;
  isExpired: boolean;
  isUrgent: boolean;
  formattedTime: string;
}

export function useTimer(initialTime: number = TIMER_DURATION): UseTimerReturn {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (isExpired) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isExpired]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    timeRemaining,
    isExpired,
    isUrgent: timeRemaining <= 30 && !isExpired,
    formattedTime: formatTime(timeRemaining),
  };
}