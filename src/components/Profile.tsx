import React from 'react';
import { useChallenge } from '../hooks/modules/ChallengeContext';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  const { level } = useChallenge();

  return (
    <div className={styles.container}>
      <img src="https://github.com/natanaelvich.png" alt="" />

      <div>
        <strong>Natanael da Silva Lima</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          level {level}
        </p>
      </div>
    </div>
  );
}
