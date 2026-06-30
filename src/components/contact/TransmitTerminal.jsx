import { useEffect, useRef, useState } from 'react';
import ProgressBar from '../shared/ProgressBar.jsx';
import styles from './TransmitTerminal.module.css';

const TX_LINES = [
  [{ text: '> BUFFER LOADED // PREPARING TRANSMISSION' }],
  [{ text: '> ROUTING: NODE_MTL → RELAY_SMTP' }],
  [{ text: '> PACKET ENCRYPTED // DISPATCHING...' }],
  [{ text: '> VALIDATING HANDSHAKE ............. ' }, { text: 'OK', cls: 'ok' }],
  [{ text: '> RELAY CONFIRMED .................. ' }, { text: 'PASS', cls: 'ok' }],
];

const SUCCESS_LINES = [
  [{ text: '> ████████████████ COMPLETE', cls: 'ok' }],
  [{ text: '> SIGNAL RECEIVED — STANDBY FOR REPLY', cls: 'ok' }],
];

const TransmitTerminal = ({ transmitting, onComplete, success, bufferLength }) => {
  const termRef = useRef(null);
  const timeoutRef = useRef(null);
  const [pct, setPct] = useState(0);
  const [barMsg, setBarMsg] = useState('AWAITING INPUT');
  const [phase, setPhase] = useState('idle'); // idle | typing | bar | done

  // Reset when not transmitting and not success
  useEffect(() => {
    if (!transmitting && !success) {
      setPct(0);
      setBarMsg('AWAITING INPUT');
      setPhase('idle');
    }
  }, [transmitting, success]);

  // Update buffer display when idle
  useEffect(() => {
    if (phase === 'idle' && !success) {
      setBarMsg(bufferLength > 0 ? 'BUFFERING…' : 'AWAITING INPUT');
    }
  }, [bufferLength, phase, success]);

  // Trigger transmission sequence
  useEffect(() => {
    if (!transmitting) return;
    setPhase('typing');

    const term = termRef.current;
    if (!term) return;
    term.innerHTML = '';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      TX_LINES.forEach((line) => renderLine(term, line));
      startBar();
      return;
    }

    // Line-at-a-time reveal (lighter than char-by-char)
    let li = 0;
    function stepLine() {
      if (li >= TX_LINES.length) {
        startBar();
        return;
      }
      renderLine(term, TX_LINES[li]);
      li++;
      timeoutRef.current = setTimeout(stepLine, 200);
    }
    stepLine();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [transmitting]); // eslint-disable-line react-hooks/exhaustive-deps

  function startBar() {
    setPhase('bar');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setPct(100);
      setBarMsg('TRANSMISSION COMPLETE');
      finishTransmit();
      return;
    }

    let p = 0;
    function tick() {
      if (p < 100) {
        p += Math.max(1, Math.round((100 - p) * 0.08));
        if (p > 100) p = 100;
        setPct(p);
        setBarMsg(
          p < 30 ? 'ENCRYPTING…' : p < 60 ? 'TRANSMITTING…' : p < 90 ? 'FINALIZING…' : 'TRANSMISSION COMPLETE'
        );
        timeoutRef.current = setTimeout(tick, 80);
      } else {
        setBarMsg('TRANSMISSION COMPLETE');
        timeoutRef.current = setTimeout(finishTransmit, 400);
      }
    }
    tick();
  }

  function finishTransmit() {
    setPhase('done');
    const term = termRef.current;
    if (term) {
      SUCCESS_LINES.forEach((line) => renderLine(term, line));
      appendCursor(term);
    }
    if (onComplete) onComplete();
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

  return (
    <div className={styles.wrap}>
      {/* Terminal output area */}
      <div className={styles.term}>
        {phase === 'idle' && !success && (
          <span className={styles.cursor} />
        )}
        {/* Imperative DOM target — only used when typing/done, hidden from React children */}
        <div ref={termRef} style={{ display: phase === 'idle' && !success ? 'none' : 'block' }} />
      </div>

      {/* Progress bar */}
      <ProgressBar
        pct={pct}
        msg={barMsg}
        variant={phase === 'done' || success ? 'success' : 'tx'}
      />

      {/* Buffer readout */}
      <div className={styles.footer}>
        <span>BUFFER // {String(bufferLength).padStart(4, '0')} B</span>
        <span>{success ? 'DELIVERED' : transmitting ? 'TRANSMITTING' : bufferLength > 0 ? 'READY' : 'IDLE'}</span>
      </div>
    </div>
  );
};

export default TransmitTerminal;
