// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosResponse } from 'axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { VAxios } from './Axios';
import { checkStatus } from './checkStatus';
import { useGlobSetting } from '@/hooks/setting';
import { useMessage } from '@/hooks/web/useMessage';
import { RequestEnum, ContentTypeEnum, LoginErrorCodeArray } from '@/enums/httpEnum';
import { isString } from '@/utils/is';
import { getToken } from '@/utils/token';
import { setObjToUrlParams, deepMerge } from '@/utils';
import { joinTimestamp, formatRequestDate } from './helper';
import { t } from '@/i18n/index';
import sha1 from 'js-sha1';
const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;
const { createErrorModal } = useMessage();
import { LAST_CLICK_TIME } from '@/enums/cacheEnum';

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    localStorage.setItem(LAST_CLICK_TIME, new Date().getTime().toString());
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      const reg = RegExp(/mock/);
      if (config?.url?.match(reg)) {
        config.url = `${config.url}`;
      } else {
        config.url = `${apiUrl}${config.url}`;
      }
    }

    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = params;
          //config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestAsyncInterceptors: async (config, _options) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = getToken();
    }

    //时间戳
    const stamp = new Date().getTime();
    const nonce = Math.floor(Math.random() * 999999);
    const sercetKey = `oj878:;;?@#-=UFfHFUwTs!SNJHUFp!{[d}${stamp}${nonce}`;
    const sign = sha1(sercetKey);
    config.headers['sign'] = sign;
    config.headers['stamp'] = stamp;
    config.headers['nonce'] = nonce;
    return config;
  },
  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (response: AxiosResponse<any>) => {
    const res = response.data;
    if (res.type && res.size) {
      //下载文件
      return response;
    } else {
      //return res
      if (res.result_code == '200' || res.result_code === '406') {
        return res;
      } else {
        if (res.result_code == '401') {
          // requestRecord = []
        }
        if (!LoginErrorCodeArray.includes(res.result_code)) {
          checkStatus(res.result_code, res.msg, 'message');
        }

        return res;
      }
    }
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'message';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = t('sys.api.apiTimeoutMessage');
      }
      if (err?.includes('Network Error')) {
        errMessage = t('sys.api.networkExceptionMsg');
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
        } else if (errorMessageMode === 'message') {
          message.error(errMessage);
          //createMessage.error(errMessage)
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as any);
    }

    if (response?.data?.result_code == '401') {
      // requestRecord = []
    }
    if (response?.data?.result_code) {
      checkStatus(response?.data?.result_code, response?.data?.msg, errorMessageMode);
    } else {
      checkStatus(response?.status?.toString(), response?.data?.msg, errorMessageMode);
    }

    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,

        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      opt || {}
    )
  );
}
export const httpRequest = createAxios();

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//     urlPrefix: 'xxx',
//   },
// });
