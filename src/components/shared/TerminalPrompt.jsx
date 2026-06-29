import styles from './TerminalPrompt.module.css';

/**
 * A terminal-style prompt — either interactive (button) or static (message).
 * If `onClick` is provided, renders as a button. Otherwise renders as a static span.
 *
 * @param {string} highlight - Text to show before the message (colored by variant)
 * @param {string} children - The main message text
 * @param {Function} onClick - Click handler (if omitted, renders as static text)
 * @param {React.Ref} textRef - Optional ref for the text span (for scramble animations)
 * @param {'error'|'success'} variant - Color scheme (default: 'error')
 */
const TerminalPrompt = ({ highlight, children, onClick, textRef, variant = 'error', ariaLabel }) => {
  const isSuccess = variant === 'success';

  const content = (
    <>
      <span className={`${styles.prompt} ${isSuccess ? `${styles.prompt} ${styles.success}` : styles.prompt}`} aria-hidden="true">&gt;</span>
      <span ref={textRef} className={styles.text}>
        {highlight && <span className={isSuccess ? `${styles.highlight} ${styles.success}` : styles.highlight}>{highlight}</span>}
        {' '}{children}
      </span>
      <span className={styles.cursor} aria-hidden="true" />
    </>
  );

  if (!onClick) {
    return <span className={styles.static}>{content}</span>;
  }

  return (
    <button className={styles.btn} onClick={onClick} type="button" aria-label={ariaLabel}>
      {content}
    </button>
  );
};

export default TerminalPrompt;
