/**
 * Wraps decorative // in aria-hidden spans so screen readers skip them.
 * Returns the original text if no // is found.
 */
export function formatSlashes(text) {
  if (!text || !text.includes('//')) return text;
  return text.split('//').map((part, i, arr) => (
    <span key={i}>
      {part}
      {i < arr.length - 1 && <span aria-hidden="true">//</span>}
    </span>
  ));
}
