import * as React from 'react';
import { useTheme } from 'react-jss';
import CenteredWrapper from '../wrapper.jsx';
import useStyles from './folder.styles.js';
const Folder = (props) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });

  return (
    <CenteredWrapper>
      <div className={classes.container} style={{ height: '700px' }}>
        <div className={classes.main}>
          <div className={classes.folder}>
            <div className={classes.paper}>
              <div className={classes.tab}>Hello</div>
              <div className={classes.mask}></div>
              {/* <div className={classes.line}></div> */}
              <div className={classes.wrapper}>
                <div className='content'>{props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CenteredWrapper>
  );
};

export default Folder;
