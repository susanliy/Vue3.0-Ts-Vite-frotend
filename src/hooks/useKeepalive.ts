import { onActivated, onDeactivated } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

export default function useKeepalive() {
  const $app = document.querySelector('#app');
  let scrollTop = 0; //记录滚动条的位置

  onActivated(() => {
    if ($app) {
      $app.scrollTop = scrollTop;
    }
    console.log('onActivated', location.href);
  });

  onBeforeRouteLeave((to, from) => {
    console.log('onBeforeRouteLeave', to, from);
    scrollTop = $app?.scrollTop || 0;
  });

  onDeactivated(() => {
    console.log('onDeactivated', scrollTop, location.href);
  });
}
