import React from 'react';
import { useChallenge } from '../hooks/modules/ChallengeContext';
import styles from '../styles/ExperienceBar.module.css';

export default function ExperienceBar() {
  const { currenteExperience, experienceToNextLevel } = useChallenge();

  const percentToNextLevel =
    Math.round(currenteExperience * 100) / experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currenteExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
