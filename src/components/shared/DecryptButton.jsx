import styles from './DecryptButton.module.css';

const DecryptButton = ({ children, onClick }) => {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
      type="button"
    >
      <span className={styles.prompt} aria-hidden="true">&gt;</span> {children}
      <span className={styles.cursor} aria-hidden="true" />
    </button>
  );
};

export default DecryptButton;
