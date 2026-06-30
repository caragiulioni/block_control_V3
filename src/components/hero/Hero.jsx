import TopBar from '../shared/TopBar.jsx';
import Chip from '../shared/Chip.jsx';
import { useTextScramble } from '../../hooks/useTextScramble.js';
import styles from './Hero.module.css';
import ewaste from '../../images/ewaste.jpg';

const Hero = () => {
  const eyebrowRef = useTextScramble('SYS // recovered media index', true);

  return (
    <header className={styles.hero}>
      <div className={styles.bg} />
      <div
        className={styles.bgImage}
        style={{ backgroundImage: `url(${ewaste})` }}
      />
      <div className={styles.grid} />

      <TopBar
        left={<><b>BLOCKCONTROL</b> <span className={styles.topBarSub}><span style={{ color: 'var(--ink)' }}>NODE_MTL</span> <span style={{ color: 'var(--neon)' }} aria-hidden='true'>//</span> <span style={{ color: 'var(--cyan)' }}>ONLINE</span></span></>}
        right="TOD TC"
      />

      <div className={styles.core}>
        <p className={styles.eyebrow} ref={eyebrowRef}>
          SYS // recovered media index
        </p>

        <h1 className={styles.title}>
          BLOCK<span className={styles.titleAccent}>CONTROL</span>
        </h1>

        <p className={styles.sub}>
          Online record for <b>Cara Giulioni</b><br />
          <span style={{ color: 'var(--green)' }}>&gt;</span> web development<br />
          <span style={{ color: 'var(--green)' }}>&gt;</span> visual &amp; auditory arts
        </p>

        <div className={styles.roles}>
          <Chip variant="neon">WEB / DEV</Chip>
          <Chip variant="cyan">SOUND / DJ</Chip>
          <Chip variant="neon">VISUAL / AV</Chip>
        </div>

        <span className={styles.scrollCue}>
          SCROLL TO DECRYPT <span className={styles.blink}>▾</span>
        </span>
      </div>
    </header>
  );
};

export default Hero;
