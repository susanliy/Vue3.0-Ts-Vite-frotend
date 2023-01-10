import type { ErrorMessageMode } from 'types/axios';
import { useMessage } from '@/hooks/web/useMessage';
import { t } from '@/i18n/index';
import { removeToken } from '@/utils/token';
import router from '@/router';
import { message } from 'ant-design-vue';
const { createErrorModal } = useMessage();

export function checkStatus(status: string, msg: string, errorMessageMode: ErrorMessageMode): void {
  let errMessage = '';

  switch (status) {
    case '400':
    case '999':
    case '5000':
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case '401':
      removeToken();
      if (router.currentRoute.value.path !== '/home') {
        router.replace('/home' + '?redirect=' + router.currentRoute.value.path);
      } else {
        router.replace('/home');
      }
      break;
    case '403':
      if (msg) {
        errMessage = `${msg}`;
      } else {
        errMessage = t('sys.api.errMsg403');
      }

      //errMessage = '您暂无权限'
      break;
    // 404请求不存在
    case '404':
      if (msg) {
        errMessage = `${msg}`;
      } else {
        errMessage = t('sys.api.errMsg404');
      }

      //errMessage = '请求的资源不存在'
      break;
    case '405':
      if (msg) {
        errMessage = `${msg}`;
      } else {
        errMessage = t('sys.api.errMsg405');
      }

      break;
    case '408':
      if (msg) {
        errMessage = `${msg}`;
      } else {
        errMessage = t('sys.api.errMsg408');
      }
      break;
    case '500':
      if (msg) {
        errMessage = `${msg}`;
      } else {
        errMessage = t('sys.api.errMsg500');
      }

      break;
    case '501':
      if (msg) {
        errMessage = `${msg}`;
      } else {
        errMessage = t('sys.api.errMsg501');
      }

      break;
    case '502':
      if (msg) {
        errMessage = `${msg}`;
      } else {
        errMessage = t('sys.api.errMsg502');
      }

      break;
    case '503':
      if (msg) {
        errMessage = `${msg}`;
      } else {
        errMessage = t('sys.api.errMsg503');
      }

      break;
    case '504':
      if (msg) {
        errMessage = `${msg}`;
      } else {
        errMessage = t('sys.api.errMsg504');
      }

      break;
    case '505':
      if (msg) {
        errMessage = `${msg}`;
      } else {
        errMessage = t('sys.api.errMsg505');
      }

      break;
    default:
      if (msg) {
        errMessage = `${msg}`;
      }

      break;
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
    } else if (errorMessageMode === 'message' && errMessage) {
      message.error(errMessage);
    } else if (status == '404' || status == '500') {
      message.error(errMessage);
    }
  }
}
