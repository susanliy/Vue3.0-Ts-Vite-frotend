import { createRouter, createWebHistory, Router } from 'vue-router';
import { defaultRoutes } from './base';
import { LAST_CLICK_TIME } from '@/enums/cacheEnum';
// import { redirectToWap } from './helper';
import { userStoreWithOut } from '@/store/modules/user';
import { getAppEnvConfig } from '@/utils/env';

const env = getAppEnvConfig();
const router: Router = createRouter({
  history: createWebHistory('/open_platform'),
  routes: defaultRoutes,
});

router.beforeEach(async (to, from, next) => {
  // 更新最后操作时间
  localStorage.setItem(LAST_CLICK_TIME, new Date().getTime().toString());

  // // 设备类型重定向至wap页面
  // if (
  //   navigator.userAgent.match(
  //     /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
  //   )
  // ) {
  //   redirectToWap(to);
  //   return next(false);
  // }

  // 更新用户信息
  const userStore = userStoreWithOut();
  userStore.updateUser();
  // console.log(from.path);

  // 校验页面是否需要登录
  if (to.meta.checkAuth && !userStore.token) {
    if (from.path === '/' || from.path === to.path) {
      return next('/home');
    } else {
      userStore.login(`${location.origin}/zdh-wap${to.fullPath}`);
      return next(false);
    }
  }

  //页面设置缓存,设置路由t进行对比触发接口的更新
  if (!to.query.t && to.meta.keepAlive) {
    if (to.path === from.path && from.query.t) {
      Object.assign(to.query, {
        t: from.query.t,
      });
    } else {
      Object.assign(to.query, {
        t: Date.now(),
      });
    }
    return next(to);
  }

  // 其它
  document.title = (to.meta.title as string) ? (to.meta.title as string) : env.VITE_GLOB_APP_TITLE;
  next();
});

export default router;
