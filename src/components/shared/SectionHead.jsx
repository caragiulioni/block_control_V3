import styles from './SectionHead.module.css';

/** Wraps // in aria-hidden spans for screen reader safety */
const formatEyebrow = (text) => {
  if (!text.includes('//')) return text;
  return text.split('//').map((part, i, arr) => (
    <span key={i}>
      {part}
      {i < arr.length - 1 && <span aria-hidden="true">//</span>}
    </span>
  ));
};

const SectionHead = ({ eyebrow, children, headingRef }) => {
  return (
    <div className={styles.head}>
      <p className={styles.eyebrow}>{formatEyebrow(eyebrow)}</p>
      <h2 ref={headingRef}>{children}</h2>
    </div>
  );
};

export default SectionHead;
