import * as React from 'react';
import Landing from '../components/landing/landing.jsx';
import About from '../components/about/about-grid.jsx';
import Player from '../components/audio-player/audio-player.jsx';
const Home = () => {
  return (
    <>
      <Landing />
      <Player windowWidth={window.innerWidth} />
      {/* <About /> */}
    </>
  );
};

export default Home;
