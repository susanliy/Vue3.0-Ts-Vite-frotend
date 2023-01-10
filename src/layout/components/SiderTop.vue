<template>
  <!-- 展开 -->
  <div class="sider_box animate__animated" :class="showSider ? 'isShow' : 'isHide'">
    <div class="sider-detail">
      <!-- 免费领样 -->
      <img class="sider-top" src="@/assets/images/sider_top.png" @click="navigateToFree()" />
      <!-- 列表 -->
      <ul class="sider-list">
        <li class="sider-item" @click="openKF">
          <IconFont class="item-icon" name="sider_service" />
          <span class="sider-text">在线客服</span>
          <div v-if="!isLogin" class="sider_dialog">
            <div class="sider-dialog__content">
              <div class="kf-tips">
                <p>已有指纹账号</p>
                <p>请<span class="kf-login" @click="handleLogin()">登录</span>咨询专属客服</p>
              </div>
              <p class="registry-tips">尚未注册，从这里开始</p>
              <div class="kf-btn" @click="openKF5">了解指纹</div>
              <div class="kf-phone">
                <IconFont class="kf-icon" name="icon_telephone" />
                <span>400-8899-560</span>
              </div>
            </div>
          </div>
        </li>
        <li class="sider-item" @click="navigateToHelp()">
          <IconFont class="item-icon" name="sider_help" />
          <span class="sider-text">帮助中心</span>
        </li>
        <li class="sider-item">
          <IconFont class="item-icon" name="sider_teacher" />
          <span class="sider-text">专属导师</span>
          <div class="sider_dialog">
            <div class="sider-dialog__content">
              <img class="dialog-qrcode" :src="list?.img_url" />
              <p class="dialog-desc" v-html="list?.title"></p>
            </div>
          </div>
        </li>
        <li class="sider-item">
          <IconFont class="item-icon" name="sider_attention" />
          <span class="sider-text">关注指纹</span>
          <div class="sider_dialog">
            <div class="sider-dialog__content">
              <img class="dialog-qrcode" src="@/assets/images/ooficial_account.png" />
              <div class="dialog-desc">
                <p>扫码关注公众号</p>
                <p>了解最新资讯</p>
              </div>
            </div>
          </div>
        </li>
        <li v-if="isLogin" class="sider-item" @click="navigateToWork()">
          <IconFont class="item-icon" name="sider_list" />
          <span class="sider-text">提交工单</span>
        </li>
        <transition name="fade">
          <li v-if="showBackup" class="sider-item" @click="handleScrollTop">
            <IconFont class="item-icon" name="sider_top" />
          </li>
        </transition>
      </ul>
      <!-- 关闭按钮 -->
      <div class="sider-bottom" @click="showSider = false">
        <IconFont class="sider-bottom__icon" name="sider_more" />
      </div>
    </div>
  </div>
  <!-- 收起 -->
  <div
    class="sider-simple animate__animated"
    :class="!showSider ? 'animate__fadeIn ' : ''"
    :style="{ display: !showSider ? 'flex' : 'none' }"
    @click="showSider = true"
  >
    <span class="icon_box">
      <IconFont class="add-icon" name="pag_left" />
    </span>
    <span class="text">显 示 客 服</span>
  </div>
</template>
<script setup lang="ts">
  import { ref, getCurrentInstance, ComponentPublicInstance, watch, Ref, computed } from 'vue';
  import _ from 'lodash';
  import { getCookie } from '@/utils/cookie';
  import { useScrollTo } from '@/hooks/useScrollTo';
  import { navigateToFree, navigateToHelp, navigateToWork } from '@/utils/navigate';
  import useEventListener from '@/hooks/common/useEventListener';
  import { userStoreWithOut } from '@/store/modules/user';
  const userStore = userStoreWithOut();
  const handleLogin = () => {
    userStore.login();
  };

  interface SiderTopProps {
    list: {
      img_url?: string;
      title?: string;
    };
  }
  defineProps<SiderTopProps>();

  const proxy = getCurrentInstance()?.proxy as ComponentPublicInstance<any>;
  const showSider = ref(true);

  const isLogin = ref(!!getCookie('merchantToken'));
  watch(
    () => showSider.value,
    () => {
      if (isLogin.value) {
        isLogin.value = !!getCookie('merchantToken'); // 检查登录状态
      }
    }
  );

  // 回到顶部
  const scrollTop = ref(0);
  const pageScroll = () => {
    let $app: any = document.querySelector('#app');
    scrollTop.value = $app.scrollTop;
  };
  const showBackup = computed(() => scrollTop.value > 100);
  useEventListener('scroll', pageScroll, window, true);
  const appContainer = ref(document.querySelector('#app')) as Ref<HTMLElement>;
  const { start } = useScrollTo({ el: appContainer, to: 0 });
  const handleScrollTop = () => {
    if (document.querySelector('#app')) {
      appContainer.value = document.querySelector('#app') as HTMLElement;
      start();
    }
  };

  // 在线客服
  const openKF5 = () => {
    proxy.$kf5.open();
  };
  const openKF = () => {
    if (!isLogin.value) return; // 未登录:侧边栏不允许点击，只允许点击浮窗内的按钮
    openKF5();
  };
</script>
<style lang="scss" scoped>
  $box-border-radius: 45px;
  .isHide {
    transform: translateX(200px);
    transition: all ease 0.35s;
  }
  .isShow {
    transform: translateX(0px);
    transition: all ease 0.35s;
  }
  // 展开样式
  .sider_box {
    position: fixed;
    right: 48px;
    bottom: 16%;
    z-index: 999;
  }

  .sider-detail {
    position: relative;
    box-sizing: border-box;

    .sider-top {
      width: 148px;
      cursor: pointer;
      position: absolute;
      max-width: inherit;
      top: -50px;
      left: 50%;
      transform: translateX(-53%);
      z-index: 4;
    }

    .sider-bottom {
      cursor: pointer;
      height: 22px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 5;

      .sider-bottom__icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 60px !important;
        pointer-events: none;
      }
    }
  }

  .sider-list {
    width: 90px;
    border: 3px solid #0453f3;
    border-radius: $box-border-radius;
    position: relative;
    background: #eff4ff;
    display: flex;
    flex-direction: column;

    .item-icon {
      font-size: 20px !important;
      color: #a5b1d0;
      display: block;
      margin-bottom: 2px;
    }

    .sider-item {
      position: relative;
      cursor: pointer;
      z-index: 3;
      font-weight: 500;
      color: #5c6478;
      height: 85px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: content-box;

      &:hover {
        background: #fff;
        color: #5c6478;
        font-weight: 600;
        .item-icon {
          color: #0453f3;
        }
        .sider_dialog {
          display: block !important;
        }
      }
      &:first-child {
        border-top-right-radius: $box-border-radius;
        border-top-left-radius: $box-border-radius;
        padding-top: 90px;
      }
      &:last-child {
        border-bottom-right-radius: $box-border-radius;
        border-bottom-left-radius: $box-border-radius;
        padding-bottom: 10px;
      }
      &:not(:last-child) {
        border-bottom: 1px solid #dfe6f5;
      }
    }
  }

  .sider_dialog {
    cursor: default;
    display: none;
    position: absolute;
    left: 0;
    transform: translateX(-100%);

    .sider-dialog__content {
      position: relative;
      background: #ffffff;
      box-shadow: 0px 39px 65px 0px rgba(179, 185, 191, 0.3);
      border: 1px solid #f2f2f2;
      font-weight: 500;
      color: $title-color;
      padding: 14px;
      margin-right: 35px;
      border-radius: 10px;
      text-align: center;
      &::before {
        content: '';
        width: 0px;
        height: 0px;
        border-top: 10px solid transparent;
        border-left: 10px solid #fff;
        border-bottom: 10px solid transparent;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -10px;
      }
    }

    .dialog-desc {
      font-size: 14px;
      padding-top: 10px;
      font-weight: 600;
      white-space: nowrap;
    }

    .dialog-qrcode {
      width: 122px;
    }

    .kf-tips {
      padding-bottom: 15px;
      border-bottom: 1px solid #f0f0f0;
      p {
        white-space: nowrap;
        font-size: 12px;
        font-weight: 400;
        color: #495b6e;
        line-height: 1;
        &:not(:last-child) {
          margin-bottom: 5px;
        }
      }
    }
    .kf-btn {
      color: #fff;
      font-weight: normal;
      cursor: pointer;
      width: 96px;
      height: 32px;
      background: #0453f3;
      border-radius: 16px;
      margin: 0 auto;
      line-height: 32px;
      font-size: 12px;
    }
    .kf-phone {
      white-space: nowrap;
      display: flex;
      align-items: center;
      margin-top: 10px;
      font-size: 12px;
      font-weight: 400;
      color: $title-color;
      line-height: 18px;
      justify-content: center;
    }
    .kf-icon {
      font-size: 14px !important;
      margin-right: 5px;
    }
  }

  // 收起 样式
  .sider-simple {
    cursor: pointer;
    position: fixed;
    right: 0;
    bottom: 22%;
    z-index: 999;
    width: 44px;
    background: #0453f3;
    flex-direction: column;
    border-radius: 20px 0px 0px 20px;
    justify-content: center;
    display: flex;
    padding: 13px 0;
    align-items: center;
    justify-content: center;
    .icon_box {
      display: inline-block;
      width: 18px;
      line-height: 18px;
      text-align: center;
      height: 18px;
      background: #ffffff;
      border-radius: 50%;
    }
    .text {
      width: min-content;
      color: #ffffff;
      margin-top: 6px;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .add-icon {
    font-size: 10px !important;
    color: #0453f3;
    :deep(svg) {
      vertical-align: baseline;
    }
  }

  .kf-login {
    color: #0453f3;
    cursor: pointer;
  }
  .registry-tips {
    white-space: nowrap;
    text-align: center;
    transform: scale(0.92);
    font-size: 12px;
    color: $desc-color;
    margin: 10px 0;
  }
  .sider-text {
    white-space: nowrap;
    transform: scale(0.84, 0.84);
    font-size: 14px;
  }
  // .fade-enter-active,
  // .fade-leave-active {
  //   transition: max-height 0.2s ease;
  // }
  // .fade-enter-from,
  // .fade-leave-to {
  //   max-height: 0;
  // }
  // .fade-enter-to,
  // .fade-leave-from {
  //   max-height: 200px;
  // }
</style>
