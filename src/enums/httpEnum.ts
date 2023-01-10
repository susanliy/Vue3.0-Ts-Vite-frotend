/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = 1,
  TIMEOUT = 401,
  FORCED_OFFLINE = 'Q1010', //管理员强制下线
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export const RequestCodeMap = {
  '200': '请求成功',
  '400': '接口参数验证错误',
  '401': '未授权',
  '404': '接口不存在',
  '420': '签名错误',
  '421': '没权限',
  '500': '服务端异常',
  '1001': '账号锁定',
  '1200': '异地登录提醒',
  '1000': '账号锁定提醒',
  '1100': '禁用提醒',
  '1300': '平台登录限制',
  '2000': '禁用提醒',
  '3000': '异地登录提醒',
  '4000': '登录异常',
  Y1011: '自动登出',
  Y1012: '登录异常',
  Y1013: '自动登出',
  Q1010: '自动登出',
};
export const LoginErrorCodeArray = [
  '1000',
  '1001',
  '1100',
  '1200',
  '1300',
  '2000',
  'Y1012',
  'Y1011',
  'Y1013',
  'Q1010',
];
