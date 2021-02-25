import React from 'react';
import { useChallenge } from '../hooks/modules/ChallengeContext';
import { useCountDown } from '../hooks/modules/CountDownContext';
import styles from '../styles/ChallengeBox.module.css';

export default function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useChallenge();
  const { stopCountDown } = useCountDown();

  function handleChallengeSucceeded() {
    completeChallenge();
    stopCountDown();
  }
  function handleChallengeFailed() {
    resetChallenge();
    stopCountDown();
  }
  return (
    <div className={styles.container}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Got xp" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button onClick={handleChallengeFailed} type="button">
              Falhei
            </button>
            <button onClick={handleChallengeSucceeded} type="button">
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>
            Inicie um ciclo para receber desafios a serem completados
          </strong>

          <p>
            <img src="icons/level-up.svg" alt="Level up" />
            Complete-os e ganhe experiência e avance de leve.
          </p>
        </div>
      )}
    </div>
  );
}
