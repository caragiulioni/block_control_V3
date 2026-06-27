import Hero from '../components/hero/Hero.jsx';
import About from '../components/about/About.jsx';
import Demos from '../components/demos/Demos.jsx';
import MediaPlayer from '../components/media-player/MediaPlayer.jsx';

const Home = () => {
  return (
    <>
      <Hero />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(40px, 8vh, 90px)' }}>
        <About />
        <Demos />
        <section style={{ maxWidth: 'var(--maxw)', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>
          <MediaPlayer />
        </section>
      </main>
    </>
  );
};

export default Home;
