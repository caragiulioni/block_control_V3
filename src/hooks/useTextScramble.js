import { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&/<>*';

/**
 * Scrambles the text content of a ref element on trigger change.
 * @param {string} finalText - The text to resolve to
 * @param {any} trigger - Changing this value re-runs the scramble
 * @returns {React.RefObject} ref to attach to the element
 */
export function useTextScramble(finalText, trigger) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      el.textContent = finalText;
      return;
    }

    const len = finalText.length;
    const dur = 1200;
    const t0 = performance.now();

    function frame(now) {
      const p = Math.min(1, (now - t0) / dur);
      const revealed = Math.floor(p * len);
      let out = '';
      for (let i = 0; i < len; i++) {
        const c = finalText[i];
        out += c === ' ' || i < revealed ? c : CHARS[(Math.random() * CHARS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = finalText;
    }

    requestAnimationFrame(frame);
  }, [finalText, trigger]);

  return ref;
}
