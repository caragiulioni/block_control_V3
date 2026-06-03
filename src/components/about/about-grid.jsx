import React from 'react';
import { useTheme } from 'react-jss';
import useStyles from './about.grid.styles.js';
import Polaroid from './polaroid.jsx';
import Folder from './folder.jsx';
import CenteredWrapper from '../wrapper.jsx';
import FeatureText from '../feature-text/feature-text.jsx';
import Player from '../audio-player/audio-player.jsx';

const data = [
  {
    about_main:
      'I love the process of building and constructing things. Seriously, anything - websites and web software, clothing, IKEA furniture, LEGO sets. I thrive on the creative challenge of taking individual pieces and turning them into something complete, functional and satisfying.',
    blurb:
      'For most of my adult life, I organized and DJed live events, the latter of which took me to other countries performing at various points during my career. However, after a lot of time in dark rooms listening to loud music, I started to feel like it was time for a change. More importantly, the world around me was changing and I began to re-evaluate where I wanted to see myself in it. So I started teaching myself how to code. Took some part-time classes, got distracted a bunch along the way but kept finding my way back to it. Finally, I enrolled in a bootcamp and started working professionally in 2021.',
    footer: `Whether turning knobs on music equipment, trouble shooting sound, lighting and A/V gear or coding on my computer, I've been talking to machines for as long as I can remember.`,
  },
];
// const FeatureText = ({ text, classes, variant = 'default' }) => {
// 	//returns a container with the themes primary color as the background
// 	if (variant == 'background') {
// 		return <p className={classes.background}>{text}</p>;
// 	}

// 	if (variant == 'highlight') {
// 		//splits inconing string on every period, to create a container with the themes primary color as a background
// 		//and paragraph tags with a contrast background applied to the span.
// 		//if a single string is passed, it gets up in an array automatically
// 		const sentences = text.match(/[^.]+[.]/g)?.map((str) => str.trim()) || [
// 			text,
// 		];

// 		return (
// 			<div className={classes.highlight}>
// 				{sentences.map((str) => (
// 					<p>
// 						<span>{str}</span>
// 					</p>
// 				))}
// 			</div>
// 		);
// 	}

// 	//returns default block of text
// 	return <p className={classes.text}>{text}</p>;
// };
const About = (props) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });

  return (
    <CenteredWrapper>
      <Folder>
        <div className={classes.gridContainer}>
          <Polaroid
            children={
              <FeatureText text={data[0].about_main} variant='highlight' />
            }
          />
        </div>

        <FeatureText text={data[0].blurb} />
        <FeatureText text={data[0].footer} variant='background' />
      </Folder>
    </CenteredWrapper>
  );
};

export default About;
