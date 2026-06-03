import { createUseStyles } from 'react-jss';
import { applyMediaQuery } from '../utilities/apply-media-query.jsx';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100vw',
    margin: '0 auto',
    marginTop: '25px',

    // ...applyMediaQuery('tablet', { maxWidth: '700px' }),
    ...applyMediaQuery('desktop', { width: '900px' }),
  },
});

export default useStyles;
