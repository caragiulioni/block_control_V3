import { useState, useRef, useEffect } from 'react';
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
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);

  // Focus management for dialog
  useEffect(() => {
    if (dialogOpen && dialogRef.current) {
      const focusable = dialogRef.current.querySelector('button');
      if (focusable) focusable.focus();
    }
  }, [dialogOpen]);

  const closeDialog = () => {
    setDialogOpen(false);
    // Return focus to the decrypted area
    if (triggerRef.current) triggerRef.current.focus();
  };

  // Close dialog on Escape
  useEffect(() => {
    if (!dialogOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeDialog();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [dialogOpen]);

  const handleDecrypt = () => {
    setState('scrambling');
    setTimeout(() => {
      setState('decrypted');
      setTimeout(() => setDialogOpen(true), 400);
    }, 1300);
  };

  const successMsg = 'blockcontrol.isViewed() — STATUS: 200 - Thanks for stopping by!'

  // Only attach scramble when transitioning
  const scrambleRef = useTextScramble(
    successMsg,
    state === 'scrambling'
  );



  return (
    <>
      <footer className={styles.footer}>
        {state !== 'decrypted' ? (
          /* Encrypted / scrambling state */
          <div className={styles.encrypted}>
            {state === 'encrypted' ? (
              <TerminalPrompt highlight="FAIL" onClick={handleDecrypt} ariaLabel="Decrypt footer — reveal site information">
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
                {successMsg}
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
        <div className={styles.overlay} onClick={closeDialog}>
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="About this site" ref={dialogRef} onClick={(e) => e.stopPropagation()}>
            <span className={styles.dialogScanline} />
            <div className={styles.dialogContent}>
              <p className={styles.dialogLead}>
                <span className={styles.dialogSlash} aria-hidden="true">//</span> This is the V3 of Block Control. We've come a long way.
              </p>
              <p>
                Big ideas, no time and some still developing skills became an accumulation of visual references, language research and code sandboxing compiled over a few years. In addtion to the UI overhaul, a long awaited back-burner feature is finally live via the custom built music player. The player component was a gentle reminder that as simple as an app looks on the surface, building it always has surprises and layers of complexity.
              </p>
              <p>
                Thanks for checking out my site and if you have feedback, found bugs or just want to chat, send a signal from the Connect form.
              </p>
            </div>
            <div className={styles.dialogActions}>
              <Button variant="filled" color="cyan" onClick={closeDialog}>
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
