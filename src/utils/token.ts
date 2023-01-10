import { APP_ONLINE_HOUR, EXPIRES_TIME, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';
import router from '@/router';

export function getToken(): string;
export function getToken(): null;
export function getToken(): string | null;
export function getToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const bearerToken = token ? 'Bearer' + ' ' + token : '';

  return bearerToken;
}

export function setToken(token: string, expires_in: number) {
  localStorage.setItem(TOKEN_KEY, token);
  let time = new Date().getTime();
  time += expires_in * 60 * 60 * 1000;
  localStorage.setItem(EXPIRES_TIME, time + '');
}
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRES_TIME);
  sessionStorage.removeItem('searchParams');
}
export function refreshTokenInfo() {
  const expires_in = localStorage.getItem(APP_ONLINE_HOUR);
  let timeExpires = 0;
  if (expires_in) {
    timeExpires = Number(expires_in);
  }
  let time = new Date().getTime();
  time += timeExpires * 60 * 60 * 1000;
  localStorage.setItem(EXPIRES_TIME, time + '');
}

export function isRefreshToken() {
  const refreshTimeStr = localStorage.getItem(EXPIRES_TIME);
  if (refreshTimeStr) {
    const nowTime = new Date().getTime();
    const refreshTime = Number(refreshTimeStr);
    if (refreshTime - nowTime <= 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}
export function clearInfo() {
  removeToken();
  router.replace('/login' + '?redirect=' + router.currentRoute.value.path);
}

export function getUserInfo() {
  const result = localStorage.getItem(USER_INFO_KEY);
  if (result) {
    return JSON.parse(result);
  } else {
    return null;
  }
}
