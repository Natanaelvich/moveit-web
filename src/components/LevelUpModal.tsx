import React from 'react';
import { useChallenge } from '../hooks/modules/ChallengeContext';
import styles from '../styles/LevelUpModal.module.css';

export default function LevelUpModal() {
  const { level, closeModalLevelUp } = useChallenge();

  return (
    <div className={styles.overLay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button onClick={closeModalLevelUp} type="button">
          <img src="/icons/close.svg" alt="Fechar Modal" />
        </button>
      </div>
    </div>
  );
}
