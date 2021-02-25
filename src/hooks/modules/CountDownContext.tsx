import React, { createContext, useState, useContext, useEffect } from 'react';
import { useChallenge } from './ChallengeContext';

let countdownTomout: NodeJS.Timeout;

interface CountDownContextData {
  time: number;
  activeCount: boolean;
  hasFinshed: boolean;
  minutes: number;
  seconds: number;
  startCountDown: () => void;
  stopCountDown: () => void;
}

const CountDownContext = createContext<CountDownContextData>(
  {} as CountDownContextData,
);

const CountDownProvider: React.FC = ({ children }) => {
  const { startNewChallenge } = useChallenge();

  const [time, setTime] = useState(0.1 * 60);
  const [activeCount, setActiveCount] = useState(false);
  const [hasFinshed, setHasFinshed] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountDown() {
    setActiveCount(true);
  }

  function stopCountDown() {
    clearTimeout(countdownTomout);
    setActiveCount(false);
    setTime(0.1 * 60);

    setHasFinshed(false);
  }

  useEffect(() => {
    if (activeCount && time > 0) {
      countdownTomout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (activeCount && time === 0) {
      setHasFinshed(true);
      setActiveCount(false);
      startNewChallenge();
    }
  }, [activeCount, time, startNewChallenge]);
  return (
    <CountDownContext.Provider
      value={{
        time,
        activeCount,
        hasFinshed,
        minutes,
        seconds,
        startCountDown,
        stopCountDown,
      }}
    >
      {children}
    </CountDownContext.Provider>
  );
};

function useCountDown(): CountDownContextData {
  const context = useContext(CountDownContext);

  if (!context) {
    throw new Error('useCountDown must be used within a AuthProvider');
  }

  return context;
}

export { CountDownProvider, useCountDown };
