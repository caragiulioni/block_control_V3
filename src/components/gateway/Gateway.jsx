import { useState, useEffect, useRef } from 'react';
import TopBar from '../shared/TopBar.jsx';
import Footer from '../shared/Footer.jsx';
import Chip from '../shared/Chip.jsx';
import Button from '../shared/Button.jsx';
import ProgressBar from '../shared/ProgressBar.jsx';
import { startTypewriter } from '../../utils/typewriter.js';
import { useTextScramble } from '../../hooks/useTextScramble.js';
import styles from './Gateway.module.css';

const BOOT_LINES = [
  [{ text: '> NODE MTL // carrier ......... ' }, { text: 'LINKED', cls: 'ok' }],
  [{ text: '> core.services ............... ' }, { text: 'ONLINE', cls: 'ok' }],
  [{ text: '> auto-reboot ................. ' }, { text: 'OK', cls: 'ok' }],
  [{ text: '> backup node ................. ' }, { text: 'ROUTED', cls: 'ok' }],
  [{ text: '> integrity check ............. ' }, { text: 'PASS', cls: 'ok' }],
  [{ text: '> decryption key .............. ' }, { text: 'ACCEPTED', cls: 'ok' }],
];

const ERROR_LINES = [
  [{ text: '> NODE MTL // carrier ......... ' }, { text: 'LOST', cls: 'bad' }],
  [{ text: '> core.services ............... ' }, { text: 'OFFLINE', cls: 'bad' }],
  [{ text: '> attempting auto-reboot ...... ' }, { text: 'FAIL', cls: 'bad' }],
  [{ text: '> rerouting via backup node ... ' }, { text: 'TIMEOUT', cls: 'bad' }],
  [{ text: '> integrity check ............. ' }, { text: 'PASS', cls: 'ok' }],
  [{ text: '> decryption key .............. ' }, { text: 'REQUIRED', cls: 'bad' }],
  [{ text: '> standby for operator', cls: 'dim' }],
];

const DENIED_LINES = [
  [{ text: '> reauthenticating ............ ' }, { text: 'DENIED', cls: 'bad' }],
  [{ text: '> key rejected ................ ' }, { text: '0x1A', cls: 'bad' }],
  [{ text: '> lockout timer ............... ' }, { text: 'CLEARED', cls: 'dim' }],
];

const SESSION_KEY = 'blockcontrol_gateway_passed';

// Boot phases: down → booting → ready → exiting | denied
const PHASE_DELAY = 600; // ms between each "turn on" step

const Gateway = () => {
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; }
  });

  const [phase, setPhase] = useState('down'); // down | booting | ready | denied | exiting
  const [step, setStep] = useState(0); // which components have "turned on" (0-6)
  const [pct, setPct] = useState(0);
  const [barMsg, setBarMsg] = useState('');
  const termRef = useRef(null);
  const timeoutRef = useRef(null);
  const reducedMotion = useRef(false);

  // Scramble heading: DOWN → READY (only triggers once at step 2)
  const headingText = step >= 2 ? 'READY' : 'DOWN';
  const scrambleTrigger = step >= 2 ? 1 : 0;
  const scrambleRef = useTextScramble(headingText, scrambleTrigger);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!dismissed) {
      // Render error lines immediately (static, no animation)
      renderStaticErrors();
      // Start boot sequence after a brief pause
      timeoutRef.current = setTimeout(startBoot, 1200);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard: Y/Enter = enter, N = deny
  useEffect(() => {
    if (dismissed || phase !== 'ready') return;
    const handleKey = (e) => {
      const k = e.key.toLowerCase();
      if (k === 'y' || k === 'enter') handleEnter();
      else if (k === 'n') handleDeny();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [phase, dismissed]); // eslint-disable-line react-hooks/exhaustive-deps

  function renderStaticErrors() {
    const term = termRef.current;
    if (!term) return;
    term.innerHTML = '';
    ERROR_LINES.forEach((line) => {
      const div = document.createElement('div');
      line.forEach((seg) => {
        const span = document.createElement('span');
        if (seg.cls) span.className = styles[seg.cls] || '';
        span.textContent = seg.text;
        div.appendChild(span);
      });
      term.appendChild(div);
    });
  }

  function startBoot() {
    setPhase('booting');
    // Step through each component turning on
    let s = 1;
    function nextStep() {
      setStep(s);
      s++;
      if (s <= 6) {
        timeoutRef.current = setTimeout(nextStep, PHASE_DELAY);
      } else {
        // All steps done, run terminal + bar
        timeoutRef.current = setTimeout(runTerminal, 300);
      }
    }
    nextStep();
  }

  function runTerminal() {
    const term = termRef.current;
    if (!term) return;
    term.innerHTML = '';

    if (reducedMotion.current) {
      BOOT_LINES.forEach((line) => renderLine(term, line));
      appendCursor(term);
      runBar();
      return;
    }

    startTypewriter(term, BOOT_LINES, styles, () => {
      appendCursor(term);
      runBar();
    }, timeoutRef);
  }

  function runBar() {
    if (reducedMotion.current) {
      setPct(100);
      setBarMsg('HANDSHAKE COMPLETE // ACCESS READY');
      setPhase('ready');
      return;
    }

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
      timeoutRef.current = setTimeout(() => runTerminal(), 1200);
      return;
    }

    startTypewriter(term, DENIED_LINES, styles, () => {
      appendCursor(term);
      timeoutRef.current = setTimeout(() => {
        setPhase('booting');
        runTerminal();
      }, 1100);
    }, timeoutRef);
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
  const isBooted = step >= 1;

  return (
    <div
      className={`${styles.screen} ${isExiting ? styles.exiting : ''}`}
      role="dialog"
      aria-label="Access gateway"
      aria-modal="true"
    >
      {/* Screen reader welcome */}
      <p className="sr-only">
        Welcome to Block Control. This site has interactive easter eggs and hidden features — my goal was to make those moments enjoyable for everyone, regardless of how you browse. System is online and ready. Press Y or Enter to continue.
      </p>

      {isExiting && <span className={styles.sweep} />}

      {/* TopBar — swaps from offline to online */}
      <TopBar
        left={
          isBooted ? (
            <>
              <b>BLOCKCONTROL</b>{' '}
              <span className={styles.dot} aria-hidden="true">//</span>{' '}
              <span style={{ color: 'var(--ink)' }}>NODE_MTL</span>{' '}
              <span aria-hidden="true" style={{ color: 'var(--neon)' }}>//</span>{' '}
              <span style={{ color: 'var(--cyan)' }}>ONLINE</span>
            </>
          ) : (
            <>
              <b>BLOCKCONTROL</b>{' '}
              <span className={styles.dot} aria-hidden="true">//</span> NODE_MTL{' '}
              <span className={styles.dot} aria-hidden="true">//</span>{' '}
              <span style={{ color: 'var(--neon)' }}>OFFLINE</span>
            </>
          )
        }
        right={isBooted ? 'TOD TC' : <>SYS 0xDEAD <span aria-hidden="true">·</span></>}
      />

      <div className={styles.stage}>
        <div className={styles.grid}>
          {/* Left: System panel */}
          <section className={`${styles.panel} ${isBooted ? styles.panelOnline : ''}`} aria-hidden="true">
            <div className={styles.pad}>
              <p className={styles.eyebrow}>
                {step >= 2 ? 'SECURE NODE // HANDSHAKE' : 'CONNECTION LOST // CODE 0x000'}
              </p>

              <h1 className={styles.heading}>
                SYSTEM{' '}
                <span
                  className={step >= 2 ? styles.headingReady : styles.headingX}
                  ref={scrambleRef}
                >
                  {headingText}
                </span>
              </h1>

              <p className={styles.sub}>
                {step >= 3
                  ? <>BlockControl is online. <b style={{ color: 'var(--cyan)' }}>Access granted on confirmation.</b></>
                  : <>BlockControl is offline and awaiting reboot. <b>Decryption required on reconnect.</b></>
                }
              </p>

              {/* Chips */}
              <div className={styles.chips}>
                {step >= 3 ? (
                  <>
                    <Chip variant="cyan">STATUS: ONLINE</Chip>
                    <Chip variant="cyan">HANDSHAKE OK</Chip>
                    <Chip variant="cyan">ENCRYPTED</Chip>
                  </>
                ) : (
                  <>
                    <Chip variant="neon">STATUS: OFFLINE</Chip>
                    <Chip variant="neon">AWAITING REBOOT</Chip>
                    <Chip variant="neon">ENCRYPTED</Chip>
                  </>
                )}
              </div>

              {/* Terminal */}
              <div className={styles.term} ref={termRef} />

              {/* Progress bar */}
              {step >= 4 && (
                <ProgressBar
                  pct={pct}
                  msg={barMsg || 'INITIALIZING…'}
                  variant={isReady || isExiting ? 'success' : isDenied ? 'tx' : 'tx'}
                />
              )}

              {/* Action buttons — Y/N */}
              <div className={`${styles.actions} ${isReady ? styles.actionsReady : ''}`}>
                <Button
                  variant="filled"
                  color="cyan"
                  onClick={handleEnter}
                  disabled={!isReady}
                  aria-label="Grant access — enter site"
                >
                  Y <span className={styles.btnHint}>ENTER</span>
                </Button>
                <Button
                  variant="filled"
                  color="neon"
                  onClick={handleDeny}
                  disabled={!isReady}
                  aria-label="Deny access"
                >
                  N <span className={styles.btnHint}>DENY</span>
                </Button>
              </div>
            </div>
          </section>

          {/* Right: Status sidebar */}
          <aside className={styles.sidebar} aria-hidden="true">
            <div className={styles.sidebarBar}>
              <span>SYSTEM STATUS</span>
              <span className={step >= 5 ? styles.indicatorOn : styles.indicatorOff}>
                {step >= 5 ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>

            <div className={styles.statusRows}>
              <div className={styles.statusRow}>
                <span className={styles.rowKey}>CHANNEL</span>
                <span className={styles.rowVal}>{step >= 5 ? 'SECURE' : 'NONE'}</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.rowKey}>PROTOCOL</span>
                <span className={styles.rowVal}>{step >= 5 ? 'RELAY / SMTP' : '—'}</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.rowKey}>NODE</span>
                <span className={styles.rowVal}>{step >= 5 ? 'MTL' : '0x00'}</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.rowKey}>ENCRYPTION</span>
                <span className={step >= 5 ? styles.rowValHot : styles.rowVal}>{step >= 5 ? 'ON' : 'OFF'}</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.rowKey}>LATENCY</span>
                <span className={styles.rowVal}>{step >= 5 ? '12ms' : 'TIMEOUT'}</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.rowKey}>TLS</span>
                <span className={styles.rowVal}>{step >= 5 ? '1.3 / QUIC' : 'HANDSHAKE FAIL'}</span>
              </div>
            </div>

            <div className={styles.netBlock}>
              {step >= 5 ? (
                <>
                  <span className={styles.netCode} style={{ color: 'var(--cyan)' }}>CONNECTION_ESTABLISHED</span>
                  <span className={styles.netMsg}>
                    Secure tunnel active to origin.<br />
                    Handshake verified — awaiting operator confirmation.
                  </span>
                  <span className={styles.netDetail}>
                    ┌ dst: blockcontrol.ca:443<br />
                    ├ proto: TLS 1.3 / QUIC<br />
                    ├ latency: 12ms<br />
                    └ status: OK
                  </span>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>

            <div className={styles.sidebarFoot}>
              <span>{step >= 5 ? 'SIGNAL // STRONG' : 'SIGNAL // NONE'}</span>
              <span>{step >= 5 ? '0xC9·G1' : '0x??·??'}</span>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <Footer
        left={<span style={{ color: 'var(--neon)' }}>BLOCKCONTROL</span>}
        right={<span style={{ color: 'var(--cyan)' }}>REBOOT PENDING.</span>}
      />

      {/* Screen reader deny announcement */}
      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        {isDenied && 'Access denied. Re-authenticating…'}
      </div>
    </div>
  );
};

export default Gateway;
