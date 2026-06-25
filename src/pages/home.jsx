import * as React from 'react';
import Player from '../components/audio-player/audio-player.jsx';

const Home = () => {
  return (
    <>
      <Player windowWidth={window.innerWidth} />
    </>
  );
};

export default Home;
