import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../../challenges.json';
import LevelUpModal from '../../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeProviderProps {
  level: number;
  currenteExperience: number;
  challengesCompleted: number;
  children: ReactNode;
}

interface ChallengeContextData {
  level: number;
  currenteExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  activeChallenge: Challenge | null;
  openModalLevelUp: () => void;
  closeModalLevelUp: () => void;
}

const ChallengeContext = createContext<ChallengeContextData>(
  {} as ChallengeContextData,
);

const ChallengeProvider: React.FC<ChallengeProviderProps> = ({
  children,
  ...rest
}) => {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currenteExperience, setCurrenteExperience] = useState(
    rest.currenteExperience ?? 0,
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0,
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [modalLevelUpVisible, setModalLevelUpVisible] = useState(false);

  const experienceToNextLevel = ((level + 1) * 4) ** 2;

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currenteExperience', String(currenteExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currenteExperience, challengesCompleted]);

  function openModalLevelUp() {
    setModalLevelUpVisible(true);
  }

  function closeModalLevelUp() {
    setModalLevelUpVisible(false);
  }

  function levelUp() {
    setLevel(level + 1);
    setModalLevelUpVisible(true);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function startNewChallenge() {
    const radomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[radomChallengeIndex];

    setActiveChallenge(challenge);
    if (Notification.permission === 'granted') {
      new Audio('/notification.mp3').play();
      // eslint-disable-next-line no-new
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp`,
        icon: '/favicon.png',
      });
    }
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currenteExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;

      levelUp();
    }

    setCurrenteExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
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
        completeChallenge,
        openModalLevelUp,
        closeModalLevelUp,
      }}
    >
      {children}
      {modalLevelUpVisible && <LevelUpModal />}
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
