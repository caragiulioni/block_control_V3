import { useState } from 'react';
import TerminalPrompt from '../shared/TerminalPrompt.jsx';
import Button from '../shared/Button.jsx';
import { useTextScramble } from '../../hooks/useTextScramble.js';
import styles from './Footer.module.css';

const SCRAMBLE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&/<>*█░▒▓';

function scrambleText(text) {
  return text.split('').map((c) => (c === ' ' ? ' ' : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0])).join('');
}

const Footer = () => {
  const [state, setState] = useState('encrypted'); // 'encrypted' | 'scrambling' | 'decrypted'
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDecrypt = () => {
    setState('scrambling');
    setTimeout(() => {
      setState('decrypted');
      setTimeout(() => setDialogOpen(true), 400);
    }, 1300);
  };

  // Only attach scramble when transitioning
  const scrambleRef = useTextScramble(
    'blockcontrol.isViewed() — STATUS: 200',
    state === 'scrambling'
  );

  return (
    <>
      <footer className={styles.footer}>
        {state !== 'decrypted' ? (
          /* Encrypted / scrambling state */
          <div className={styles.encrypted}>
            {state === 'encrypted' ? (
              <TerminalPrompt highlight="FAIL" onClick={handleDecrypt}>
                on footer.decrypt() — click to resolve
              </TerminalPrompt>
            ) : (
              <TerminalPrompt variant="success" textRef={scrambleRef}>
                {'\u00A0'}
              </TerminalPrompt>
            )}
            <div className={styles.scrambledRow}>
              <span className={styles.scrambled}>{scrambleText('www.blockcontrol.ca')}</span>
              <span className={styles.scrambled}>{scrambleText("FROM THEN 'TIL NOW.")}</span>
            </div>
          </div>
        ) : (
          /* Decrypted state */
          <div className={styles.decryptedWrap}>
            <div className={styles.successRow}>
              <TerminalPrompt variant="success" highlight="OK">
                blockcontrol.isViewed() — STATUS: 200:
              </TerminalPrompt>
            </div>
            <div className={styles.row}>
              <span><a className={styles.link} href="https://www.blockcontrol.ca/">www.blockcontrol.ca</a></span>
              <span className={styles.tag}>FROM THEN 'TIL NOW.</span>
            </div>
          </div>
        )}
      </footer>

      {/* Easter egg dialog */}
      {dialogOpen && (
        <div className={styles.overlay}>
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="About this site">
            <span className={styles.dialogScanline} />
            <div className={styles.dialogContent}>
              <p className={styles.dialogLead}>
                <span className={styles.dialogSlash} aria-hidden="true">//</span> This is the V3 of Block Control and man, we have come a long way.
              </p>
              <p>
                Big ideas, no time and some still developing skills became an accumulation of visual references, language research and code sandboxing compiled over an embarrassing number of years. The long awaited back-burner feature is live via the custom built music player, which was a gentle reminder that as simple as an app looks on the surface, building it always has surprises and layers of complexity.
              </p>
              <p>
                Thank you so much for stopping by and if you have feedback, found bugs or just want to chat, please say HI using the Contact form.
              </p>
            </div>
            <div className={styles.dialogActions}>
              <Button variant="filled" color="cyan" onClick={() => setDialogOpen(false)}>
                CLOSE
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
