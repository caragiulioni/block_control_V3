import styles from './Chip.module.css';

const Chip = ({ children, variant = 'neon' }) => {
  const className = `${styles.chip} ${styles[variant] || ''}`;
  return <span className={className}>{children}</span>;
};

export default Chip;
