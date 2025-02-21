import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Detailed from '../pages/detailed';
import NotFound from '../pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="detailed/:uid" element={<Detailed />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};