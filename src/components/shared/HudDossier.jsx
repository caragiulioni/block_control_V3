import Chip from './Chip.jsx';
import styles from './HudDossier.module.css';

const HudDossier = ({
  title = 'SUBJECT DOSSIER',
  indicator = 'STBY',
  glyph = 'CG',
  glyphMeta = { visualId: 'REDACTED', ref: 'BLK-CTRL-00' },
  rows = [],
  chips = [],
  spark = true,
  footerLeft = 'FILE 00 // CACHED',
  footerRight = '0xC9·G1',
  children,
}) => {
  return (
    <aside className={styles.hud}>
      <div className={styles.scan} aria-hidden="true" />
      <div className={styles.bar}>
        <span>{title}</span>
        <span className={styles.rec}>
          <i className={styles.recDot} />
          {indicator}
        </span>
      </div>

      <div className={styles.redact}>
        <div className={styles.glyph}>{glyph}</div>
        <div className={styles.rmeta}>
          <div>
            <span className={styles.metaLabel}>VISUAL ID <span aria-hidden="true">//</span></span>{' '}
            <span className={styles.metaValue}>{glyphMeta.visualId}</span>
          </div>
          <div>
            <span className={styles.metaLabel}>REF <span aria-hidden="true">//</span></span> {glyphMeta.ref}
          </div>
        </div>
      </div>

      <div className={styles.rows}>
        {rows.map((row, i) => (
          <div className={styles.row} key={i}>
            <span className={styles.rowKey}>{row.key}</span>
            <span className={`${styles.rowValue} ${row.hot ? styles.hot : ''}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {spark && (
        <svg
          className={styles.spark}
          viewBox="0 0 240 44"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <text x="0" y="9" fill="#4f6b67" fontSize="8" fontFamily="Space Mono">
            {spark === 'flat' ? 'TRAJECTORY // NO SIGNAL' : 'TRAJECTORY // THEN → NOW'}
          </text>
          {spark === 'flat' ? (
            <>
              <line x1="4" y1="38" x2="236" y2="38" stroke="#1f8d7c" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx="236" cy="38" r="3" fill="#4f6b67" />
            </>
          ) : (
            <>
              <polyline
                points="4,38 38,36 70,30 104,31 140,22 176,18 210,9 236,5"
                fill="none"
                stroke="#1f8d7c"
                strokeWidth="1.5"
              />
              <polyline
                points="4,38 38,36 70,30 104,31 140,22 176,18 210,9 236,5"
                fill="none"
                stroke="#3df2d0"
                strokeWidth="1"
                opacity="0.6"
              />
              <circle cx="236" cy="5" r="3" fill="#ff4f7a" />
            </>
          )}
        </svg>
      )}

      {chips.length > 0 && (
        <div className={styles.chips}>
          {chips.map((label, i) => (
            <Chip key={i} variant="neon">
              {label}
            </Chip>
          ))}
        </div>
      )}

      {children}

      <div className={styles.foot}>
        <span>{footerLeft.includes('//')
          ? footerLeft.split('//').map((part, i, arr) => (
              <span key={i}>{part}{i < arr.length - 1 && <span aria-hidden="true">//</span>}</span>
            ))
          : footerLeft
        }</span>
        <span>{footerRight}</span>
      </div>
    </aside>
  );
};

export default HudDossier;
