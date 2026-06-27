import { useState, useRef } from 'react';
import { PHOTOS } from './photoData.js';
import styles from './PhotoViewer.module.css';

const PhotoViewer = () => {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const touchStart = useRef(null);
  const filmstripRef = useRef(null);
  const total = PHOTOS.length;

  const goTo = (index) => {
    const next = ((index % total) + total) % total;
    setCurrent(next);
    setLoading(true);
    // Scroll filmstrip to keep active thumb visible
    if (filmstripRef.current) {
      const thumb = filmstripRef.current.children[next];
      if (thumb) {
        thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStart.current = null;
  };

  const currentUrl = PHOTOS[current];

  return (
    <div
      className={styles.viewer}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Photo gallery"
      aria-roledescription="carousel"
    >
      {/* Stage */}
      <div
        className={styles.stage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Blurred backdrop */}
        <div
          className={styles.backdrop}
          style={{ backgroundImage: `url(${currentUrl})` }}
        />
        <div className={styles.scrim} />

        {/* HUD label */}
        <span className={styles.hud}>IMG {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>

        {/* Main image */}
        <div className={styles.fg}>
          {loading && <span className={styles.loading}>LOADING…</span>}
          <img
            src={currentUrl}
            alt={`Photo ${current + 1} of ${total}`}
            className={`${styles.photo} ${loading ? styles.photoHidden : ''}`}
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* Nav buttons */}
        <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={prev} aria-label="Previous photo">‹</button>
        <button className={`${styles.navBtn} ${styles.navNext}`} onClick={next} aria-label="Next photo">›</button>
      </div>

      {/* Filmstrip (desktop only) */}
      <div className={styles.filmstrip} ref={filmstripRef}>
        {PHOTOS.map((url, i) => (
          <button
            key={i}
            className={`${styles.thumb} ${i === current ? styles.thumbActive : ''}`}
            onClick={() => goTo(i)}
            style={{ backgroundImage: `url(${url})` }}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoViewer;
