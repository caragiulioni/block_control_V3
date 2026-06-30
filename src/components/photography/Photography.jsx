import Panel from '../shared/Panel.jsx';
import ScrollReveal from '../shared/ScrollReveal.jsx';
import PhotoViewer from './PhotoViewer.jsx';
import { PHOTOS } from './photoData.js';

const Photography = () => {
  return (
    <section style={{ position: 'relative', marginBottom: 'clamp(16px, 3vh, 26px)' }} id="photography">
      <ScrollReveal>
        <Panel
          id="02·C"
          title="GALLERY"
          statusLabel={`${PHOTOS.length} FRAMES`}
          statusVariant="neon"
          collapsible
          defaultOpen={false}
        >
          <p className="srOnly" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
            A collection of personal photography — city streets, nightlife, live events, great food and candid moments, captured in Montréal and around the World. Some of my favorites come from recent trips to Taiwan and Korea.
          </p>
          <PhotoViewer />
        </Panel>
      </ScrollReveal>
    </section>
  );
};

export default Photography;
