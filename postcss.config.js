module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions', // 所有主流浏览器最近10版本用
      ],
      grid: true,
    },
    'postcss-pxtorem': {
      rootValue: 192, // 设计稿1920px/10
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [/node_modules/, 'html', 'video_main'],
      //排除antd样式，由于我给html设置了min-width，所以把html也排除在外不做rem转换
      replace: true,
      mediaQuery: true,
      minPixelValue: 1,
      // exclude: /node_modules/i
    },
  },
};
