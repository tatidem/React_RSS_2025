import { createBrowserRouter } from 'react-router-dom';
import Home from '@/components/home/Home';
import NotFound from '@/components/notFound/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/detailed/:uid',
    element: <Home showDetailed={true} />,
    errorElement: <NotFound />,
  },
]);

export default router;
