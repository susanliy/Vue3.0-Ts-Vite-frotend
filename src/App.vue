<template>
  <div class="app-main">
    <div ref="globalModal">
      <a-modal
        :visible="visibleLogoutModal"
        :width="400"
        title="自动登出提醒"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @update:visible="closeLogoutModal"
        @cancel="closedModal"
      >
        <span class="reason-title">账号自动登出</span>
        <div class="reason">
          <span>可能原因：</span>
          <span>1、账号长时间未操作自动登出！ </span>
          <span>2、更换操作环境；</span>
          <span>3、网络不稳定。</span>
        </div>
        <template #footer>
          <a-button shape="round" type="primary" @click="handleLogin">登录</a-button>
        </template>
      </a-modal>
    </div>
    <router-view />
    <div v-show="systemStore.isLoading" class="app-loading">
      <div class="loading"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { systemStoreWithOut } from '@/store/modules/system';
  import useCheckTimeout from '@/hooks/common/useCheckTimeout';
  const systemStore = systemStoreWithOut();
  // 超时未操作
  const { visibleLogoutModal, handleLogin, closedModal, closeLogoutModal } = useCheckTimeout();
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .app-main {
    width: 100%;
    min-height: 100vh;
    .reason {
      display: flex;
      flex-direction: column;
    }
    .reason-title {
      display: block;
      text-align: center;
    }
  }

  body {
    font-family: inherit;
  }
</style>
<style scoped lang="scss">
  :deep(.ant-modal) {
    box-shadow: 0px 0px 25px 0px rgb(179 185 191 / 25%);
    border-radius: 6px;
    overflow: hidden;

    .ant-modal-header {
      height: 50px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ant-modal-title {
      font-weight: bold;
    }
    .ant-modal-close {
      font-size: 16px;
      top: -6px;
    }
    .ant-modal-body {
      font-size: 16px;
      padding: 24px;
      color: $title-color;
    }
    .ant-modal-footer {
      padding: 10px 25px;
      .ant-btn {
        padding: 5px 16px;
        font-size: 14px;
        font-weight: 600;
        min-height: unset;
        line-height: 22px;

        span {
          display: inline-block;
          min-width: 33px;
        }
      }
      .el-button--primary {
        background-color: #0453f3;
        &:hover {
          background-color: #0453f3;
          border-color: #0453f3;
        }
      }
    }
  }
  .app-loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -40px;
    margin-top: -55px;
    width: 110px;
    height: 80px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    &::before {
      content: '';
      width: 30px;
      height: 30px;
      border: 2px solid #fff;
      border-top-color: transparent;
      border-radius: 100%;
      animation: circle infinite 0.75s linear;
    }
  }

  // 转转转动画
  @keyframes circle {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
