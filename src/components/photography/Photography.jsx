import Panel from '../shared/Panel.jsx';
import ScrollReveal from '../shared/ScrollReveal.jsx';
import PhotoViewer from './PhotoViewer.jsx';
import { PHOTOS } from './photoData.js';

const Photography = () => {
  return (
    <section style={{ position: 'relative', marginBottom: 'clamp(16px, 3vh, 26px)' }} id="photography">
      <ScrollReveal>
        <Panel
          id="03·A"
          title="GALLERY"
          statusLabel={`${PHOTOS.length} FRAMES`}
          statusVariant="neon"
          collapsible
          defaultOpen={false}
        >
          <PhotoViewer />
        </Panel>
      </ScrollReveal>
    </section>
  );
};

export default Photography;
