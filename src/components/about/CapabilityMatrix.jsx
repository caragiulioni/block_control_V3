import Chip from '../shared/Chip.jsx';
import styles from './CapabilityMatrix.module.css';

const GROUPS = [
  {
    label: 'ENGINEERING',
    labelAlt: true,
    variant: 'cyan',
    skills: ['JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'NODE.JS', 'CSS3', 'GIT', 'GRAPHQL', 'REST', 'CONTENTFUL'],
  },
  {
    label: 'AI · WORKFLOW',
    labelAlt: true,
    variant: 'cyan',
    skills: ['AI WORKFLOWS', 'LLM-ASSISTED DEV', 'PROMPT ENGINEERING'],
  },
  {
    label: 'CREATIVE · AV',
    labelAlt: true,
    variant: 'cyan',
    skills: ['PHOTOSHOP', 'ILLUSTRATOR', 'VIDEO EDITING', 'SOUND DESIGN', 'PRODUCTION'],
  },
];

const CapabilityMatrix = () => {
  const totalModules = GROUPS.reduce((sum, g) => sum + g.skills.length, 0);

  return (
    <div className={styles.matrix}>
      <div className={styles.scan} aria-hidden="true" />

      <div className={styles.bar}>
        <span className={styles.barId}>00·B</span>
        <span className={styles.barTitle}>CAPABILITY MATRIX</span>
        <Chip variant="cyan">{totalModules} MODULES</Chip>
      </div>

      <div className={styles.pad}>
        {GROUPS.map((group) => (
          <div className={styles.group} key={group.label}>
            <div className={`${styles.label} ${group.labelAlt ? styles.labelAlt : ''}`}>
              {group.label}
            </div>
            <div className={styles.chips}>
              {group.skills.map((skill) => (
                <Chip key={skill} variant={group.variant}>{skill}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapabilityMatrix;
