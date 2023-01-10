import type { RouteRecordRaw } from 'vue-router';
import { ROUTES_PATH } from './constant';

export const defaultRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: ROUTES_PATH.HOME,
    name: 'index',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        name: 'home',
        path: ROUTES_PATH.HOME,
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          wapUrl: '/home',
          keepalive: true,
        },
      },
    ],
  },
  {
    name: 'videoEmpty',
    path: ROUTES_PATH.VIDEO_ERROR,
    component: () => import('@/views/errorPage/Video404.vue'),
    meta: {
      title: 'video_404',
      wapUrl: '/video-404',
    },
  },
  {
    name: '404',
    path: ROUTES_PATH.ERROR,
    component: () => import('@/views/errorPage/Error404.vue'),
    meta: {
      title: '404',
      wapUrl: '/404',
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: ROUTES_PATH.ERROR,
  },
];
