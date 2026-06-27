import { useState, useEffect, useRef } from 'react';
import HudDossier from '../shared/HudDossier.jsx';
import SectionHead from '../shared/SectionHead.jsx';
import Panel from '../shared/Panel.jsx';
import ScrollReveal from '../shared/ScrollReveal.jsx';
import DecryptButton from '../shared/DecryptButton.jsx';
import DecryptReveal from '../shared/DecryptReveal.jsx';
import CapabilityMatrix from './CapabilityMatrix.jsx';
import { useTextScramble } from '../../hooks/useTextScramble.js';
import styles from './About.module.css';
import chipsBg from '../../images/chips-bandw.png';

const DOSSIER_ROWS = [
  { key: 'DESTINATION', value: 'UNKNOWN' },
  { key: 'STATION', value: 'AT LARGE' },
  { key: 'CLASSIFICATION', value: 'POLYMATH' },
  { key: 'STATUS', value: 'ACTIVE', hot: true },
];

const DOSSIER_CHIPS = ['DEV', 'SOUND', 'VISUAL'];

const SCRAMBLE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&/<>*';

const About = () => {
  const [visible, setVisible] = useState(false);
  const [matrixRevealed, setMatrixRevealed] = useState(false);
  const [decrypting, setDecrypting] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 600);
  const headingRef = useTextScramble('ABOUT', visible);
  const btnTextRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleDecrypt = () => {
    if (decrypting) return;
    setDecrypting(true);

    // Scramble the button text
    const el = btnTextRef.current;
    const finalText = 'Decrypt capability matrix';
    const len = finalText.length;
    const dur = 800;
    const t0 = performance.now();

    function frame(now) {
      const p = Math.min(1, (now - t0) / dur);
      const revealed = Math.floor(p * len);
      let out = '';
      for (let i = 0; i < len; i++) {
        const c = finalText[i];
        out += c === ' ' || i < revealed ? c : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
      }
      if (el) el.textContent = out;
      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        // After scramble completes, reveal the matrix
        setTimeout(() => setMatrixRevealed(true), 200);
      }
    }

    requestAnimationFrame(frame);
  };

  const showMatrix = !isMobile || matrixRevealed;

  return (
    <section className={styles.section} id="about">
      <ScrollReveal onResolved={() => setVisible(true)}>
        <SectionHead eyebrow="FILE 00 // subject record" headingRef={headingRef}>
          ABOUT
        </SectionHead>

        <Panel
          id="00·A"
          title="SUBJECT"
          statusLabel="STATUS: ACTIVE"
          bgImage={chipsBg}
        >
          <div className={styles.dossier}>
            <div className={styles.prose}>
              <p className={styles.lead}>
                Whether turning knobs on music equipment, working with sound, lighting and A/V gear, or coding on her computer, subject has been talking to machines for as long as she can remember.
              </p>
              <p>
                Subject has worked professionally in FinTech but is currently operating freelance at large.
              </p>

              {showMatrix ? (
                isMobile ? (
                  <DecryptReveal>
                    <CapabilityMatrix />
                  </DecryptReveal>
                ) : (
                  <CapabilityMatrix />
                )
              ) : (
                <DecryptButton onClick={handleDecrypt}>
                  <span ref={btnTextRef}>Decrypt capability matrix</span>
                </DecryptButton>
              )}
            </div>

            <HudDossier
              title="SUBJECT DOSSIER"
              indicator="REC"
              glyph="CG"
              glyphMeta={{ visualId: 'REDACTED', ref: 'BLK-CTRL-00' }}
              rows={DOSSIER_ROWS}
              chips={DOSSIER_CHIPS}
              footerLeft="FILE 00 // VERIFIED"
              footerRight="0xC9·G1"
            />
          </div>
        </Panel>
      </ScrollReveal>
    </section>
  );
};

export default About;
