import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppContext from './context/appContext';
import Header from './components/Header';
import useLocalStorage from './hooks/useLocalStorage';

import './styles/App.css';

const client = new QueryClient();

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  useEffect(() => {
    /* update html class with value stored in LS */
    document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('dark');
  }, [/* eslint-disable-line */]);

  function toggleTheme(): void {
    setTheme((theme: "light" | "dark") => {
      /* add/remove class for tailwind */
      document.documentElement.classList[theme === 'dark' ? 'remove' : 'add']('dark');
      return theme === 'dark' ? 'light' : 'dark';
    });
  }
  
  return (
    <QueryClientProvider client={client}>
      <AppContext.Provider value={{ toggleTheme, theme }}>
        <div className="App" data-theme={theme}>
          <Header />
        </div>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
