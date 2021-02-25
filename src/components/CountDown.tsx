import React from 'react';
import { useCountDown } from '../hooks/modules/CountDownContext';
import styles from '../styles/CountDown.module.css';

export default function CountDown() {
  const {
    minutes,
    seconds,
    activeCount,
    stopCountDown,
    startCountDown,
    hasFinshed,
  } = useCountDown();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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
