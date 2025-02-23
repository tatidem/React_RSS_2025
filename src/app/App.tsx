import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import useTheme from '../app/context/useTheme';
import ThemeSwitcher from '../comps/ThemeSwitcher';
import '../styles.css';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <Router>
        <ThemeSwitcher />
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
