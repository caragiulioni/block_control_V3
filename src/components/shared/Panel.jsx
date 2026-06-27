import { useState, useRef } from 'react';
import Chip from './Chip.jsx';
import styles from './Panel.module.css';

const Panel = ({
  id,
  title,
  statusLabel,
  statusVariant = 'neon',
  bgImage,
  collapsible = false,
  defaultOpen = true,
  children,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelRef = useRef(null);
  const isOpen = collapsible ? open : true;

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (next && panelRef.current) {
      // Wait for expand animation to complete (350ms), then scroll
      setTimeout(() => {
        panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 380);
    }
  };

  return (
    <div className={`${styles.panel} ${isOpen ? styles.open : ''}`} ref={panelRef}>
      {bgImage && (
        <div
          className={styles.bg}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      {collapsible ? (
        <button
          className={styles.header}
          onClick={handleToggle}
          aria-expanded={isOpen}
          type="button"
        >
          <span className={styles.id}>{id}</span>
          <span className={styles.title}>{title}</span>
          {statusLabel && (
            <span className={styles.status}>
              <Chip variant={statusVariant}>{statusLabel}</Chip>
            </span>
          )}
          <span className={`${styles.toggle} ${isOpen ? styles.toggleOpen : ''}`} aria-hidden="true">
            +
          </span>
        </button>
      ) : (
        <div className={styles.header}>
          <span className={styles.id}>{id}</span>
          <span className={styles.title}>{title}</span>
          {statusLabel && (
            <span className={styles.status}>
              <Chip variant={statusVariant}>{statusLabel}</Chip>
            </span>
          )}
        </div>
      )}

      <div className={`${styles.body} ${isOpen ? styles.bodyOpen : ''}`}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Panel;
