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
          <p className="sr-only">
            A collection of personal photography — city streets, nightlife, live events, great food and candid moments, captured in Montréal and around the World. Some of Subject's favorites are derived from recent trips to Taiwan and Korea.
          </p>
          <PhotoViewer />
        </Panel>
      </ScrollReveal>
    </section>
  );
};

export default Photography;
