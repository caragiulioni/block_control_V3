import React, {
  useLayoutEffect,
  useState,
  createContext,
  useEffect,
} from 'react';
import { ThemeProvider as JssThemeProvider } from 'react-jss';
import { cyber, neon } from '../themes/themes';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  // Pick the object based on state
  const activeTheme = darkMode ? neon : cyber;

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light',
    );
  }, [darkMode]);

  window.addEventListener('resize', (e) => {
    setScreenWidth(window.innerWidth);
  });

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <JssThemeProvider theme={{ ...activeTheme, screenWidth }}>
        {children}
      </JssThemeProvider>
    </ThemeContext.Provider>
  );
};
