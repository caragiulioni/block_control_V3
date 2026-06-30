import { useEffect, useRef, useState } from 'react';
import styles from './DecryptReveal.module.css';

/**
 * Wraps content that appears after a decrypt click.
 * Applies a scan swipe + blur-to-clear transition on mount.
 */
const DecryptReveal = ({ children }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setShow(true));
  }, []);

  return (
    <div ref={ref} className={`${styles.reveal} ${show ? styles.revealed : ''}`}>
      <span className={styles.scanline} aria-hidden="true" />
      {children}
    </div>
  );
};

export default DecryptReveal;
