<template>
  <div
    class="head__wrapper"
    :class="{
      'head__wrapper--white': isWhiteHeader,
    }"
    :style="{ backgroundColor: backgroundColor }"
  >
    <!-- 1 左侧logo区域 -->
    <div class="head-logo__container">
      <a-popover
        placement="bottom"
        trigger="hover"
        color="#0553f3"
        content="点击HICUSTOM进入指纹官网"
        overlay-class-name="tipHome"
      >
        <SvgIcon
          id="logo-svg"
          name="icon-logo_zdh"
          :color="'#0553f3'"
          @click="navigateToHiCustom('_blank')"
        />
      </a-popover>
      <img src="@/assets/images/home/logo_open.svg" />
    </div>

    <!-- 2 中间菜单区域 -todo-->
    <!-- <div class="head-menu__container">
      <a-menu v-model:selectedKeys="activeKeys" mode="horizontal" class="head-menu__box">
        <template v-for="item in MENU_CONFIG_LIST" :key="item.path">
          <template v-if="!item.children">
            <a-menu-item :key="item.path">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </a-menu-item>
          </template>
          <template v-else>
            <subMenu
              :key="item.path"
              :name="item.name"
              :path="item.path"
              :menuCode="item.menuCode"
              :children="item.children"
            />
          </template>
        </template>
      </a-menu>
    </div> -->

    <!-- 3. 登录 -->
    <div class="login__box dropdown__wrapper">
      <div class="login-content__box" @click="handleGoZwkjRedirect">
        <span class="userinfo-avatar">
          <IconFont name="nav_account" class="userinfo-avatar__icon" :style="{ color: '#fff' }" />
        </span>
        <div class="userinfo-name">
          <template v-if="!name"> 登录 / 注册</template>
          <template v-else>
            {{ name }}
            <IconFont
              class="suffix-arrow suffix-arrow__login"
              name="nav_down"
              :style="{ color: '#fff' }"
            />
          </template>
        </div>
      </div>
      <ul
        v-if="!!name"
        class="nav_login_ul dropdown__box animate__animated animate__fadeIn"
        @click.stop="noop"
      >
        <li @click.stop="navigateToMerchant()">控制台</li>
        <li @click.stop="handleLogout">退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import useEventListener from '@/hooks/common/useEventListener';
  import { navigateToHiCustom, navigateToMerchant } from '@/utils/navigate';
  import { noop } from '@/utils';
  import { userStoreWithOut } from '@/store/modules/user';

  const router = useRouter();
  const route = useRoute();
  const userStore = userStoreWithOut();
  const name = computed(() => userStore.userName);

  //保持刷新选中状态
  const activeKeys = ref<string[]>(['/home']);
  const setCurrentRoute = () => {
    const id = (router.currentRoute.value.path ?? '') as string;
    activeKeys.value = [id.toString()];
  };

  watch(
    () => router,
    () => {
      setCurrentRoute();
    },
    { immediate: true, deep: true }
  );

  /* -------- Block: 动态计算header透明度 --------- */
  const headerBackgroundOpacity = ref(route.meta.isStaticHeader ? 1 : 0);
  const isStaticHeader = computed(() => route.meta.isStaticHeader);
  const isOpacityHeader = computed(() => headerBackgroundOpacity.value < 0.5);
  const isWhiteHeader = computed(() => isStaticHeader.value || !isOpacityHeader.value);
  const calcBackgroundOpacity = () => {
    if (route.meta.isStaticHeader) return (headerBackgroundOpacity.value = 1);
    let $app: any = document.querySelector('#app');
    const scrollTop = $app.scrollTop;
    const min = 0;
    const max = 300;
    if (scrollTop <= min) return (headerBackgroundOpacity.value = 0);
    if (scrollTop >= max) return (headerBackgroundOpacity.value = 1);
    headerBackgroundOpacity.value = scrollTop / (max - min);
  };
  useEventListener('scroll', calcBackgroundOpacity, window, true);
  watch(
    () => route.meta.isStaticHeader,
    () => {
      calcBackgroundOpacity();
    }
  );
  const backgroundColor = computed(() => `rgba(255,255,255,${headerBackgroundOpacity.value})`);

  // 跳转到登录页
  const handleGoZwkjRedirect = () => {
    if (!name.value) {
      userStore.login();
    }
  };

  const token = computed(() => userStore.token);
  const handleLogout = () => {
    if (!token.value) return;
    userStore.logout();
  };
</script>
<style lang="scss">
  .tipHome {
    .ant-popover-inner-content {
      font-weight: 500 !important;
      color: #ffffff !important;
      font-size: 16px !important;
      text-align: center !important;
    }
    .ant-popover-inner {
      box-shadow: 0px 39px 65px 0px rgba(5, 83, 243, 0.3) !important;
      border: none !important;
      border-radius: 10px;
    }
  }
</style>
<style scoped lang="scss">
  .head__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 100px;
    display: flex;
    padding: 0 60px;
    border-bottom: 1px solid transparent;
    background: red;
    justify-content: space-between;

    &.head__wrapper--white {
      border-bottom-color: #f2f2f2;
      box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0.04) !important;
    }
  }

  // 下拉框样式
  .dropdown__wrapper {
    position: relative;
    .dropdown__box {
      cursor: default;
      display: none;
      position: absolute;
      top: 100px;
      border-radius: 10px;
      background: #ffffff;
      box-shadow: 0px 10px 25px 0px rgba(179, 185, 191, 0.3);
      border: 1px solid #f2f2f2;
      &::before {
        content: '';
        width: 0px;
        height: 0px;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 7px solid #fff;
        position: absolute;
        z-index: 12;
      }
      &::after {
        content: '';
        width: 0px;
        height: 0px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #f2f2f2;
        position: absolute;
        z-index: 10;
      }
    }
    .suffix-arrow {
      font-size: 20px !important;
      margin-right: 10px;
    }

    &:hover {
      .dropdown__box {
        display: block;
      }
      .suffix-arrow {
        transform: rotate(180deg);
      }
    }
  }

  // 左侧样式
  .head-logo__container {
    display: flex;
    align-items: center;
    margin-right: 80px;
    height: 100%;

    #logo-svg {
      height: 22px !important;
      width: 156px !important;
      margin-right: 10px !important;
      cursor: pointer;
    }

    #company-svg {
      height: 22px !important;
      width: 62px !important;
    }
  }

  // 中间样式
  .head-menu__container {
    flex: 1 0 auto;
    color: #fff;
    background: transparent;

    .head-menu__box {
      color: #fff;
      background: transparent;
      font-weight: bold;
    }
    :deep(.ant-menu-horizontal) {
      border-bottom: 0px;
      font-size: 16px;
      margin-top: 20px;
    }
  }
  .head__wrapper--white {
    .head-menu__box {
      color: #000000;
      font-weight: 600;
      &::before {
        color: #0453f3;
        background-color: #0453f3;
      }
      &:hover {
        color: #0453f3;
        .suffix-arrow__menu {
          color: #0453f3 !important;
        }
      }

      &.active {
        color: #0453f3;
        .suffix-arrow__menu {
          color: #0453f3 !important;
        }

        &::before {
          color: #0453f3;
          background-color: #0453f3;
        }
      }
    }
  }

  // 右侧样式
  .login__box {
    flex-shrink: 0;
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    line-height: 44px;
    color: #fff;
    .userinfo-avatar {
      display: flex;
      width: 40px;
      height: 40px;
      border-radius: 22px;
      background: #0553f3;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      .userinfo-avatar__icon {
        font-size: 20px !important;
      }
    }
    .login-content__box {
      padding-left: 2px;
      padding-right: 20px;
      box-sizing: border-box;
      cursor: pointer;
      align-items: center;
      height: 44px;
      width: 100%;
      border-radius: 22px;
      font-size: 16px;
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
    }
    .userinfo-name {
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .suffix-arrow__login {
      margin: 4px 10px 0 2px;
    }
    .nav_login_ul {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .head__wrapper--white {
    .search__box {
      :deep(.el-input__inner) {
        background-color: #f3f4f7;
        color: $desc-color;
        &::-webkit-input-placeholder {
          color: $desc-color !important;
          font-size: 16px;
        }
        &::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: $desc-color !important;
          font-size: 16px;
        }
        &:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: $desc-color !important;
          font-size: 16px;
        }
        &:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: $desc-color !important;
          font-size: 16px;
        }
      }
    }
    .login__box {
      .login-content__box {
        background: #f3f4f7;
        color: #000;
      }
      .suffix-arrow__login {
        color: #000 !important;
      }
      &:hover .suffix-arrow__login {
        color: #0453f3 !important;
      }
    }
  }

  .nav_study_ul,
  .nav_login_ul {
    width: 150px;
    padding: 10px 0;
    left: -30px;
    &::before {
      top: -7px;
      left: 65px;
    }
    &::after {
      top: -10px;
      left: 62px;
    }
    > li {
      cursor: pointer;
      color: $title-color;
      font-size: 16px;
      font-weight: normal !important;
      text-align: center;
      height: 44px;
      line-height: 44px;
      &:hover {
        background: #f6f6f6;
        color: #0453f3 !important;
      }
    }
  }
</style>
