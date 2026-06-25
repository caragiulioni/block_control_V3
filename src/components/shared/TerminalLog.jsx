import { useEffect, useRef } from 'react';
import styles from './TerminalLog.module.css';

const LOG_LINES = [
  [{ text: '> NODE MTL // carrier ......... ' }, { text: 'LOST', cls: 'bad' }],
  [{ text: '> core.services ............... ' }, { text: 'OFFLINE', cls: 'bad' }],
  [{ text: '> attempting auto-reboot ...... ' }, { text: 'FAIL', cls: 'bad' }],
  [{ text: '> rerouting via backup node ... ' }, { text: 'TIMEOUT', cls: 'bad' }],
  [{ text: '> integrity check ............. ' }, { text: 'PASS', cls: 'ok' }],
  [{ text: '> decryption key .............. ' }, { text: 'REQUIRED', cls: 'bad' }],
  [{ text: '> standby for operator', cls: 'dim' }],
];

const TerminalLog = ({ trigger }) => {
  const termRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    runTypewriter();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [trigger]);

  function runTypewriter() {
    const term = termRef.current;
    if (!term) return;
    term.innerHTML = '';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      LOG_LINES.forEach((line) => {
        const div = document.createElement('div');
        line.forEach((seg) => {
          const span = document.createElement('span');
          if (seg.cls) span.className = styles[seg.cls] || '';
          span.textContent = seg.text;
          div.appendChild(span);
        });
        term.appendChild(div);
      });
      appendCursor(term);
      return;
    }

    let li = 0, si = 0, ci = 0;
    let curLine = null, curSpan = null;

    function step() {
      if (li >= LOG_LINES.length) {
        appendCursor(term);
        return;
      }
      const line = LOG_LINES[li];
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
          timeoutRef.current = setTimeout(step, 180);
          return;
        }
      }
      timeoutRef.current = setTimeout(step, seg.text.length > 20 ? 9 : 26);
    }
    step();
  }

  function appendCursor(el) {
    const cur = document.createElement('span');
    cur.className = styles.cursor;
    el.appendChild(cur);
  }

  return <div className={styles.term} ref={termRef} aria-label="system log" />;
};

export default TerminalLog;
