import React, { useEffect, useState } from 'react';
import { useChallenge } from '../hooks/modules/ChallengeContext';
import styles from '../styles/CountDown.module.css';

let countdownTomout: NodeJS.Timeout;

export default function CountDown() {
  const { startNewChallenge } = useChallenge();

  const [time, setTime] = useState(0.1 * 60);
  const [activeCount, setActiveCount] = useState(false);
  const [hasFinshed, setHasFinshed] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountDown() {
    setActiveCount(true);
  }

  function stopCountDown() {
    clearTimeout(countdownTomout);
    setActiveCount(false);
    setTime(0.1 * 60);
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
    <div>
      <div className={styles.container}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinshed ? (
        <button
          disabled
          type="button"
          className={`${styles.countDownButton} ${styles.hasFinished}`}
        >
          Ciclo encerrado
        </button>
      ) : (
        <button
          onClick={activeCount ? stopCountDown : startCountDown}
          type="button"
          className={`${styles.countDownButton} ${
            activeCount
              ? styles.stopCountDownButton
              : styles.startCountDownButton
          }`}
        >
          {activeCount ? 'Abandonar cíclo' : 'Iniciar um clico'}
        </button>
      )}
    </div>
  );
}
