import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Detailed from '../pages/detailed/Detailed';
import NotFound from '../pages/notFound/NotFound';

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
