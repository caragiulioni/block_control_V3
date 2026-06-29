import styles from './FileId.module.css';

/**
 * Decorative file reference ID (e.g. 00·A, 01·B).
 * Purely visual — hidden from screen readers.
 */
const FileId = ({ children }) => {
  return (
    <span className={styles.id} aria-hidden="true">{children}</span>
  );
};

export default FileId;
