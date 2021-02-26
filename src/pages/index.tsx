import Head from 'next/head';
import { GetServerSideProps } from 'next';
import CompletedChanllenges from '../components/CompletedChanllenges';
import CountDown from '../components/CountDown';
import ExperienceBar from '../components/ExperienceBar';
import ChallengeBox from '../components/ChallengeBox';
import Profile from '../components/Profile';
import styles from '../styles/Home.module.css';
import { ChallengeProvider } from '../hooks/modules/ChallengeContext';
import { CountDownProvider } from '../hooks/modules/CountDownContext';

interface HomeProps {
  level: number;
  currenteExperience: number;
  challengesCompleted: number;
}
export default function Home({
  level,
  currenteExperience,
  challengesCompleted,
}: HomeProps) {
  return (
    <div className={styles.container}>
      <ChallengeProvider
        level={level}
        currenteExperience={currenteExperience}
        challengesCompleted={challengesCompleted}
      >
        <Head>
          <title>Início | moveit</title>
        </Head>
        <ExperienceBar />
        <section>
          <CountDownProvider>
            <div>
              <Profile />
              <CompletedChanllenges />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </CountDownProvider>
        </section>
      </ChallengeProvider>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async cxt => {
  const { level, currenteExperience, challengesCompleted } = cxt.req.cookies;

  return {
    props: {
      level: Number(level),
      currenteExperience: Number(currenteExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
