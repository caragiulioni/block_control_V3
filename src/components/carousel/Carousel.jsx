import { useState, useRef, useCallback } from 'react';
import styles from './Carousel.module.css';

/**
 * Shared carousel with seamless infinite loop.
 * Uses cloned slides at edges for smooth wrapping.
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
  const cloneCount = loop ? slidesPerView : 0;

  const extendedSlides = loop
    ? [...slides.slice(-cloneCount), ...slides, ...slides.slice(0, cloneCount)]
    : slides;

  const [index, setIndex] = useState(cloneCount);
  const [animate, setAnimate] = useState(true);
  const trackRef = useRef(null);
  const touchStartX = useRef(null);
  const isSnapping = useRef(false);

  const slideWidth = 100 / slidesPerView;
  const offset = -(index * slideWidth);

  // Real index for dots/display
  const realIndex = loop
    ? ((index - cloneCount) % total + total) % total
    : index;

  const moveTo = useCallback((newIndex) => {
    if (isSnapping.current) return;
    setAnimate(true);
    setIndex(newIndex);
  }, []);

  const prev = () => moveTo(index - 1);
  const next = () => moveTo(index + 1);

  // After CSS transition ends, check if we need to silently snap
  const handleTransitionEnd = () => {
    if (!loop) return;

    let snapTo = null;

    if (index >= total + cloneCount) {
      snapTo = index - total;
    } else if (index < cloneCount) {
      snapTo = index + total;
    }

    if (snapTo !== null) {
      isSnapping.current = true;
      setAnimate(false);
      setIndex(snapTo);
      // Re-enable animation on next frame
      requestAnimationFrame(() => {
        // Need one more frame for the browser to paint the snap position
        requestAnimationFrame(() => {
          setAnimate(true);
          isSnapping.current = false;
        });
      });
    }
  };

  // Keyboard
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  // Touch swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  // Dot navigation
  const goToReal = (realIdx) => {
    moveTo(realIdx + cloneCount);
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
        style={{
          transform: `translateX(${offset}%)`,
          transition: animate ? 'transform 0.4s ease' : 'none',
        }}
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
