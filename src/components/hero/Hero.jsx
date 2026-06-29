import { useEffect, useState } from 'react';
import TopBar from '../shared/TopBar.jsx';
import Chip from '../shared/Chip.jsx';
import { useTextScramble } from '../../hooks/useTextScramble.js';
import styles from './Hero.module.css';
import ewaste from '../../images/ewaste.jpg';

const REVEAL_STAGGER_MS = 140;
const REVEAL_COUNT = 5;

const Hero = () => {
  const [revealed, setRevealed] = useState(-1);
  const eyebrowRef = useTextScramble('SYS // recovered media index', revealed >= 0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setRevealed(REVEAL_COUNT);
      return;
    }

    const timers = [];
    for (let i = 0; i < REVEAL_COUNT; i++) {
      timers.push(
        setTimeout(() => setRevealed(i), 300 + i * REVEAL_STAGGER_MS)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  const r = (index) =>
    `${styles.reveal} ${revealed >= index ? styles.revealIn : ''}`;

  return (
    <header className={styles.hero}>
      <div className={styles.bg} />
      <div
        className={styles.bgImage}
        style={{ backgroundImage: `url(${ewaste})` }}
      />
      <div className={styles.grid} />

      <TopBar
        left={<><b>BLOCKCONTROL</b> <span className={styles.topBarSub}><span style={{ color: 'var(--ink)' }}>NODE_MTL</span> <span style={{ color: 'var(--neon)' }}>//</span> <span style={{ color: 'var(--cyan)' }}>ONLINE</span></span></>}
        right="TOD TC"
      />

      <div className={styles.core}>
        <p className={`${styles.eyebrow} ${r(0)}`} ref={eyebrowRef}>
          SYS // recovered media index
        </p>

        <h1 className={`${styles.title} ${r(1)}`}>
          BLOCK<span className={styles.titleAccent}>CONTROL</span>
        </h1>

        <p className={`${styles.sub} ${r(2)}`}>
          Online record for <b>Cara Giulioni</b><br />
          <span style={{ color: 'var(--green)' }}>&gt;</span> software for web // development<br />
          <span style={{ color: 'var(--green)' }}>&gt;</span> visual &amp; auditory arts
        </p>

        <div className={`${styles.roles} ${r(3)}`}>
          <Chip variant="neon">WEB / DEV</Chip>
          <Chip variant="cyan">SOUND / DJ</Chip>
          <Chip variant="neon">VISUAL / AV</Chip>
        </div>

        <span className={`${styles.scrollCue} ${r(4)}`}>
          SCROLL TO DECRYPT <span className={styles.blink}>▾</span>
        </span>
      </div>
    </header>
  );
};

export default Hero;
