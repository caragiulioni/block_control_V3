import { useState } from 'react';
import HudDossier from '../shared/HudDossier.jsx';
import SectionHead from '../shared/SectionHead.jsx';
import Panel from '../shared/Panel.jsx';
import ScrollReveal from '../shared/ScrollReveal.jsx';
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

const About = () => {
  const [visible, setVisible] = useState(false);
  const headingRef = useTextScramble('ABOUT', visible);

  return (
    <section className={styles.section} id="about">
      <ScrollReveal onResolved={() => setVisible(true)} scanline>
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
                Whether turning knobs on music equipment, working with sound, lighting and A/V gear or coding on her computer, Subject has been talking to machines for as long as she can remember.
              </p>
              <p>
                Subject has worked professionally in FinTech but is currently operating freelance.
              </p>

              <CapabilityMatrix />
            </div>

            <HudDossier
              fileId="00·C"
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
