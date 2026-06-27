import { ThemeProvider } from './providers/ThemeProvider.jsx';
import Home from './pages/home.jsx';

function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

export default App;
