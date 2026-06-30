import { useEffect, useRef, useState } from 'react';
import ProgressBar from './ProgressBar.jsx';

const RebootBar = ({ trigger }) => {
  const [pct, setPct] = useState(0);
  const [msg, setMsg] = useState('INITIALIZING…');
  const timeoutRef = useRef(null);

  useEffect(() => {
    startLoop();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [trigger]);

  function startLoop() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setPct(84);
      setMsg('HANDSHAKE STALLED — KEY REQUIRED');
      return;
    }

    let p = 0;
    const stall = 80 + Math.floor(Math.random() * 10);

    function tick() {
      if (p < stall) {
        p += Math.max(1, Math.round((stall - p) * 0.12));
        if (p > stall) p = stall;
        setPct(p);
        setMsg(p < 30 ? 'INITIALIZING…' : p < 60 ? 'RESTORING CORE…' : 'NEGOTIATING HANDSHAKE…');
        timeoutRef.current = setTimeout(tick, 260);
      } else {
        setMsg('HANDSHAKE STALLED — KEY REQUIRED');
        timeoutRef.current = setTimeout(() => {
          p = 0;
          setPct(0);
          setMsg('RETRYING…');
          timeoutRef.current = setTimeout(tick, 500);
        }, 2600);
      }
    }
    tick();
  }

  return <ProgressBar pct={pct} msg={msg} variant="tx" />;
};

export default RebootBar;
