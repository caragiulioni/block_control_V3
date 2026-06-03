import React from 'react';
import { useTheme } from 'react-jss';
import useStyles from './polaroid.styles.js';

const Polaroid = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <div className={classes.polaroid}>
        <div className={classes.polaroidImage}></div>

        <div className={classes.polaroidCaption}>Last Known Photo</div>
      </div>

      <> {children}</>
    </>
  );
};

export default Polaroid;
