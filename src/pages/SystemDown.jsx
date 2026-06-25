import { useState } from 'react';
import TopBar from '../components/shared/TopBar.jsx';
import Footer from '../components/shared/Footer.jsx';
import HudDossier from '../components/shared/HudDossier.jsx';
import Chip from '../components/shared/Chip.jsx';
import TerminalLog from '../components/shared/TerminalLog.jsx';
import RebootBar from '../components/shared/RebootBar.jsx';
import { useTextScramble } from '../hooks/useTextScramble.js';
import styles from './SystemDown.module.css';

const SystemDown = () => {
  const [trigger, setTrigger] = useState(0);
  const scrambleRef = useTextScramble('DOWN', trigger);

  const handleRetry = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTrigger((t) => t + 1);
  };

  return (
    <div className={styles.screen}>
      <TopBar
        left={
          <>
            <b>BLOCKCONTROL</b>{' '}
            <span className={styles.dot}>//</span> NODE_MTL{' '}
            <span className={styles.dot}>//</span>{' '}
            <span className={styles.offline}>OFFLINE</span>
          </>
        }
        right={<>SYS 0xDEAD ·</>}
      />

      <div className={styles.stage}>
        <div className={styles.grid}>
          {/* Left: System status */}
          <section className={styles.panel}>
            <div className={styles.pad}>
              <p className={styles.eyebrow}>CONNECTION LOST // CODE 0x000</p>
              <h1 className={styles.heading}>
                <span className={styles.glitch}>SYSTEM </span>
                <span className={styles.headingX} ref={scrambleRef}>
                  DOWN
                </span>
              </h1>
              <p className={styles.sub}>
                BlockControl is offline and awaiting reboot.{' '}
                <b>Decryption required on reconnect.</b> Stand by — or check back
                shortly.
              </p>
              <div className={styles.chips}>
                <Chip variant="neon">STATUS: OFFLINE</Chip>
                <Chip variant="neon">AWAITING REBOOT</Chip>
                <Chip variant="neon">ENCRYPTED</Chip>
              </div>

              <TerminalLog trigger={trigger} />
              <RebootBar trigger={trigger} />

              <div className={styles.actions}>
                <button
                  className={styles.retry}
                  type="button"
                  onClick={handleRetry}
                >
                  ⟳ RETRY HANDSHAKE
                </button>
                <span className={styles.note}>
                  auto-reboot looping // operator standby
                </span>
              </div>
            </div>
          </section>

          {/* Right: Dossier */}
          <HudDossier
            title="SUBJECT DOSSIER"
            indicator="STBY"
            glyph="??"
            glyphMeta={{ visualId: '█░█▒ACTED', ref: '0x4E//ERR' }}
            rows={[
              { key: 'DESTINATION', value: '░░░░░░' },
              { key: 'STATION', value: '0x00—NULL' },
              { key: 'PRIOR', value: '#REF!' },
              { key: 'STATUS', value: '▒▒ UNRESOLVED', hot: true },
            ]}
            chips={['D#V', 'S0%ND', 'V!SU#L']}
            spark="flat"
            footerLeft="FILE 00 // CORRUPT"
            footerRight="0x??·??"
          >
            {/* Network error filler — system down only */}
            <div className={styles.netError}>
              <span className={styles.netCode}>ERR_CONNECTION_REFUSED</span>
              <span className={styles.netMsg}>
                Unable to establish secure tunnel to origin.<br />
                Remote host did not respond within timeout window.
              </span>
              <span className={styles.netDetail}>
                ┌ dst: blockcontrol.ca:443<br />
                ├ proto: TLS 1.3 / QUIC<br />
                ├ retry: 3/3 EXHAUSTED<br />
                └ fallback: NONE
              </span>
            </div>
          </HudDossier>
        </div>
      </div>

      <Footer
        left={<a href="https://www.blockcontrol.ca/">www.blockcontrol.ca</a>}
        right="REBOOT PENDING."
      />
    </div>
  );
};

export default SystemDown;
