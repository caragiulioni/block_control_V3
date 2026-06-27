import Hero from '../components/hero/Hero.jsx';
import About from '../components/about/About.jsx';
import Demos from '../components/demos/Demos.jsx';
import Player from '../components/audio-player/audio-player.jsx';

const Home = () => {
  return (
    <>
      <Hero />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(40px, 8vh, 90px)' }}>
        <About />
        <Demos />
        <Player windowWidth={window.innerWidth} />
      </main>
    </>
  );
};

export default Home;
