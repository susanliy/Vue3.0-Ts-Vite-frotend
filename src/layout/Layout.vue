<template>
  <a-config-provider :locale="locale">
    <div class="layout-container">
      <Header />
      <div class="layout-main" :class="{ 'layout-main__static': isStaticHeader }">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.keepalive" :key="$route.path" />
          </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepalive" :key="$route.path" />
        </router-view>
      </div>
      <Footer :list="footQrCode" />
      <SiderTop :list="qrCode" />
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import { getQrcode } from '@/api/global/global';

  const locale = zhCN;
  const route = useRoute();
  let qrCode = ref({});
  let footQrCode = ref({});
  const isStaticHeader = computed(() => route.meta.isStaticHeader);
  onMounted(() => {
    getQrcode().then((res) => {
      qrCode.value = res.data[1] ? res.data[1] : '';
      footQrCode.value = res.data[2] ? res.data[2] : '';
    });
  });
</script>

<style scoped lang="scss">
  .layout-container {
    width: 100%;
    height: 100%;
    position: relative;
    .layout-main {
      display: block;
      overflow: hidden;
      width: 100%;
      padding: 0;
      background-color: #fff;
    }
    .layout-main__static {
      padding-top: 100px;
    }
  }
</style>
