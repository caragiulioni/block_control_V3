import { useState, useEffect } from 'react';
import Panel from '../shared/Panel.jsx';
import ScrollReveal from '../shared/ScrollReveal.jsx';
import { LINKS } from './linksData.js';
import styles from './Links.module.css';

const Links = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 600);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section style={{ position: 'relative', marginBottom: 'clamp(16px, 3vh, 26px)' }} id="links">
      <ScrollReveal>
        <Panel
          id="REF"
          title="LINKS // KNOWN ASSOCIATES"
          statusLabel={`${LINKS.length} NODES`}
          statusVariant="neon"
          collapsible
          defaultOpen={!isMobile}
        >
          <div className={styles.grid}>
            {LINKS.map((link, i) => (
              <div className={styles.row} key={i}>
                <a
                  className={styles.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name} <span aria-hidden="true">↗</span>
                </a>
                <p className={styles.desc}>{link.description}</p>
              </div>
            ))}
          </div>
        </Panel>
      </ScrollReveal>
    </section>
  );
};

export default Links;
