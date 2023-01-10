declare global {
  interface Window {
    ZW_KF5_API: any;
    KF5SupportBoxAPI: any;
  }
}

//identifyConfig eg: {
//   name: string,
//   metadata: [
//     { name: '账户编号', value: string },
//     { name: '群组等级', value: string },
//     { name: '季度价格等级', value: string }
//   ]
// }
export interface IdentifyConfigInterface {
  name: string;
  metadata: { name: string; value: string }[];
}

interface KF5ScriptConfig {
  src?: string;
  id?: string;
  'kf5-domain'?: string;
  charset?: string;
  'kchat-id'?: string;
}

interface ZWKF5Options {
  hiddenButton?: boolean;
  scriptConfig?: KF5ScriptConfig;
  identifyConfig?: IdentifyConfigInterface | null;
  isLogin?: boolean;
}

const VISITOR_ID = '1037838'; // 未登录访客默认ID

export class ZWKF5 {
  kf5: any = null;
  options: ZWKF5Options | undefined;
  constructor(options?: ZWKF5Options) {
    this.options = options;
    this.addKF5Script(options?.scriptConfig, options?.isLogin)
      .then(() => {
        this.initConfig();
      })
      .catch(() => {
        console.error('add KF5Script failed');
      });
  }

  initConfig() {
    // 为防止有人从外部随意调用API方法，例如identify方法，隐藏默认全局对象。
    window.ZW_KF5_API = window.KF5SupportBoxAPI;
    this.kf5 = window.KF5SupportBoxAPI;
    window.KF5SupportBoxAPI = null;

    if (this.options?.hiddenButton) {
      this.removeButton();
    }

    if (this.options?.identifyConfig) {
      this.setIdentify(this.options?.identifyConfig);
    }
  }

  addKF5Script(config = {}, isLogin?: boolean) {
    // kf5 script 配置
    const kf5Config = Object.assign(
      {
        src: `//assets-cdn.kf5.com/supportbox/main.js?${new Date().getDay()}`,
        id: 'kf5-provide-supportBox',
        charset: 'utf-8',
        'kf5-domain': 'hicustom.kf5.com',
      },
      isLogin ? undefined : { 'kchat-id': VISITOR_ID },
      config
    );

    // 注入kf5全局对象
    const kf5Script = document.createElement('script');
    Object.keys(kf5Config).forEach((k) => {
      kf5Script.setAttribute(k, kf5Config[k]);
    });
    document.querySelector('body')?.appendChild(kf5Script);

    return new Promise((resolve, reject) => {
      kf5Script.onload = () => {
        resolve(window.KF5SupportBoxAPI);
      };

      kf5Script.onerror = function () {
        reject(undefined);
      };
    });
  }

  setIdentify(config: IdentifyConfigInterface) {
    this.kf5?.ready(() => {
      // 注入用户信息
      this.kf5?.identify(config);
    });
  }

  // 移除默认按钮
  removeButton() {
    this.kf5?.ready(() => {
      this.kf5?.removeButton();
    });
  }

  // 打开客服会话弹窗
  open() {
    return new Promise((resolve) => {
      this.kf5?.ready(() => {
        // 打开
        this.kf5?.open(resolve);
      });
    });
  }
}

// 客服插件
interface KF5PluginOptions {
  hiddenButton?: boolean;
  identify?: IdentifyConfigInterface;
  isLogin?: boolean;
}

const KF5Plugin = {
  install: (app, options?: KF5PluginOptions) => {
    const { hiddenButton = true, identify, isLogin } = options || {};

    const KF5Instance = new ZWKF5({
      hiddenButton,
      identifyConfig: identify,
      isLogin,
    });

    app.config.globalProperties.$kf5 = KF5Instance;
  },
};

export default KF5Plugin;
