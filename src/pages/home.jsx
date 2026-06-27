import Hero from '../components/hero/Hero.jsx';
import About from '../components/about/About.jsx';
import Demos from '../components/demos/Demos.jsx';
import Media from '../components/media-player/Media.jsx';

const Home = () => {
  return (
    <>
      <Hero />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(40px, 8vh, 90px)' }}>
        <About />
        <Demos />
        <Media />
      </main>
    </>
  );
};

export default Home;
