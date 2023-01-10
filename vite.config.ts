import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
import createVitePlugins from './build/vite/plugin/index';

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    plugins: createVitePlugins(viteEnv, isBuild), //插件引入
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: '@',
          replacement: pathResolve('src'), // 这里是将src目录配置别名为 @ 方便在项目中导入src目录下的文件
        },
        {
          find: '#',
          replacement: pathResolve('types'),
        },
        {
          find: '@components',
          replacement: pathResolve('src/components'),
        },
      ],
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        less: {
          modifyVars: {
            'border-radius-base': '4px',
          },
          javascriptEnabled: true,
        },
        scss: {
          additionalData: '@import "./src/assets/scss/index.scss";',
          charset: false,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      // https: false,
      port: VITE_PORT, //启动端口
      open: true, // 是否自动打开浏览器
      cors: true,
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      assetsDir: './open_platform/assets',
      target: 'modules',
      chunkSizeWarningLimit: 1024,
      terserOptions: {
        compress: {
          drop_console: VITE_DROP_CONSOLE, //控制不同环境下的console
        },
      },
    },
  };
});
