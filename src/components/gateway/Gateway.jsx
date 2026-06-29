import { useState, useEffect, useRef } from 'react';
import Chip from '../shared/Chip.jsx';
import Brackets from '../shared/Brackets.jsx';
import Button from '../shared/Button.jsx';
import styles from './Gateway.module.css';

const BOOT_LINES = [
  [{ text: '> NODE MTL // carrier ......... ' }, { text: 'LINKED', cls: 'ok' }],
  [{ text: '> core.services ............... ' }, { text: 'ONLINE', cls: 'ok' }],
  [{ text: '> auto-reboot ................. ' }, { text: 'OK', cls: 'ok' }],
  [{ text: '> backup node ................. ' }, { text: 'ROUTED', cls: 'ok' }],
  [{ text: '> integrity check ............. ' }, { text: 'PASS', cls: 'ok' }],
  [{ text: '> decryption key .............. ' }, { text: 'ACCEPTED', cls: 'ok' }],
];

const DENIED_LINES = [
  [{ text: '> reauthenticating ............ ' }, { text: 'DENIED', cls: 'bad' }],
  [{ text: '> key rejected ................ ' }, { text: '0x1A', cls: 'bad' }],
  [{ text: '> lockout timer ............... ' }, { text: 'CLEARED', cls: 'dim' }],
];

const SESSION_KEY = 'blockcontrol_gateway_passed';

const Gateway = () => {
  // Skip entirely if already passed this session
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; }
  });

  const [phase, setPhase] = useState('booting'); // booting | ready | denied | exiting
  const [pct, setPct] = useState(0);
  const [barMsg, setBarMsg] = useState('NEGOTIATING…');
  const termRef = useRef(null);
  const timeoutRef = useRef(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!dismissed) boot();
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard: Y/Enter = enter, N = deny
  useEffect(() => {
    if (dismissed) return;
    const handleKey = (e) => {
      if (phase !== 'ready') return;
      const k = e.key.toLowerCase();
      if (k === 'y' || k === 'enter') handleEnter();
      else if (k === 'n') handleDeny();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [phase, dismissed]); // eslint-disable-line react-hooks/exhaustive-deps

  function boot() {
    setPhase('booting');
    setPct(0);
    setBarMsg('NEGOTIATING…');

    const term = termRef.current;
    if (!term) return;
    term.innerHTML = '';

    if (reducedMotion.current) {
      // Instant: render everything, go straight to ready
      BOOT_LINES.forEach((line) => renderLine(term, line));
      appendCursor(term);
      setPct(100);
      setBarMsg('HANDSHAKE COMPLETE // ACCESS READY');
      setPhase('ready');
      return;
    }

    // Typewriter
    let li = 0, si = 0, ci = 0;
    let curLine = null, curSpan = null;

    function step() {
      if (li >= BOOT_LINES.length) {
        appendCursor(term);
        runBar();
        return;
      }
      const line = BOOT_LINES[li];
      if (si === 0 && ci === 0) {
        curLine = document.createElement('div');
        term.appendChild(curLine);
      }
      const seg = line[si];
      if (ci === 0) {
        curSpan = document.createElement('span');
        if (seg.cls) curSpan.className = styles[seg.cls] || '';
        curLine.appendChild(curSpan);
      }
      curSpan.textContent += seg.text.charAt(ci);
      ci++;
      if (ci >= seg.text.length) {
        si++;
        ci = 0;
        if (si >= line.length) {
          li++;
          si = 0;
          timeoutRef.current = setTimeout(step, 150);
          return;
        }
      }
      timeoutRef.current = setTimeout(step, seg.text.length > 20 ? 7 : 20);
    }
    step();
  }

  function runBar() {
    let p = 0;
    function tick() {
      if (p < 100) {
        p += Math.max(1, Math.round((100 - p) * 0.14));
        if (p > 100) p = 100;
        setPct(p);
        setBarMsg(p < 40 ? 'NEGOTIATING…' : p < 80 ? 'EXCHANGING KEYS…' : 'FINALIZING…');
        timeoutRef.current = setTimeout(tick, 90);
      } else {
        setBarMsg('HANDSHAKE COMPLETE // ACCESS READY');
        setPhase('ready');
      }
    }
    tick();
  }

  function handleEnter() {
    setPhase('exiting');
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* noop */ }

    if (reducedMotion.current) {
      setDismissed(true);
      return;
    }

    // Animate out, then remove
    timeoutRef.current = setTimeout(() => setDismissed(true), 1200);
  }

  function handleDeny() {
    setPhase('denied');
    setPct(0);
    setBarMsg('ACCESS DENIED');

    const term = termRef.current;
    if (!term) return;
    term.innerHTML = '';

    if (reducedMotion.current) {
      DENIED_LINES.forEach((line) => renderLine(term, line));
      appendCursor(term);
      timeoutRef.current = setTimeout(boot, 1200);
      return;
    }

    // Type denied lines then reboot
    let li = 0, si = 0, ci = 0;
    let curLine = null, curSpan = null;

    function step() {
      if (li >= DENIED_LINES.length) {
        appendCursor(term);
        timeoutRef.current = setTimeout(boot, 1100);
        return;
      }
      const line = DENIED_LINES[li];
      if (si === 0 && ci === 0) {
        curLine = document.createElement('div');
        term.appendChild(curLine);
      }
      const seg = line[si];
      if (ci === 0) {
        curSpan = document.createElement('span');
        if (seg.cls) curSpan.className = styles[seg.cls] || '';
        curLine.appendChild(curSpan);
      }
      curSpan.textContent += seg.text.charAt(ci);
      ci++;
      if (ci >= seg.text.length) {
        si++;
        ci = 0;
        if (si >= line.length) {
          li++;
          si = 0;
          timeoutRef.current = setTimeout(step, 150);
          return;
        }
      }
      timeoutRef.current = setTimeout(step, seg.text.length > 20 ? 7 : 20);
    }
    step();
  }

  function renderLine(container, segments) {
    const div = document.createElement('div');
    segments.forEach((seg) => {
      const span = document.createElement('span');
      if (seg.cls) span.className = styles[seg.cls] || '';
      span.textContent = seg.text;
      div.appendChild(span);
    });
    container.appendChild(div);
  }

  function appendCursor(el) {
    const cur = document.createElement('span');
    cur.className = styles.cursor;
    el.appendChild(cur);
  }

  if (dismissed) return null;

  const isReady = phase === 'ready';
  const isDenied = phase === 'denied';
  const isExiting = phase === 'exiting';

  return (
    <div
      className={`${styles.gate} ${isExiting ? styles.exiting : ''} ${isDenied ? styles.denied : ''}`}
      role="dialog"
      aria-label="Access gateway"
      aria-modal="true"
    >
      {isExiting && <span className={styles.sweep} />}
      <div className={`${styles.card} ${isExiting ? styles.cardExit : ''} ${isDenied ? styles.cardDenied : ''}`}>
        <Brackets key={phase} color={isDenied ? 'var(--neon)' : 'var(--cyan)'} />

        <p className={styles.eyebrow}>SECURE NODE <span aria-hidden="true">//</span> HANDSHAKE</p>

        <div className={styles.chips}>
          <Chip variant="cyan">ONLINE</Chip>
          <Chip variant="cyan">HANDSHAKE OK</Chip>
          <Chip variant="cyan">ENCRYPTED</Chip>
        </div>

        {/* Terminal — decorative */}
        <div className={styles.term} ref={termRef} aria-hidden="true" />

        {/* Progress bar */}
        <div className={styles.bar} aria-hidden="true">
          <div className={styles.barLab}>
            <span>{barMsg}</span>
            <b className={styles.barPct}>{String(pct).padStart(3, '0')}%</b>
          </div>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Screen reader announcements */}
        <div aria-live="assertive" aria-atomic="true" className={styles.srOnly}>
          {isDenied && 'Access denied. Re-authenticating…'}
        </div>

        {/* Prompt + buttons */}
        <p className={`${styles.prompt} ${isReady ? styles.promptVisible : ''}`}>
          <span className={styles.promptQ} aria-hidden="true">&gt;</span> grant access to BLOCKCONTROL? [Y/N]
        </p>
        <div className={`${styles.btns} ${isReady ? styles.btnsVisible : ''}`}>
          <Button
            variant="filled"
            color="cyan"
            onClick={handleEnter}
            aria-label="Grant access — enter site"
          >
            Y <span className={styles.btnHint}>ENTER</span>
          </Button>
          <Button
            variant="filled"
            color="neon"
            onClick={handleDeny}
            aria-label="Deny access"
          >
            N <span className={styles.btnHint}>DENY</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gateway;
