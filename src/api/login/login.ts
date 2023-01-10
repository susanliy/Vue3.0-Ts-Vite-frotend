import { httpRequest } from '@/utils/http/axios';
import { ILogout } from './model/loginModel';

//登出
export function logoutApi(data: ILogout) {
  return httpRequest.post({
    url: '/api/p-zdh/uct/member/logout',
    data,
  });
}
