import { RouteLocationNormalized } from 'vue-router';
// 重定向至wap页面
export default function (to: RouteLocationNormalized) {
  let query = '';
  if (to.meta.formateWAPQuery) {
    query = to.meta.formateWAPQuery?.(to.query) ?? '';
    query = query ? `?${query}` : '';
  }
  const wapUrl = to.meta.getWapUrl?.(to) || to.meta.wapUrl || '/home';
  const targetUrl = `${import.meta.env.VITE_BASE_URL}/zdh-wap${wapUrl}${query}`;
  location.href = targetUrl;
}
