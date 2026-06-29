import { useRef } from 'react';
import Hero from '../components/hero/Hero.jsx';
import About from '../components/about/About.jsx';
import Demos from '../components/demos/Demos.jsx';
import Media from '../components/media-player/Media.jsx';
import Photography from '../components/photography/Photography.jsx';
import Video from '../components/video/Video.jsx';
import Contact from '../components/contact/Contact.jsx';
import Links from '../components/links/Links.jsx';
import Footer from '../components/footer/Footer.jsx';

const Home = () => {
  const pauseAudioRef = useRef(null);
  const stopVideoRef = useRef(null);

  return (
    <>
      <Hero />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(40px, 8vh, 90px)' }}>
        <About />
        <Demos />
        <Media pauseRef={pauseAudioRef} onPlay={() => stopVideoRef.current?.()} />
        <Video onPlay={() => pauseAudioRef.current?.()} stopRef={stopVideoRef} />
        <Photography />
        <Contact />
        <Links />
        <Footer />
      </main>
    </>
  );
};

export default Home;
