import Head from 'next/head';
import CompletedChanllanges from '../components/CompletedChanllanges';
import CountDown from '../components/CountDown';
import ExperienceBar from '../components/ExperienceBar';
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
          <CompletedChanllanges />
          <CountDown />
        </div>
        <div />
      </section>
    </div>
  );
}
