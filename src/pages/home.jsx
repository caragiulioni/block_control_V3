import Hero from '../components/hero/Hero.jsx';
import About from '../components/about/About.jsx';

const Home = () => {
  return (
    <>
      <Hero />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(40px, 8vh, 90px)' }}>
        <About />
      </main>
    </>
  );
};

export default Home;
