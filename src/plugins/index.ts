import { App } from 'vue';
import { getCookie } from '@/utils/cookie';
import KF5Plugin from './plugin-kf5';
import type { IdentifyConfigInterface } from './plugin-kf5';

// 注入客服插件
const setupKF5 = (app: App<Element>) => {
  const identifyStr = getCookie('kfInfo');
  let identify: IdentifyConfigInterface | null = null;

  try {
    if (identifyStr) {
      identify = JSON.parse(identifyStr) as IdentifyConfigInterface;
      identify.name = identify.name.replace(/\+/g, ' ');
    }
  } catch (e) {
    console.log(e);
  }

  app.use(KF5Plugin, {
    hiddenButton: true,
    identify,
    isLogin: !!getCookie('merchantToken'),
  });
};

const setupPlugins = (app: App) => {
  setupKF5(app);
};

export default setupPlugins;
