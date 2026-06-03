//just a little utility to apply styles at breakpoints quickly in createUseStyles stylesheets / JSS
import * as React from 'react';
const applyMediaQuery = (type = null, styles = {}) => {
  if (typeof type !== 'string' || typeof styles !== 'object') {
    console.error(
      'Error in useMediaQuery hook. Params should come in the forms of an object and a string assigned either tabelet or desk desktop. Both params are required.',
    );
    return {};
  }

  const breakpoint =
    type == 'tablet'
      ? '@media (min-width: 1024px)'
      : type == 'desktop'
        ? '@media (min-width: 1300px)'
        : '@media (max-width: 300px)';

  return {
    [breakpoint]: {
      ...styles,
    },
  };
};

export { applyMediaQuery };
