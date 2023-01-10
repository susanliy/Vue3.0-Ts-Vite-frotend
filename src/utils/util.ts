import { getCookie } from './cookie';

// 给路由权限用会去掉is_hidden和btn的按钮
export function formatTree(data: any[], pidName: string, rootPid: number) {
  if (data) {
    const root: any = [];
    const idMapping: { [key: string]: number } = data.reduce((acc, el, i) => {
      acc[el.id] = i;
      return acc;
    }, {});
    data.forEach((el) => {
      // 判断根节点
      if (el[pidName] === rootPid) {
        root.push(el);
        return;
      }
      // 用映射表找到父元素
      const parentEl = data[idMapping[el[pidName]]];
      if (parentEl && el.is_hidden == -1 && el.type == 2) {
        parentEl.children = [...(parentEl.children || []), el];
      }
    });
    return root;
  } else {
    return [];
  }
}
//
export function formatTree_v2(data: any[], pidName: string, rootPid: number) {
  if (data) {
    const root: Array<any> = [];
    const idMapping: { [key: string]: number } = data.reduce((acc, el, i) => {
      acc[el.id] = i;
      return acc;
    }, {});
    data.forEach((el) => {
      // 判断根节点
      if (el[pidName] === rootPid) {
        root.push(el);
        return;
      }
      // 用映射表找到父元素
      const parentEl = data[idMapping[el[pidName]]];
      if (parentEl) {
        parentEl.children = [...(parentEl.children || []), el];
      }
    });
    return root;
  } else {
    return [];
  }
}

export function getLocationOrigin() {
  return import.meta.env.VITE_BASE_URL || location.origin;
}

export function openWindow(
  url?: string | URL | undefined,
  target?: string | undefined,
  features?: string | undefined
) {
  let targetUrl = url;
  if (typeof url === 'string' && !/^http/.test(url)) {
    if (/^\//.test(url)) {
      targetUrl = `${getLocationOrigin()}${targetUrl}`;
    } else {
      targetUrl = `${getLocationOrigin()}/${targetUrl}`;
    }
  }
  return window.open(targetUrl, target, features);
}

// 根据token判断是否已经登录
export function isLogin() {
  return !!getCookie('merchantToken');
}

// 登录重定向
export function redirectToLogin(redirectUrl?: string) {
  if (!redirectUrl) redirectUrl = encodeURIComponent(window.location.href);
  location.href = `${getLocationOrigin()}/?referer=${encodeURIComponent(
    redirectUrl
  )}&showLogin=true`;
}

//footer URL跳转
export function getCustomUrl(url?: string | URL | undefined) {
  let targetUrl = url;
  if (typeof url === 'string' && !/^http/.test(url)) {
    if (/^\//.test(url)) {
      targetUrl = `${getLocationOrigin()}${targetUrl}`;
    } else {
      targetUrl = `${getLocationOrigin()}/${targetUrl}`;
    }
  }
  return targetUrl;
}
