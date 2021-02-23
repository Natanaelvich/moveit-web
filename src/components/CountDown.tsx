import React, { useEffect, useState } from 'react';
import styles from '../styles/CountDown.module.css';

export default function CountDown() {
  const [time, setTime] = useState(25 * 60);
  const [activeCount, setActiveCount] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountDown() {
    setActiveCount(true);
  }

  useEffect(() => {
    if (activeCount && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [activeCount, time]);

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
      <button
        onClick={startCountDown}
        type="button"
        className={styles.startCountDownButton}
      >
        Iniciar um clico
      </button>
    </div>
  );
}
