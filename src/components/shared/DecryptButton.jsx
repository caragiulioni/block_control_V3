import styles from './DecryptButton.module.css';

const DecryptButton = ({ children, onClick }) => {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
      type="button"
    >
      <span className={styles.prompt}>&gt;</span> {children}
      <span className={styles.cursor} />
    </button>
  );
};

export default DecryptButton;
