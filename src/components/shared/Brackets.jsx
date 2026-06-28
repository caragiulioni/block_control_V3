/**
 * Decorative corner brackets.
 * Drop inside any container with `position: relative; overflow: hidden`.
 *
 * @param {number} size - Bracket size in px (default 16)
 * @param {string} color - Border color (default 'var(--cyan)')
 * @param {number} opacity - Opacity (default 0.85)
 * @param {number} offset - Distance from edge in px (default -1)
 */
const Brackets = ({ size = 16, color = 'var(--cyan)', opacity = 0.85, offset = -1 }) => {
  const shared = {
    position: 'absolute',
    width: size,
    height: size,
    border: '2px solid ' + color,
    pointerEvents: 'none',
    opacity,
    zIndex: 2,
  };

  return (
    <>
      <span
        aria-hidden="true"
        style={{ ...shared, top: offset, left: offset, borderRight: 0, borderBottom: 0 }}
      />
      <span
        aria-hidden="true"
        style={{ ...shared, bottom: offset, right: offset, borderLeft: 0, borderTop: 0 }}
      />
    </>
  );
};

export default Brackets;
