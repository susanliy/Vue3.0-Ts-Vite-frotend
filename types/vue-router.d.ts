export {};
declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    title?: string; // 页面标题
    wapUrl?: string; // 映射wap页面地址
    formateWAPQuery?: (query: any) => string; // 设置wap url的query
    getWapUrl?: (to: RouteLocationNormalized) => string; // 动态获取wap 映射地址
    isStaticHeader?: boolean; // header是否静态
    checkAuth?: boolean; // 是否需要校验登录状态
    keepalive?: boolean; // 是否缓存
  }
}
