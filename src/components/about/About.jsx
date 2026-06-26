import { useState, useEffect } from 'react';
import Chip from '../shared/Chip.jsx';
import HudDossier from '../shared/HudDossier.jsx';
import SectionHead from '../shared/SectionHead.jsx';
import Panel from '../shared/Panel.jsx';
import DecryptReveal from '../shared/DecryptReveal.jsx';
import DecryptButton from '../shared/DecryptButton.jsx';
import ScrollReveal from '../shared/ScrollReveal.jsx';
import { useTextScramble } from '../../hooks/useTextScramble.js';
import styles from './About.module.css';
import chipsBg from '../../images/chips-bandw.png';

const DOSSIER_ROWS = [
  { key: 'DESTINATION', value: 'UNKNOWN' },
  { key: 'STATION', value: 'AT LARGE' },
  { key: 'CLASSIFICATION', value: 'POLYMATH' },
  { key: 'STATUS', value: 'ACTIVE', hot: true },
];

const SKILLS = [
  { name: 'JAVASCRIPT', variant: 'cyan' },
  { name: 'TYPESCRIPT', variant: 'cyan' },
  { name: 'REACT', variant: 'cyan' },
  { name: 'NODE.JS', variant: 'cyan' },
  { name: 'CSS3', variant: 'cyan' },
  { name: 'GIT', variant: 'cyan' },
  { name: 'GRAPHQL', variant: 'cyan' },
  { name: 'REST', variant: 'cyan' },
  { name: 'LLM-ASSISTED DEV', variant: 'neon' },
  { name: 'PROMPT ENGINEERING', variant: 'neon' },
  { name: 'AI WORKFLOWS', variant: 'neon' },
  { name: 'CONTENTFUL', variant: 'cyan' },
  { name: 'PHOTOSHOP', variant: 'cyan' },
  { name: 'VIDEO EDITING', variant: 'neon' },
  { name: 'SOUND DESIGN', variant: 'neon' },
  { name: 'PRODUCTION', variant: 'neon' },
];

const DOSSIER_CHIPS = ['DEV', 'SOUND', 'VISUAL'];

const About = () => {
  const [skillsDecrypted, setSkillsDecrypted] = useState(false);
  const [bioDecrypted, setBioDecrypted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const headingRef = useTextScramble('ABOUT', visible);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 820);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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

              {isMobile && (
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
              )}

              {(!isMobile || bioDecrypted) ? (
                <DecryptReveal>
                  <p>
                    For most of the subject's adult life, they organized and DJed live events. Their work as a DJ led to performances in multiple countries at various points throughout their career.
                  </p>
                  <p>
                    Years in dark rooms and listening to loud music, combined with broader changes in the world, prompted a reassessment of long-term goals and where they wanted to position themselves within an evolving landscape.
                  </p>
                  <p>
                    Subject subsequently began teaching themselves to code. This period included part-time coursework, numerous detours, and intermittent distractions, though they consistently returned to the discipline. Eventually they enrolled in a coding bootcamp, accelerating the transition into a professional technical career. Subject began working professionally as a developer in 2021 and currently operating freelance at large.
                  </p>
                </DecryptReveal>
              ) : (
                <DecryptButton onClick={() => setBioDecrypted(true)}>
                  Decrypt bio
                </DecryptButton>
              )}
            </div>

            {!isMobile && (
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
            )}
          </div>

          {!skillsDecrypted ? (
            <DecryptButton onClick={() => setSkillsDecrypted(true)}>
              Decrypt skillset
            </DecryptButton>
          ) : (
            <DecryptReveal>
              <div className={styles.skills}>
                <div className={styles.skillChips}>
                  {SKILLS.map((skill) => (
                    <Chip key={skill.name} variant={skill.variant}>{skill.name}</Chip>
                  ))}
                </div>
              </div>
            </DecryptReveal>
          )}
        </Panel>
      </ScrollReveal>
    </section>
  );
};

export default About;
