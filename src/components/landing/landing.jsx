import React from 'react';
import useStyles from './landing.styles.js';
import { createUseStyles, useTheme } from 'react-jss';
import CenteredWrapper from '../wrapper.jsx';
import logo from '../../images/landing.png';

// import './logo.css';
const Landing = (props) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });

  return (
    <CenteredWrapper>
      <img
        className={classes.img}
        src={`${logo}`}
        alt='Welcome to Block Control! Online home for Cara Giulioni. Front End Developer / Visual and Auditory Artist'
      />
    </CenteredWrapper>
  );
};

export default Landing;
