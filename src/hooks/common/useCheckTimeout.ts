import { LAST_CLICK_TIME } from '@/enums/cacheEnum';
import { userStoreWithOut } from '@/store/modules/user';
import useEventListener from '@/hooks/common/useEventListener';
import { computed, onMounted, onUnmounted, ref } from 'vue';

export default function useCheckTimeout() {
  useEventListener('mousedown', () => {
    localStorage.setItem(LAST_CLICK_TIME, new Date().getTime().toString());
  });

  const userStore = userStoreWithOut();

  // 退出登录弹窗
  const visibleLogoutModal = ref(false);

  // 校验是否超时未操作
  const checkTime = ref();
  const expireTime = computed(() => {
    return Number(userStore.expireTime || 1) * 60 * 60 * 1000;
  });

  const checkTimeout = async () => {
    const currentTime = new Date().getTime();
    const lastTime = Number(localStorage.getItem(LAST_CLICK_TIME));
    if (currentTime - lastTime > expireTime.value) {
      clearInterval(checkTime.value);
      if (!!userStore.token) {
        //超时
        try {
          await userStore.logout(true);
          visibleLogoutModal.value = true;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  onMounted(() => {
    userStore.updateUser();
    if (!userStore.token) return;
    localStorage.setItem(LAST_CLICK_TIME, new Date().getTime().toString());
    checkTime.value = setInterval(checkTimeout, 1000);
  });

  onUnmounted(() => {
    clearInterval(checkTime.value);
  });

  // 关闭弹窗
  const closeLogoutModal = (nextVisible) => {
    !nextVisible && (visibleLogoutModal.value = false);
  };

  // 关闭弹窗回调
  const closedModal = () => {
    location.reload();
  };

  // 重新登录
  const handleLogin = () => userStore.login();

  return {
    visibleLogoutModal,
    handleLogin,
    closeLogoutModal,
    closedModal,
  };
}
