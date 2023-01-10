//业务场景
export const BUSINESS_LIST = [
  {
    title: '跨境电商',
    desc: '无论您是经验丰富还是即将入行的跨境卖家，\n HICUSTOM 都允许您设计、创建和销售定制商品，\n而无需任何前期投资。',
    index: 0,
  },
  {
    title: '国内电商',
    desc: '无论您是小程序卖家还是国内主流电商卖家，\n你可以销售没有库存或风险的高质量商品。\n只需点击几下，\n即可推出新产品、扩大覆盖面。',
    index: 1,
  },
  {
    title: '周边定制 ',
    desc: '无论您是游戏公司、图片资源网站、美培机构、\n宠物机构还是MCN机构、礼品平台，\n您都可以通过销售高质量的周边商品\n轻松获利并与粉丝建立联系。',
    index: 2,
  },
];

//设计器SDK
export const CUSTOM_LIST = [
  {
    title: '专业版设计器',
    desc: '丰富齐全的设计功能，适用于精准设计场景',
    index: 0,
    url: 'https://www.hicustom.com/static/iframe.html?customer_code=18080251408&store_id=220670415&lang=1&zw-from=&pc_design={%22chooseProductFromDetail%22:true,%22chooseDesign%22:true,%22chooseBackground%22:true,%22addText%22:true,%22uploadImage%22:true}&time=1655449699000',
    demoShow: true,
  },
  {
    title: '  简版设计器',
    desc: '简单高效的设计体验，适用于快速设计场景',
    index: 1,
    url: 'https://www.hicustom.com/static/iframeSimple.html?customer_code=18080251408&store_id=220670415&lang=1&zw-from=&pc_design={%22chooseProductFromDetail%22:true}&time=1655449710000',
    demoShow: true,
  },
  {
    title: '移动端设计器',
    desc: '便捷的移动端设计器， 适用于各种移动场景',
    index: 2,
    codeShow: true,
  },
  {
    title: '  自有设计器',
    desc: '自主研发设计器，自定义设计交互与界面风格',
    index: 3,
  },
];

//API开放能力
export const API_LIST = [
  {
    title: '图库管理',
    desc: '上传图片和查看、编辑图片信息',
    list: ['图库上传', '图库分类', '图库列表', '图库详情', '图片编辑'],
    url: 'http://xiaoyaoji.cn/project/1jPL8Hr5Xf7/1jVYTBQtPea',
  },
  {
    title: '空白产品管理',
    desc: '获取空白产品信息',
    list: ['空白产品列表', '空白产品分类', '空白产品信息'],
    url: 'http://xiaoyaoji.cn/project/1jPL8Hr5Xf7/1jVbTm9weiu',
  },
  {
    title: '定制产品管理',
    desc: '设计定制产品和获取定制产品信息',
    list: ['定制产品合成', '定制产品合成预览', '定制产品列表', '定制产品信息'],
    url: 'http://xiaoyaoji.cn/project/1jPL8Hr5Xf7/1jrmrQkCsNM',
  },
  {
    title: '订单管理',
    desc: '创建订单和获取订单信息',
    list: ['创建订单', '订单列表', '平台订单号查询详情', '商户订单号查询详情'],
    url: 'http://xiaoyaoji.cn/project/1jPL8Hr5Xf7/1jVeeG8EBFY',
  },
];

//为什么选择指纹按需定制
export const WHY_LIST = [
  {
    title: '一件起订并代发',
    desc: '避免囤货，按需生产，店铺出单后再找平台下单，零成本也能轻松启动',
  },
  {
    title: '快速响应市场需求',
    desc: '结合时下热点，捕获热门元素，快速响应市场需求，应对市场变化，创作无限流量商品',
  },
  {
    title: '轻松创作商品',
    desc: '利用指纹HICUSTOM设计器轻松创作商品，支持360°全方位查看商品细节',
  },
  {
    title: '高效交付 货发全球',
    desc: '先出单再下单，按需生产，一件货发全球',
  },
];

//简单4步，轻松入驻 HICUSTOM 开放平台
export const SETTLED_LIST = [
  {
    title: '注册账号',
    desc: '注册HICUSTOM账号',
  },
  {
    title: '成为开发者',
    desc: '开通开发者账号\n 根据提示完成实名认证',
  },
  {
    title: '服务接入',
    desc: '按平台规范接入API业务接口\n 或设计器SDK',
  },
  {
    title: '上线使用',
    desc: '在调试完成后\n 您可以发布上线使用',
  },
];

//常见问题
export const QA_LIST = [
  {
    problem: '如何调用设计器SDK？',
    answer: '查看“设计器管理”中的引用代码，在前端页面代码里使用iframe嵌入的形式对接指纹设计器。',
  },
  {
    problem: '设计器SDK如何获取商品数据？',
    answer: '在“独立站-设计器管理-商品设置”中，设置商品的分类、售价，调用SDK可获取该商品数据。',
  },
  {
    problem: '设计器SDK如何添加素材模板？',
    answer: '在“独立站-设计器管理-图库设置”中，将图片添加到图片分类，调用SDK可获取该图库数据。',
  },
  {
    problem: '预览设计器SDK时提示“请设置关联产品”？',
    answer:
      '需要在“设计器管理”中维护“设计器数据”的“商品设置”，将商品添加进店铺分类（需要注意：商品是否支持“简版设计”）。',
  },
  {
    problem: '如何调用API接口？',
    answer:
      '获取 access_token 是调用API接口的第一步，access_token有效期为2小时，超时后可以使用refresh_token进行刷新（有效期2天）。',
  },
  {
    problem: '接口调用次数上限是多少？',
    answer:
      '通过调用接口“接口请求频率”获取所有接口的请求频率上限；如果您需要更高的调用频率，请联系技术人员申请。',
  },
  {
    problem: '如何下单？',
    answer: '通过API“创建订单”接口创建订单，然后在指纹平台的控制台“订单管理”页面完成订单支付。',
  },
  {
    problem: '如何同步订单物流信息？',
    answer: '通过API请求“订单列表”或“订单详情”接口获取订单状态和物流单号。',
  },
];
