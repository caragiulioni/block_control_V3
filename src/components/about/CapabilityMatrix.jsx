import { useState, useRef, useEffect } from 'react';
import Chip from '../shared/Chip.jsx';
import styles from './CapabilityMatrix.module.css';

const SCRAMBLE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&/<>*█░▒▓';

const GROUPS = [
  {
    label: 'ENGINEERING',
    labelAlt: true,
    variant: 'cyan',
    skills: ['JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'NODE.JS', 'CSS3', 'GIT', 'GRAPHQL', 'REST', 'CONTENTFUL'],
  },
  {
    label: 'AI · WORKFLOW',
    labelAlt: true,
    variant: 'cyan',
    skills: ['AI WORKFLOWS', 'LLM-ASSISTED DEV', 'PROMPT ENGINEERING'],
  },
  {
    label: 'CREATIVE · AV',
    labelAlt: true,
    variant: 'cyan',
    skills: ['PHOTOSHOP', 'ILLUSTRATOR', 'VIDEO EDITING', 'SOUND DESIGN', 'PRODUCTION'],
  },
];

/** Generate scrambled text of the same length */
function scrambleText(text) {
  return text
    .split('')
    .map((c) => (c === ' ' ? ' ' : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0]))
    .join('');
}

const CapabilityMatrix = () => {
  const [decrypted, setDecrypted] = useState(false);
  const [scrambledChips, setScrambledChips] = useState([]);
  const [scrambledLabels, setScrambledLabels] = useState([]);
  const titleRef = useRef(null);
  const matrixRef = useRef(null);
  const totalModules = GROUPS.reduce((sum, g) => sum + g.skills.length, 0);

  // Generate scrambled versions on mount
  useEffect(() => {
    setScrambledLabels(GROUPS.map((g) => scrambleText(g.label)));
    setScrambledChips(
      GROUPS.map((g) => g.skills.map((s) => scrambleText(s)))
    );
  }, []);

  const handleDecrypt = () => {
    if (decrypted) return;

    // Scramble the button text first
    const el = titleRef.current;
    const finalText = 'CAPABILITY MATRIX';
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
        setTimeout(() => {
          setDecrypted(true);
          // Scroll matrix into view after reveal
          setTimeout(() => {
            matrixRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 100);
        }, 150);
      }
    }

    requestAnimationFrame(frame);
  };

  return (
    <div className={styles.matrix} ref={matrixRef}>
      <div className={styles.scan} aria-hidden="true" />

      <div className={styles.bar}>
        {decrypted && <span className={styles.barId}>00·B</span>}
        {!decrypted ? (
          <button className={styles.decryptBtn} onClick={handleDecrypt} type="button">
            <span className={styles.prompt}>&gt;</span>
            <span ref={titleRef} className={styles.btnText}>
              <span className={styles.fail}>FAIL</span> on matrix.decrypt() — click to resolve
            </span><span className={styles.cursor} />
          </button>
        ) : (
          <span className={styles.barTitleResolved}>CAPABILITIES MATRIX</span>
        )}
        {decrypted && <Chip variant="cyan">{totalModules} MODULES</Chip>}
      </div>

      <div className={`${styles.pad} ${decrypted ? styles.padDecrypted : ''}`}>
        {GROUPS.map((group, gi) => (
          <div className={styles.group} key={group.label}>
            <div className={`${styles.label} ${group.labelAlt ? styles.labelAlt : ''}`}>
              {decrypted ? group.label : (scrambledLabels[gi] || scrambleText(group.label))}
            </div>
            <div className={styles.chips}>
              {group.skills.map((skill, si) => (
                <Chip key={`${gi}-${si}`} variant={decrypted ? group.variant : 'cyan'}>
                  {decrypted ? skill : (scrambledChips[gi]?.[si] || scrambleText(skill))}
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapabilityMatrix;
