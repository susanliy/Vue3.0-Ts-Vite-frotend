import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import components from './unplugin-vue-components';
import svgIcons from './vite-plugin-svg-icons';
import styleImport from './vite-plugin-style-import';
import compression from './vite-plugin-compression';
import legacy from './plugin-legacy';
import configHtmlPlugin from './vite-plugin-html';
import configMockPlugin from './vite-plugin-mock';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';

export default function (viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [];
  vitePlugins.push(vue());
  vitePlugins.push(WindiCSS());
  vitePlugins.push(components());
  vitePlugins.push(svgIcons());
  vitePlugins.push(styleImport());
  vitePlugins.push(PkgConfig());
  vitePlugins.push(OptimizationPersist());
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));
  if (isBuild) {
    vitePlugins.push(compression());
    vitePlugins.push(legacy());
  }

  return vitePlugins;
}
