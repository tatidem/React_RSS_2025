import { type Config } from '@react-router/dev/config';

export default {
  ssr: true,
  appDirectory: './src/app',
  // async prerender() {
  //   return ['/'];
  // },
} satisfies Config;
