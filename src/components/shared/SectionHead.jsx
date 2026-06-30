import { formatSlashes } from '../../utils/formatSlashes.jsx';
import styles from './SectionHead.module.css';

const SectionHead = ({ eyebrow, children, headingRef }) => {
  return (
    <div className={styles.head}>
      <h2 ref={headingRef}>{children}</h2>
      <p className={styles.eyebrow}>{formatSlashes(eyebrow)}</p>
    </div>
  );
};

export default SectionHead;
