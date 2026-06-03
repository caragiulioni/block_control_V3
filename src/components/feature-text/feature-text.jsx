import React from 'react';
import { useTheme } from 'react-jss';
import useStyles from './feature-text.styles.js';

const FeatureText = ({ text, variant = 'default' }) => {
	const theme = useTheme();
	const classes = useStyles({ theme });

	//returns a container with the themes primary color as the background
	if (variant == 'background') {
		return <p className={classes.background}>{text}</p>;
	}

	if (variant == 'highlight') {
		//splits inconing string on every period, to create a container with the themes primary color as a background
		//and paragraph tags with a contrast background applied to the span.
		//if a single string is passed, it gets up in an array automatically
		const sentences = text.match(/[^.]+[.]/g)?.map((str) => str.trim()) || [
			text,
		];

		return (
			<div className={classes.highlight}>
				{sentences.map((str) => (
					<p>
						<span>{str}</span>
					</p>
				))}
			</div>
		);
	}

	//returns default block of text
	return <p className={classes.text}>{text}</p>;
};

export default FeatureText;
