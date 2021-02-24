import React, { createContext, useState, useContext } from 'react';
import challenges from '../../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeContextData {
  level: number;
  currenteExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  activeChallenge: Challenge | null;
}

const ChallengeContext = createContext<ChallengeContextData>(
  {} as ChallengeContextData,
);

const ChallengeProvider: React.FC = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [currenteExperience, setCurrenteExperience] = useState(30);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = ((level + 1) * 4) ** 2;

  function levelUp() {
    setLevel(level + 1);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function startNewChallenge() {
    const radomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[radomChallengeIndex];

    setActiveChallenge(challenge);
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currenteExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

function useChallenge(): ChallengeContextData {
  const context = useContext(ChallengeContext);

  if (!context) {
    throw new Error('useChallenge must be used within a AuthProvider');
  }

  return context;
}

export { ChallengeProvider, useChallenge };
