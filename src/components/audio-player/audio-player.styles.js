import { createUseStyles } from 'react-jss';
import { applyMediaQuery } from '../../utilities/apply-media-query';

const useStyles = createUseStyles((theme) => ({
  root: {
    color: 'white',
    fontSize: '40px',
    width: '100%',
    height: 'auto',
    backgroundColor: theme.colors.gunmetal,
    ...applyMediaQuery('tablet', {
      display: 'flex',
      width: '80%',
      height: '600px',
    }),
  },

  player: {
    width: '100%',
    ...applyMediaQuery('tablet', { width: '50%', height: '600px' }),
  },
  thumbnailMain: {
    width: '100%',
    height: () => {
      const width = theme.screenWidth;
      console.log('width: ', width);
      return width < 500 ? `${width}` : '530px';
    },
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 1,
    ...applyMediaQuery('tablet', {
      display: 'flex',
    }),
  },

  //these are mostly overwriting some of the default styles for the main controls
  controls: {
    '& .rhap_time': {
      fontSize: '.8rem',
    },
    '& .rhap_container': {
      padding: '5px 10px',
    },

    '& .rhap_repeat-button': {
      fontSize: '1.2rem',
      width: 'unset',
      marginRight: '0px',
      // width: 26px;
      // height: 26px;
    },

    '& .rhap_stacked .rhap_controls-section': {
      marginTop: 0,
      flex: '2 2 50%',
      justifyContent: 'space-between',
    },
  },

  listItemWrapper: {
    display: 'flex',
    transition: '0.2s ease-in-out',
    '& span': {
      fontSize: '15px',
    },
    '& a .action-buttons': {
      fontSize: '30px',
    },
    '& .favorite': {
      fontSize: '25px',
      marginBottom: '5px',
      marginLeft: '20px',
    },
    '&:hover': {
      transition: '0.2s ease-in-out',
      backgroundColor: 'rgba(0, 0, 0, 0.5) !important',
    },
  },

  //change to hover
  listItemIcon: {
    transition: '0.2s ease-in-out',
    position: 'relative',
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
  },

  playlistThumbnail: {
    width: '60px',
    height: '60px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    transition: '0.2s ease-in-out',
    '& .material-icons': {
      height: '100%',
      width: '100%',
      fontSize: '40px',
      position: 'absolute',
      zIndex: 10,
    },
    '& .pause, .playing': {
      marginTop: '10px',
      marginLeft: '8px',
    },
    '& .play': {
      fontSize: '45px',
      marginTop: '6px',
      marginLeft: '6px',
    },
  },

  listItemDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    // padding: '0px 15px',
  },

  listItemText: {
    '&:first-child, :last-child': {
      display: 'block',
    },

    '&:first-child .active': {
      color: 'green',
    },
    // '&:hover :first-child': {
    //   transition: 'all 0.3 ease',
    //   color: 'green',
    // },
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& span, a': {
      color: 'white',
    },
    zIndex: 10,
  },
}));

export default useStyles;
