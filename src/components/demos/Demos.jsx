import { useState, useEffect } from 'react';
import Chip from '../shared/Chip.jsx';
import Button from '../shared/Button.jsx';
import SectionHead from '../shared/SectionHead.jsx';
import Panel from '../shared/Panel.jsx';
import ScrollReveal from '../shared/ScrollReveal.jsx';
import Carousel from '../carousel/Carousel.jsx';
import { useTextScramble } from '../../hooks/useTextScramble.js';
import styles from './Demos.module.css';

const DEMOS = [
  {
    id: 'DEMO_01',
    title: 'Block Control V2',
    description: 'How far we\'ve come from here...Poowered by GraphQL using Contentful, webhook via Netlify.',
    tech: ['REACT', 'DESIGN', 'CONTENTFUL', 'UI/UX'],
    image: 'https://storage.googleapis.com/blockcontrol-2026/demo%20imgs/block-control%20-legacy.png',
    links: [
      { label: 'GITHUB', url: 'https://github.com/caragiulioni/block_control' },
      { label: 'LIVE', url: 'https://blockcontrol-v2.netlify.app/', variant: 'neon' },
    ],
  },
  {
    id: 'DEMO_02',
    title: 'Streamshare',
    description: 'Bootcamp final project. What are you watching?',
    tech: ['REACT', 'NODE.JS', 'MONGODB', 'UI/UX'],
    image: 'https://storage.googleapis.com/blockcontrol-2026/demo%20imgs/streamshare.png',
    links: [
      { label: 'GITHUB', url: 'https://github.com/caragiulioni/streamshare' },
      { label: 'DEMO', url: 'https://www.youtube.com/watch?v=Zua4m80LqOQ', variant: 'neon' },
    ],
  },
  {
    id: 'DEMO_03',
    title: 'YYZ Tech',
    description: 'E-commerce group project. FE and BE store, collaboration focused.',
    tech: ['REACT', 'REDUX', 'NODE.JS', 'EXPRESS', 'UI/UX'],
    image: 'https://storage.googleapis.com/blockcontrol-2026/demo%20imgs/yyztech.png',
    links: [
      { label: 'GITHUB', url: 'https://github.com/caragiulioni/listed-e-commerce' },
    ],
  },
  {
    id: 'DEMO_05',
    title: 'Memory MayHem',
    description: 'Matching kids game based on Super Mario 3 bonus challenge.',
    tech: ['JAVASCRIPT', 'ILLUSTRATION', 'UI/UX'],
    image: 'https://storage.googleapis.com/blockcontrol-2026/demo%20imgs/memorymayhem.jpg',
    links: [
      { label: 'GITHUB', url: 'https://github.com/caragiulioni/memorymayhem' },
      { label: 'LIVE', url: 'https://memorymayhem.netlify.app/', variant: 'neon' },
    ],
  },
  {
    id: 'DEMO_06',
    title: 'Happy Feet',
    description: 'Avoid the blocks! A little buggy but still cute and fun. Why not?',
    tech: ['JAVASCRIPT', 'CANVAS'],
    image: 'https://storage.googleapis.com/blockcontrol-2026/demo%20imgs/happyfeet.png',
    links: [
      { label: 'GITHUB', url: 'https://github.com/caragiulioni/happyfeetlegacy' },
      { label: 'LIVE', url: 'https://happyfeetgame.netlify.app/', variant: 'neon' },
    ],
  },
];

const Demos = () => {
  const [visible, setVisible] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const headingRef = useTextScramble('DEMOS', visible);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 560) setSlidesPerView(1);
      else if (w <= 860) setSlidesPerView(2);
      else setSlidesPerView(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section className={styles.section} id="demos">
      <ScrollReveal onResolved={() => setVisible(true)}>
        <SectionHead eyebrow="FILE 01 // build log" headingRef={headingRef}>
          DEMOS
        </SectionHead>

        <Panel
          id="01·A"
          title="BUILDS"
          statusLabel={`0${DEMOS.length} ARTIFACTS`}
        >
          <Carousel slidesPerView={slidesPerView} loop dots={false} key={slidesPerView}>
            {DEMOS.map((demo, index) => (
              <DemoCard key={demo.id} demo={demo} index={index} />
            ))}
          </Carousel>
        </Panel>
      </ScrollReveal>
    </section>
  );
};

const DemoCard = ({ demo, index }) => {
  const number = String(index + 1).padStart(2, '0');

  return (
    <article className={styles.card}>
      <div
        className={styles.cardImage}
        style={{ backgroundImage: `url(${demo.image})` }}
      >
        <span className={styles.cardNo}>DEMO_{number}</span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{demo.title}</h3>
        <p className={styles.cardDesc}>{demo.description}</p>
        <div className={styles.cardChips}>
          {demo.tech.map((t) => (
            <Chip key={t} variant="cyan">{t}</Chip>
          ))}
        </div>
        {demo.links.length > 0 && (
          <div className={styles.cardLinks}>
            {demo.links.map((link) => (
              <Button
                key={link.label}
                variant="filled"
                color={link.variant === 'neon' ? 'neon' : 'cyan'}
                href={link.url}
              >
                {link.label} <span aria-hidden="true">↗</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default Demos;
