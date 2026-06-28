import styles from './TerminalPrompt.module.css';

/**
 * A terminal-style prompt button with a blinking cursor.
 * Supports highlighted text (like FAIL) via the `highlight` prop.
 *
 * @param {string} highlight - Text to show in neon/red before the message
 * @param {string} children - The main message text
 * @param {Function} onClick - Click handler
 * @param {React.Ref} textRef - Optional ref for the text span (for scramble animations)
 */
const TerminalPrompt = ({ highlight, children, onClick, textRef }) => {
  return (
    <button className={styles.btn} onClick={onClick} type="button">
      <span className={styles.prompt} aria-hidden="true">&gt;</span>
      <span ref={textRef} className={styles.text}>
        {highlight && <span className={styles.highlight}>{highlight}</span>}
        {' '}{children}
      </span>
      <span className={styles.cursor} aria-hidden="true" />
    </button>
  );
};

export default TerminalPrompt;
