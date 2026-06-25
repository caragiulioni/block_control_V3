import { useState, useEffect } from 'react';
import styles from './TopBar.module.css';

const TopBar = ({ left, right }) => {
  const [time, setTime] = useState(formatTime());

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.topbar}>
      <span>{left}</span>
      <span>
        {right} <span className={styles.clock}>{time}</span>
      </span>
    </div>
  );
};

function formatTime() {
  return new Date().toLocaleTimeString('en-GB');
}

export default TopBar;
