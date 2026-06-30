import styles from './ProgressBar.module.css';

/**
 * Shared progress bar component with variant-based coloring.
 * @param {number} pct - Current percentage (0-100)
 * @param {string} msg - Status message label
 * @param {'tx'|'success'|'loading'} variant - Color scheme
 *   - tx: neon/orange barber-pole (transmitting/active)
 *   - success: solid cyan (complete)
 *   - loading: cyan/mint barber-pole (neutral loading)
 */
const ProgressBar = ({ pct = 0, msg = '', variant = 'loading' }) => {
  const fillClass = styles[`fill_${variant}`] || styles.fill_loading;
  const pctClass = variant === 'success' ? styles.pctSuccess : variant === 'tx' ? styles.pctTx : styles.pctLoading;

  return (
    <div className={styles.bar}>
      <div className={styles.lab}>
        <span>{msg}</span>
        <b className={pctClass}>{String(pct).padStart(3, '0')}%</b>
      </div>
      <div className={styles.track}>
        <div className={`${styles.fill} ${fillClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
