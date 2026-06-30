import { useEffect, useRef, useState } from 'react';
import styles from './ScrollReveal.module.css';

/**
 * Wraps a section with scroll-to-decrypt behavior:
 * - Starts faded/shifted
 * - On scroll into view: resolves with optional scanline wipe + text scramble
 * @param {boolean} scanline - Show the scanline wipe animation (default: false)
 */
const ScrollReveal = ({ children, className = '', onResolved, scanline = false }) => {
  const ref = useRef(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setResolved(true);
      if (onResolved) onResolved();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setResolved(true);
          if (onResolved) onResolved();
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.resolve} ${resolved ? styles.resolved : ''} ${className}`}
    >
      {resolved && scanline && <span className={styles.scanline} aria-hidden="true" />}
      {children}
    </div>
  );
};

export default ScrollReveal;
