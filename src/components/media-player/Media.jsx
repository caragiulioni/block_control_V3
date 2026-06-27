import { useState } from 'react';
import SectionHead from '../shared/SectionHead.jsx';
import Panel from '../shared/Panel.jsx';
import ScrollReveal from '../shared/ScrollReveal.jsx';
import MediaPlayer from './MediaPlayer.jsx';
import { TRACKS } from './trackData.js';
import { useTextScramble } from '../../hooks/useTextScramble.js';

const TOTAL_TRACKS = TRACKS.length;

const Media = ({ pauseRef }) => {
  const [visible, setVisible] = useState(false);
  const headingRef = useTextScramble('MEDIA', visible);

  return (
    <section style={{ position: 'relative', marginBottom: 'clamp(16px, 3vh, 26px)' }} id="media">
      <ScrollReveal onResolved={() => setVisible(true)}>
        <SectionHead eyebrow="FILE 02 // signal archive" headingRef={headingRef}>
          MEDIA
        </SectionHead>

        <Panel
          id="02·A"
          title="PLAYER"
          statusLabel={`${TOTAL_TRACKS.toString().padStart(2, '0')} SOOUNDS`}
          statusVariant="neon"
          collapsible
          defaultOpen={true}
        >
          <MediaPlayer pauseRef={pauseRef} />
        </Panel>
      </ScrollReveal>
    </section>
  );
};

export default Media;
