import { httpRequest } from './http/axios';

declare global {
  interface Window {
    collectEvent: any;
  }
}

enum REPORT_KEY {
  Click = 'webclick',
  Search = 'webresearch',
  Share = 'webshare',
  View = 'webpageview',
  Leave = 'webpageleave',
}

export function initCollectEvent() {
  // https://www.volcengine.com/docs/6285/65979
  (function (win, export_obj) {
    win['TeaAnalyticsObject'] = export_obj;
    if (!win[export_obj]) {
      function _collect(...args: any[]) {
        _collect.q.push(args);
      }
      _collect.q = _collect.q || [];
      win[export_obj] = _collect;
    }
    win[export_obj].l = +new Date();
  })(window, 'collectEvent');

  // 注入js
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src =
    'https://lf3-data.volccdn.com/obj/data-static/log-sdk/collect/collect-autotrack-rangers.js';
  document.getElementsByTagName('head')[0].appendChild(script);

  // 配置
  httpRequest
    .get({
      url: '/api/p-zdh/uct/index/buriedPoint',
    })
    .then((res: { data?: { appid: number; customerInfo?: { code?: string } } }) => {
      const hsAppId = res.data?.appid;
      const customerInfo = res.data?.customerInfo;

      window.collectEvent('init', {
        app_id: hsAppId ? Number(hsAppId) : 301741, //  必须替换成申请的 app_id
        channel: 'cn', //数据发送地址
        log: false, // 开启调试日志
        autotrack: false, // 开启全埋点采集，需要热力图及圈选功能可开启
        enable_stay_duration: true, //开启停留时长
      });

      try {
        if (customerInfo?.code) {
          window.collectEvent('config', {
            user_unique_id: customerInfo.code, //设置唯一用户ID
          });
        }
      } catch (e) {
        console.log(e);
      }

      window.collectEvent('start');
    });
}

/**
 *	埋点上报数据函数
 * @param eventName 事件名称
 * 	webclick元素点击 pageview页面浏览 webpageleave访问时长 webvideodisplay视频播放完整 webshare商品分享
 * @param param 上报参数
 * @param url 上报地址
 */
function reportPageData(recordData) {
  const url = recordData.url ? recordData.url : '/v1/behavior/record';
  const pageName = document.title; //页面名
  const paramData = recordData.param;
  const plateName = paramData.plateName ? paramData.plateName : ''; //板块名
  const btnBanner = paramData.btnBanner ? paramData.btnBanner : ''; //按钮名或者bannerTiel
  const elData = {
    element_id: paramData.elementId ? paramData.elementId : '',
    element_name: `${pageName}+${plateName ? plateName + '+' : ''}${btnBanner ? btnBanner : ''}`,
    element_target_url: paramData.element_target_url ? paramData.element_target_url : '',
  };
  const formData = new FormData();
  let defaultData: any = {};
  switch (recordData.eventName) {
    case REPORT_KEY.Click:
      defaultData = elData;
      recordData.param = {};
      break;
    case REPORT_KEY.Share:
      defaultData = {
        share_url: '',
        Course_id: '',
        Course_name: '',
        Course_classification: '',
      };
      break;
    case REPORT_KEY.Search:
      defaultData = {
        search_options: '',
        search_word: '',
        referrer_url: '',
        is_historical_words: false,
        is_hot_words: false,
        is_result: false,
        product_classification: '',
        purchased_price: '',
        product_weight: '',
        delivery_time: '',
        product_type: '',
        apply_gender: '',
        season_attributes: '',
        measurement_attribute: '',
        whole_product: '',
        heat_value: '',
        production_channels: '',
        apply_class: '',
        apply_scene: '',
        design_style: '',
        search_type: '',
      };
      break;
  }
  let web_id = '';
  let ssid = '';
  try {
    window.collectEvent('getToken', (token: { web_id: string; ssid: string }) => {
      web_id = token.web_id;
      ssid = token.ssid;
    });
  } catch (e) {
    console.log(e);
  }
  defaultData.page_name = pageName;
  const param = { ...defaultData, ...recordData.param };
  const resParam = { url: '' };
  Object.keys(param).forEach((item) => {
    if (typeof param[item] == 'string') {
      param[item] ? (resParam[item] = param[item]) : '';
    } else {
      resParam[item] = param[item];
    }
  });
  resParam.url = location.href;
  formData.append('event', recordData.eventName);
  formData.append('params', JSON.stringify(resParam));
  formData.append('web_id', web_id);
  formData.append('ssid', ssid);
  formData.append('local_time_ms', new Date().getTime().toString());
  navigator.sendBeacon(url, formData);
}

//点击事件手动上报
export function handleReportClickBI(data) {
  reportPageData({
    eventName: REPORT_KEY.Click,
    param: {
      element_target_url: data.targetUrl || '',
      plateName: data.plateName || '',
      btnBanner: data.btnBanner || '',
    },
  });
}

//搜索事件手动上报
enum ReportSearchType {
  Manual = 1,
}
interface ReportSearchBIParams {
  search_word: string;
  referrer_url: string;
  is_result: boolean;
  delivery_time: string;
  product_type: string;
  search_type: ReportSearchType;
}
export function handleReportSearchBI(data: ReportSearchBIParams) {
  reportPageData({
    eventName: REPORT_KEY.Search,
    param: Object.assign({}, data),
  });
}

//分享事件手动上报
interface ReportShareBIParams {
  share_url: string;
  Course_id: string;
  Course_name: string;
  Course_classification: string;
}
export function handleReportShareBI(data: ReportShareBIParams) {
  reportPageData({
    eventName: REPORT_KEY.Share,
    param: Object.assign({}, data),
  });
}
