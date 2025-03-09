import {
  type RouteConfig,
  route,
  // index,
  //layout,
  //prefix,
} from '@react-router/dev/routes';
//import Home from '@/components/home/Home';
// import NotFound from '@/components/notFound/NotFound';

export default [
  route('/', '../components/home/Home.tsx'),
  route('/detailed/:uid', '../components/home/Home.tsx'),
  // pattern ^           ^ module file
] satisfies RouteConfig;
