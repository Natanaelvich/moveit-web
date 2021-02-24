import Head from 'next/head';
import CompletedChanllenges from '../components/CompletedChanllenges';
import CountDown from '../components/CountDown';
import ExperienceBar from '../components/ExperienceBar';
import ChallengeBox from '../components/ChallengeBox';
import Profile from '../components/Profile';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | moveit</title>
      </Head>
      <ExperienceBar />
      <section>
        <div>
          <Profile />
          <CompletedChanllenges />
          <CountDown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
    </div>
  );
}
