import React from 'react';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  return (
    <div className={styles.container}>
      <img src="https://github.com/natanaelvich.png" alt="" />

      <div>
        <strong>Natanael da Silva Lima</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          level 1
        </p>
      </div>
    </div>
  );
}
