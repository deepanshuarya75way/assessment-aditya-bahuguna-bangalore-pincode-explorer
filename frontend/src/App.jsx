import ThemeProvider from './components/providers/ThemeProvider';
import HomePage from './pages/HomePage';

/**
 * Root app shell — providers wrap the main page.
 */
const App = () => {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
