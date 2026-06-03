import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '../src/providers/ThemeProvider.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  //   <StrictMode>

  <ThemeProvider>
    <App />
  </ThemeProvider>,
  //</StrictMode>
);
