import { Result } from '#/axios';

import { httpRequest } from '@/utils/http/axios';

// 社群二维码
export function getQrcode() {
  return httpRequest.post<Result<any>>({
    url: '/api/p-zdh/uct/index/qrcode',
  });
}
