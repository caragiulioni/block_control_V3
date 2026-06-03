import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  polaroid: {
    // aspectRatio: '0.8846153846',
    // padding: '10px',
    width: '450px',
    height: '450px',
    // boxShadow: '0 0.55rem 1.05rem rgba(0, 0, 0, 0.5)',
    // transition: 'transform 0.3s',
    backgroundImage:
      "url('https://images.ctfassets.net/twr32x1liljb/7mygQ9p6ocrAlS33BN8BVn/de17cb5501c5b405d2488258da8ecf2e/GLITCHPIC.gif')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    border: '10px solid grey',
    '@media (min-width: 750px)': {},

    // backgroundRepeat: 'repeat',
    // backgroundSize: '50%',
    //   polaroid:hover: { transform: "translateY(-0.35rem)" },
  },

  polaroidCaption: {
    fontSize: '2rem',
    color: 'white',
  },
});

export default useStyles;
