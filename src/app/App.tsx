import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import '../styles.css';

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;