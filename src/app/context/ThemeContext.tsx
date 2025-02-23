import React, { createContext, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storedTheme = localStorage.getItem('StarComicstheme') as Theme | null;
  const initialTheme: Theme = storedTheme || 'dark';
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const toggleTheme = () => {
    localStorage.setItem(
      'StarComicstheme',
      theme === 'dark' ? 'light' : 'dark'
    );
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
