import styles from './Footer.module.css';

const Footer = ({ left, right }) => {
  return (
    <footer className={styles.footer}>
      <span>{left}</span>
      <span className={styles.tag}>{right}</span>
    </footer>
  );
};

export default Footer;
