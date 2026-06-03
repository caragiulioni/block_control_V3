import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  folder: {
    width: '100vw',
    margin: '0 auto',
    border: ({ theme }) =>
      theme.darkMode
        ? `1px solid ${theme.colors.primary}`
        : `1px solid ${theme.colors.silver}`,
    boxShadow: ({ theme }) => (theme.darkMode ? theme.blurred : 'none'),
    position: 'relative',
    zIndex: -5,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    background: ({ theme }) =>
      theme.darkMode ? theme.colors.black : theme.colors.gunmetal,
  },

  tab: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    width: 200,
    border: ({ theme }) =>
      theme.darkMode
        ? `2px solid ${theme.colors.primary}`
        : `1px solid ${theme.colors.silver}`,
    boxShadow: ({ theme }) => (theme.darkMode ? theme.blurred : 'none'),
    borderBottom: 'none',
    height: 20,
    position: 'absolute',
    top: -25,
    left: 0,
    background: ({ theme }) =>
      theme.darkMode ? theme.colors.black : theme.colors.gunmetal,
    zIndex: -4,
  },
  mask: {
    background: 'black',
    background: ({ theme }) =>
      theme.darkMode ? theme.colors.black : theme.colors.gunmetal,
    height: 20,
    width: 290,
    position: 'absolute',
    top: -7,
    left: -1.2,
    zIndex: -1,
    marginLeft: 2,
    clipPath:
      'polygon(0 0, 69% 0, 69% 39%, 100% 41%, 100% 97%, 0 100%, 0% 70%, 0% 30%)',
  },
  wrapper: {
    padding: '1rem',
    margin: '1rem',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  line: {
    height: 5,
    width: '100%',
    borderTop: '1px solid #7bffe1',
    boxShadow: 'inset 0 10px 10px -10px #7bffe1',
    top: 4,
    position: 'absolute',
    zIndex: 1000,
    transform: 'scale(-1, -1)',
  },
});

export default useStyles;
