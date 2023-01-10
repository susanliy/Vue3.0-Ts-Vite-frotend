import { defineStore } from 'pinia';
import { pinia } from '..';
import { getCookie, removeCookie } from '@/utils/cookie';
import { logoutApi } from '@/api/login/login';
import useTryCatch from '@/hooks/common/useTryCatch';
import { LAST_CLICK_TIME } from '@/enums/cacheEnum';
import Cookies from 'js-cookie';

const COOKIE_KEY_LIST = [
  { cookie: 'merchantToken', store: 'token', isObject: false },
  { cookie: 'merchant_token_expire', store: 'expireTime', isObject: false },
  { cookie: 'merchantInfo', store: 'userInfo', isObject: true },
  { cookie: 'kfInfo' },
];

interface userInfo {
  id: number;
  code?: number;
  group_id: number;
  avatar?: string;
  username?: string;
  mobile?: string;
  email?: string;
  level?: number;
  is_private?: number;
  is_verification?: number;
  verify_type?: number;
  status?: number;
  realname?: string;
  created?: string | null;
  last_login_time?: string | null;
  locations?: Array<string>;
  keep_alive?: number;
  name?: string;
  merchantSSID: string;
}

interface UserState {
  userInfo: Nullable<userInfo>;
  expireTime: string;
  token: Nullable<string>;
  userName: string;
}

export const userStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    expireTime: '',
    token: '',
    userName: '',
  }),
  getters: {},
  actions: {
    async updateUser() {
      const lastToken = this.token;
      COOKIE_KEY_LIST.forEach((cookieItem) => {
        try {
          if (cookieItem.store && Object.prototype.hasOwnProperty.call(this, cookieItem.store)) {
            if (cookieItem.isObject) {
              this[cookieItem.store] = getCookie(cookieItem.cookie)
                ? JSON.parse(getCookie(cookieItem.cookie) as string)
                : null;
            } else {
              this[cookieItem.store] = getCookie(cookieItem.cookie);
            }
          }
        } catch (err) {
          console.error(err);
        }
      });
      if (!this.userName) this.userName = this.userInfo?.name ?? '';
      if (this.userInfo && this.token && lastToken !== this.token) {
        // cookie中的name不准确，如出现+号--转义+为空格
        const enCodeUserInfo = this.userName.replace(/\+/g, ' ');
        this.userName = JSON.parse(enCodeUserInfo);
      }
      if (!this.token) {
        // token丢失 清空cookie
        this.resetUserStore();
      }
    },
    resetUserStore() {
      COOKIE_KEY_LIST.forEach((cookieItem) => {
        removeCookie(cookieItem.cookie);
        if (cookieItem.store && Object.prototype.hasOwnProperty.call(this, cookieItem.store)) {
          this[cookieItem.store] = cookieItem.isObject ? null : '';
        }
      });
      this.userName = '';
      // fix: 开放平台没有登陆token时，清空官网凭证
      Cookies.remove('PHPSESSID');
    },
    async logout(unreload?: boolean) {
      if (this.userInfo?.merchantSSID && this.token) {
        const { merchantSSID } = this.userInfo;
        const [_, error] = await useTryCatch(
          logoutApi({
            token: this.token,
            merchantSSID: merchantSSID,
          })
        );
        if (error) return console.log(error);
      }

      //重置用户的信息
      this.resetUserStore();
      localStorage.removeItem(LAST_CLICK_TIME);
      !unreload && location.reload();
    },
    // 点击登录跳转首页，登录完再回来
    login(redirectUrl?: string) {
      this.resetUserStore();
      if (!redirectUrl) redirectUrl = window.location.href;
      const loginUrl = `${
        import.meta.env.VITE_BASE_URL || location.origin
      }/?referer=${encodeURIComponent(redirectUrl)}&showLogin=true`;
      if (history?.state?.back) {
        location.replace(loginUrl);
      } else {
        location.href = loginUrl;
      }
    },
  },
});

// Need to be used outside the setup
export const userStoreWithOut = () => {
  return userStore(pinia);
};
