import Cookies from 'js-cookie';
export const setCookie = (key: string, value: any) => {
  return Cookies.set(key, value);
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const removeCookie = (key: string) => {
  console.log(import.meta.env.VITE_WEB_DOMAIN);
  Cookies.remove(key, { domain: import.meta.env.VITE_TOP_DOMAIN || '.hicustom.com' });
};
