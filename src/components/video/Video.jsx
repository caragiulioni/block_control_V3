import { useState } from 'react';
import Panel from '../shared/Panel.jsx';
import ScrollReveal from '../shared/ScrollReveal.jsx';
import styles from './Video.module.css';
import videoThumb from '../../images/video-thumbnail.png';

const YOUTUBE_ID = 'cH2-pnvJCUE';

const Video = ({ onPlay, stopRef }) => {
  const [playing, setPlaying] = useState(false);

  // Register stop function so external callers can kill the video
  if (stopRef) {
    stopRef.current = () => setPlaying(false);
  }

  const handlePlay = () => {
    if (onPlay) onPlay();
    setPlaying(true);
  };

  return (
    <section style={{ position: 'relative', marginBottom: 'clamp(16px, 3vh, 26px)' }} id="video">
      <ScrollReveal>
        <Panel
          id="02·C"
          title="VIDEO"
          statusLabel="01 CLIP"
          statusVariant="neon"
          collapsible
          defaultOpen={false}
        >
          <div className={styles.stage}>
            {/* Scanline overlay — hidden once playing */}
            {!playing && <div className={styles.overlay} />}

            {/* HUD corners */}
            <span className={styles.hudTL}>NODE_MTL — SHIFT RADIO</span>
            <span className={styles.hudTR}>FEED 02·C</span>
            <span className={styles.hudBL}>PROMO <span aria-hidden='true'>//</span> 01</span>
            <span className={styles.hudBR}>
              <span className={playing ? styles.active : styles.standby}>
                {playing ? 'ACTIVE' : 'STANDBY'}
              </span>
            </span>

            {playing ? (
              <iframe
                className={styles.iframe}
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1`}
                title="Block Control — Promo Clip"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                className={styles.poster}
                onClick={handlePlay}
                aria-label="Play video"
                style={{ backgroundImage: `url(${videoThumb})` }}
              >
                <span className={styles.playBtn}>
                  <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                    <path d="M8 5.5v13a1 1 0 001.54.84l10-6.5a1 1 0 000-1.68l-10-6.5A1 1 0 008 5.5z"/>
                  </svg>
                </span>
              </button>
            )}
          </div>
        </Panel>
      </ScrollReveal>
    </section>
  );
};

export default Video;
