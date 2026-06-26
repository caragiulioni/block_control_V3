import { useEffect, useRef, useState } from 'react';
import styles from './ScrollReveal.module.css';

/**
 * Wraps a section with scroll-to-decrypt behavior:
 * - Starts blurred/faded/shifted
 * - On scroll into view: resolves with a scanline wipe + optional text scramble
 */
const ScrollReveal = ({ children, className = '', onResolved }) => {
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
      {resolved && <span className={styles.scanline} />}
      {children}
    </div>
  );
};

export default ScrollReveal;
