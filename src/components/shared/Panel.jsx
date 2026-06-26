import Chip from './Chip.jsx';
import styles from './Panel.module.css';

const Panel = ({
  id,
  title,
  statusLabel,
  statusVariant = 'neon',
  bgImage,
  children,
}) => {
  return (
    <div className={styles.panel}>
      {bgImage && (
        <div
          className={styles.bg}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      <div className={styles.header}>
        <span className={styles.id}>{id}</span>
        <span className={styles.title}>{title}</span>
        {statusLabel && (
          <span className={styles.status}>
            <Chip variant={statusVariant}>{statusLabel}</Chip>
          </span>
        )}
      </div>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Panel;
