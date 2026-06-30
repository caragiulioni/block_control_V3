import { useState, useRef, useEffect } from 'react';
import TerminalPrompt from '../shared/TerminalPrompt.jsx';
import Button from '../shared/Button.jsx';
import Note from '../shared/Note.jsx';
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
            <div className={styles.scrambledRow} aria-hidden="true">
              <span className={styles.scrambled}>{scrambleText('BLOCKCONTROL')}</span>
              <span className={styles.scrambled}>{scrambleText('GITHUB')}</span>
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
              <span className={styles.tag}>BLOCKCONTROL</span>
              <span><a className={styles.link} href="https://github.com/caragiulioni/block_control_V3" target="_blank" rel="noopener noreferrer">GITHUB <span aria-hidden="true">↗</span></a></span>
            </div>
          </div>
        )}
      </footer>

      <div className={styles.notes}>
        <Note prefix variant="muted" text="WCAG 2.2 AA compliant: Uses semantic HTML, logical heading hierarchies, keyboard focus indicators, and full screen-reader optimizations." />
		<Note prefix variant="muted" text="This site has interactive easter eggs and hidden features. My goal was to make those moments enjoyable for everyone, regardless of how you browse. If you have feedback on the screen reader experience, I'd love to hear it through the contact form." />
        <Note prefix variant="muted" text="Motion Accessible: Respects user reduced-motion preferences and keeps active animations safely under the 3Hz flashing threshold." />
      </div>

      {/* Easter egg dialog */}
      {dialogOpen && (
        <div className={styles.overlay}>
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="About this site" ref={dialogRef}>
            <span className={styles.dialogScanline} />
            <div className={styles.dialogContent}>
              <p className={styles.dialogLead}>
                <span className={styles.dialogSlash} aria-hidden="true">//</span> This Block Control V3.
              </p>
              <p>
                Big ideas, no time and some still developing skills became an accumulation of visual references, language research and code sandboxing compiled over a few years. 
              </p>
			  <p>
				A long awaited back-burner feature is finally live via the custom built music player. The player component was a gentle reminder that as simple as an app looks on the surface, building it has surprises and layers of unexpected complexity.
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
