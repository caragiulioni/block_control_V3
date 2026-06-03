import React from 'react';
import useStyles from './wrapper.styles.js';

const CenteredWrapper = ({ children }) => {
	const classes = useStyles();
	return <div className={classes.root}>{children}</div>;
};

export default CenteredWrapper;
