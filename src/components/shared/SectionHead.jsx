import styles from './SectionHead.module.css';

const SectionHead = ({ eyebrow, children, headingRef }) => {
  return (
    <div className={styles.head}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 ref={headingRef}>{children}</h2>
    </div>
  );
};

export default SectionHead;
