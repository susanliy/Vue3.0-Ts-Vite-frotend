import { ROUTES_PATH } from '@/router/constant';
import { getCustomUrl } from '@/utils/util';

export const MENU_CODE_MAP = {
  home: '1',
  documentCenter: '2',
};

export const MENU_CONFIG_LIST = [
  {
    name: '首页',
    menuCode: MENU_CODE_MAP.home,
    path: ROUTES_PATH.HOME,
  },
  {
    name: '文档中心',
    menuCode: MENU_CODE_MAP.documentCenter,
    path: ROUTES_PATH.DOCUMENT_CENTER,
    children: [
      {
        name: '文档中心11',
        menuCode: MENU_CODE_MAP.documentCenter,
        path: ROUTES_PATH.DOCUMENT_CENTER,
      },
    ],
  },
];

// footer配置
export const FOOTER_COLLAPSE_LIST = [
  {
    name: '关于指纹',
    key: '1',
    children: [
      {
        name: '指纹介绍',
        href: getCustomUrl('/frontend/index/aboutUs'),
        key: '1-1',
      },
      {
        name: '服务条款',
        href: getCustomUrl('/frontend/about/serviceClause'),
        key: '1-2',
      },
      {
        name: '隐私条款',
        href: getCustomUrl('/frontend/about/privacyPolicy'),
        key: '1-3',
      },
      {
        name: '法律申明',
        href: getCustomUrl('/frontend/about/legalDeclaration'),
        key: '1-4',
      },
      {
        name: '委托代理协议',
        href: getCustomUrl('/frontend/about/agentAgreement'),
        key: '1-5',
      },
    ],
  },
  {
    name: '帮助中心',
    key: '2',
    children: [
      {
        name: '新手指南',
        href: getCustomUrl('/frontend/HelperDocument/documentList?commonly=2'),
        key: '2-0',
      },
      {
        name: '常见问题',
        href: getCustomUrl('/frontend/HelperDocument/documentList?commonly=2'),
        key: '2-1',
      },
      {
        name: '售后服务条款',
        href: getCustomUrl('/frontend/afterSaleService/index'),
        key: '2-2',
      },
      {
        name: '卖家使用手册',
        href: getCustomUrl('/frontend/HelperDocument/index'),
        key: '2-3',
      },
      {
        name: '设计器使用手册',
        href: getCustomUrl('/frontend/HelperDocument/documentInfo?id=232'),
        key: '2-4',
      },
    ],
  },
  {
    name: '合作联系',
    key: '3',
    children: [
      {
        name: '渠道合作',
        href: getCustomUrl('/wap/index/onlineshop'),
        key: '3-1',
      },
      {
        name: '联系我们',
        href: getCustomUrl('/frontend/index/contactUs'),
        key: '3-2',
      },
      {
        name: '加入我们',
        href: getCustomUrl('/frontend/WebJobs'),
        key: '3-3',
      },
      {
        name: '开放平台',
        href: getCustomUrl('/open_platform/home'),
        key: '3-4',
      },
    ],
  },
];
