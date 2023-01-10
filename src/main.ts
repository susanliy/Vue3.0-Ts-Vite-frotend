import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import 'normalize.css/normalize.css';
import '/src/assets/css/Animate.scss';
import { pinia } from './store/index';
import { i18n } from './i18n/index'; //国际化
import 'virtual:svg-icons-register';
import mitt from './utils/mitt';
import './utils/flexible';
import setupPlugins from '@/plugins/index';
// import { initCollectEvent } from './utils/bi'; 埋点
import 'virtual:windi.css';
import lazyImg from './directive/lazyImg';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';

// initCollectEvent();
const app = createApp(App);
app.directive('lazy-img', lazyImg); //懒加载图片
app.use(router);
app.use(pinia);
setupPlugins(app);
app.use(Antd);
app.use(i18n);
app.config.globalProperties.$bus = mitt();
app.mount('#app');
