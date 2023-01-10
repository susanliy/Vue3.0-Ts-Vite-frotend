<template>
  <div class="settled-platform-box">
    <img :src="ElementIcon2" class="element-icon-2" />
    <SettledPlatformCard :data="SETTLED_LIST[0]">
      <template v-if="!isLogin()" #action>
        <a-button @click="userStore.login()">登录注册</a-button></template
      >
    </SettledPlatformCard>
    <SettledPlatformCard :data="SETTLED_LIST[1]">
      <template #action><a-button type="text" @click="goToOpen">前往开通</a-button></template>
    </SettledPlatformCard>
    <SettledPlatformCard :data="SETTLED_LIST[2]">
      <template #action>
        <a-button type="text" class="mr-10px" @click="goApi">API文档</a-button>
        <a-button type="text" @click="goSdk">SDK文档</a-button>
      </template>
    </SettledPlatformCard>
    <SettledPlatformCard :data="SETTLED_LIST[3]" />
  </div>
</template>
<script lang="ts" setup>
  import ElementIcon2 from '@/assets/images/home/element_02.png';
  import { SETTLED_LIST } from '../constants';
  import { getLocationOrigin, isLogin, openWindow } from '@/utils/util';
  import { userStoreWithOut } from '@/store/modules/user';
  const userStore = userStoreWithOut();

  const goToOpen = () => {
    if (!isLogin()) {
      userStore.login(`${getLocationOrigin()}/merchant/account/index`);
    } else {
      location.href = `${getLocationOrigin()}/merchant/account/index`;
    }
  };

  const goApi = () => {
    openWindow('http://xiaoyaoji.cn/project/1jPL8Hr5Xf7/1jUCjXS9TCC');
  };

  const goSdk = () => {
    openWindow('http://xiaoyaoji.cn/project/1jPL8Hr5Xf7/1maLWJa2GYq');
  };
</script>
<style lang="scss" scoped>
  .element-icon-2 {
    width: 182px;
    height: 245px;
    position: absolute;
    top: -180px;
    right: -260px;
  }
  .settled-platform-box {
    @include flex(space-between, flex-start);
    padding: 128px 55px 0px 40px;

    background: url('@/assets/images/home/process_icon.png') no-repeat center;
  }
  :deep(.ant-btn) {
    border-radius: 4px;
    border: 1px solid #2e7bff;
    padding: 5px 20px;
    font-weight: 500;
    color: #0453f3;
    line-height: 22px;
    font-size: 14px;
  }
  .mr-10px {
    margin-right: 10px;
  }
</style>
