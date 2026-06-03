import * as React from 'react';
import { useState, createContext, useContext, useEffect } from 'react';
import { ThemeProvider } from 'react-jss';
import Home from './pages/home.jsx';
import { cyber, neon } from './themes/themes.js';
import Carousel from './components/carousel/carousel.jsx';
import AudioPlayer from './components/audio-player/audio-player.jsx';

function App() {
  return (
    <>
      <Home />
      {/* <button onClick={toggleTheme}>TOGGLE</button> */}
      {/* <Carousel /> */}
    </>
  );
}

export default App;
