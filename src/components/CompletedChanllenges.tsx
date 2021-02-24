import React from 'react';
import { useChallenge } from '../hooks/modules/ChallengeContext';
import styles from '../styles/CompletedChallenges.module.css';

export default function CompletedChanllenges() {
  const { challengesCompleted } = useChallenge();
  return (
    <div className={styles.container}>
      <span>Desafios completos</span>
      <span> {challengesCompleted} </span>
    </div>
  );
}
