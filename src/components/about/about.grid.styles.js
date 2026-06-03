import * as React from 'react';
import { createUseStyles } from 'react-jss';
// import { applyMediaQuery } from '../../utilities/apply-media-query.jsx';

const useStyles = createUseStyles({
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    gridColumnGap: '1rem',
    gridRowGap: '1rem',
    marginBottom: '1rem',
    '@media (min-width: 750px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: '1fr',
    },
    // ...applyMediaQuery('tablet', {
    // 	display: 'grid',

    // }),
  },
  text: {
    color: ({ theme }) => theme.textMain,
    marginBottom: '1rem',
  },

  highlight: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: '1rem',
    fontSize: '1.2rem',
    backgroundColor: ({ theme }) => theme.colors.primary,
    color: ({ theme }) =>
      theme.darkMode ? theme.colors.whiteSmoke : theme.colors.black,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // ...applyMediaQuery('desktop', { padding: '2rem 1rem' }),
    '& span': {
      borderRadius: '3px',
      display: 'block',
      padding: '0.5rem',
      backgroundColor: ({ theme }) => theme.colors.gunmetal,
      height: 'auto',
      color: ({ theme }) => theme.colors.whiteSmoke,
      clipPath:
        'polygon(0 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%)',
      marginBottom: '1rem',
    },
    '& span:last-child': {
      marginBottom: 'none',
    },
  },

  background: {
    height: 'auto',
    width: 'unset',
    backgroundColor: ({ theme }) => theme.colors.primary,
    color: ({ theme }) => theme.textMain,
    padding: '1rem',
    fontSize: '1.2rem',
  },
});

export default useStyles;
