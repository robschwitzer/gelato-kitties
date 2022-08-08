import { createContext } from "react";

interface IAppContext {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AppContext = createContext<IAppContext>({
  toggleTheme: () => {},
  theme: 'light'
});

export default AppContext;