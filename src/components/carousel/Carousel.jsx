import { useState, useCallback, useRef } from 'react';
import styles from './Carousel.module.css';

/**
 * Shared carousel component with seamless infinite loop.
 * Clones slides at edges so there's never empty space.
 */
const Carousel = ({
  children,
  slidesPerView = 1,
  loop = true,
  dots = true,
  className = '',
}) => {
  const slides = Array.isArray(children) ? children : [children];
  const total = slides.length;
  const maxIndex = Math.max(0, total - slidesPerView);

  // For loop mode: prepend last `slidesPerView` slides, append first `slidesPerView`
  const cloneCount = loop ? slidesPerView : 0;
  const extendedSlides = loop
    ? [...slides.slice(-cloneCount), ...slides, ...slides.slice(0, cloneCount)]
    : slides;

  // Internal index accounts for the prepended clones
  const [index, setIndex] = useState(loop ? cloneCount : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef(null);
  const touchStart = useRef(null);

  const slideWidth = 100 / slidesPerView;
  const offset = -(index * slideWidth);

  // The "real" index (what the user perceives)
  const realIndex = loop
    ? ((index - cloneCount) % total + total) % total
    : index;

  const goTo = useCallback((newIndex) => {
    setIsTransitioning(true);
    setIndex(newIndex);
  }, []);

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // After transition ends, silently snap if we're on a clone
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (!loop) return;

    if (index <= cloneCount - 1) {
      // Went past the start clones — snap to real end
      setIndex(index + total);
      disableTransition();
    } else if (index >= total + cloneCount) {
      // Went past the end clones — snap to real start
      setIndex(index - total);
      disableTransition();
    }
  };

  const disableTransition = () => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = 'none';
    // Force reflow then re-enable
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = '';
      });
    });
  };

  // Keyboard nav
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  // Touch/swipe
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStart.current = null;
  };

  // Dot click goes to a specific real index
  const goToReal = (realIdx) => {
    goTo(realIdx + cloneCount);
  };

  return (
    <div
      className={`${styles.carousel} ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Carousel"
      aria-roledescription="carousel"
    >
      <div
        className={styles.track}
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTransitionEnd={handleTransitionEnd}
        style={{ transform: `translateX(${offset}%)` }}
      >
        {extendedSlides.map((slide, i) => (
          <div
            key={i}
            className={styles.slide}
            style={{ flex: `0 0 ${slideWidth}%` }}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          className={styles.navBtn}
          onClick={prev}
          aria-label="Previous slide"
          type="button"
        >
          ‹
        </button>

        {dots && total > slidesPerView && (
          <div className={styles.dots} role="tablist" aria-label="Slide selector">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === realIndex ? styles.dotActive : ''}`}
                onClick={() => goToReal(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === realIndex ? 'true' : undefined}
                type="button"
              />
            ))}
          </div>
        )}

        <button
          className={styles.navBtn}
          onClick={next}
          aria-label="Next slide"
          type="button"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Carousel;
