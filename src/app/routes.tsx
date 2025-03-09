import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./routes/index.tsx'),
  route('/detailed/:uid', './routes/detail.tsx'),
  route('*', './routes/404.tsx'),
] satisfies RouteConfig;
