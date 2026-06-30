import { useState, useRef } from 'react';
import Chip from './Chip.jsx';
import Brackets from './Brackets.jsx';
import FileId from './FileId.jsx';
import { formatSlashes } from '../../utils/formatSlashes.jsx';
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
      <Brackets />
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
          <FileId>{id}</FileId>
          <span className={styles.title}>{formatSlashes(title)}</span>
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
          <FileId>{id}</FileId>
          <span className={styles.title}>{formatSlashes(title)}</span>
          {statusLabel && (
            <span className={styles.status}>
              <Chip variant={statusVariant}>{statusLabel}</Chip>
            </span>
          )}
        </div>
      )}

      <div
        className={`${styles.body} ${isOpen ? styles.bodyOpen : ''}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.content} tabIndex={isOpen ? undefined : -1}>
          {isOpen && children}
        </div>
      </div>
    </div>
  );
};

export default Panel;
