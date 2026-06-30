/**
 * Character-by-character typewriter effect for terminal lines.
 * Appends DOM elements to a container, one character at a time.
 *
 * @param {HTMLElement} container - The DOM element to type into
 * @param {Array} lines - Array of line arrays, each line is [{text, cls?}, ...]
 * @param {Object} styles - CSS module styles object (for .ok, .bad, .dim classes)
 * @param {Function} onComplete - Called when all lines are typed
 * @param {Object} timeoutRef - A React ref to store the timeout ID (for cleanup)
 * @param {Object} options - { charDelay, longCharDelay, lineDelay }
 */
export function startTypewriter(container, lines, styles, onComplete, timeoutRef, options = {}) {
  const { charDelay = 20, longCharDelay = 7, lineDelay = 150 } = options;

  let li = 0, si = 0, ci = 0;
  let curLine = null, curSpan = null;

  function step() {
    if (li >= lines.length) {
      if (onComplete) onComplete();
      return;
    }
    const line = lines[li];
    if (si === 0 && ci === 0) {
      curLine = document.createElement('div');
      container.appendChild(curLine);
    }
    const seg = line[si];
    if (ci === 0) {
      curSpan = document.createElement('span');
      if (seg.cls && styles[seg.cls]) curSpan.className = styles[seg.cls];
      curLine.appendChild(curSpan);
    }
    curSpan.textContent += seg.text.charAt(ci);
    ci++;
    if (ci >= seg.text.length) {
      si++;
      ci = 0;
      if (si >= line.length) {
        li++;
        si = 0;
        timeoutRef.current = setTimeout(step, lineDelay);
        return;
      }
    }
    timeoutRef.current = setTimeout(step, seg.text.length > 20 ? longCharDelay : charDelay);
  }

  step();
}
