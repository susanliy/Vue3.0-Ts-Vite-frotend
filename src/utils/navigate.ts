import { ROUTES_PATH } from './../router/constant';
import router from '@/router';

//页面跳转的方法封装
export function pushPageHome(query?: any) {
  router.push({
    path: ROUTES_PATH.HOME,
    query,
  });
}

// 打开官网
export function navigateToHiCustom(target?: string | undefined) {
  window.open(import.meta.env.VITE_BASE_URL, target);
}

// 控制台
export function navigateToMerchant() {
  window.open(`${import.meta.env.VITE_BASE_URL}/merchant/index/index`, '_blank');
}

// 免费拿样
export function navigateToFree() {
  location.href = `${import.meta.env.VITE_BASE_URL}/pages/Freesample-2201`;
}

// 帮助
export function navigateToHelp() {
  location.href = `${import.meta.env.VITE_BASE_URL}/frontend/HelperDocument/index`;
}

// 工单
export function navigateToWork() {
  location.href = `${import.meta.env.VITE_BASE_URL}/merchant/workOrder/create?page_name=开放平台`;
}

// 新闻列表
export function navigateToNews() {
  window.open(`${import.meta.env.VITE_BASE_URL}/frontend/crossHeadlines/index`, '_blank');
}

// 新闻详情
export function navigateToNewsDetail(id: string) {
  if (!id) {
    navigateToNews();
  } else {
    window.open(`${import.meta.env.VITE_BASE_URL}/crossHeadlines/${id}`, '_blank');
  }
}
