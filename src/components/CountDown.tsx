import React from 'react';
import styles from '../styles/CountDown.module.css';

export default function CountDown() {
  return (
    <div>
      <div className={styles.container}>
        <div>
          <span>2</span>
          <span>5</span>
        </div>
        <span>:</span>
        <div>
          <span>2</span>
          <span>5</span>
        </div>
      </div>
      <button type="button" className={styles.startCountDownButton}>
        Iniciar um clico
      </button>
    </div>
  );
}
