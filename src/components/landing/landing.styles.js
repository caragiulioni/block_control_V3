import React from 'react';
import { createUseStyles } from 'react-jss';

let baseTitle = {
	mask: 'linear-gradient(-45deg,#0000 10px,#000 0 calc(100% - 0px),#0000 0)',
	backgroundColor: ({ theme }) => theme.colors.primary,
	padding: '5px 14px',
};
const useStyles = createUseStyles({
	img: {
		width: '100%',
		maxWidth: 1000,
	},
});

export default useStyles;
