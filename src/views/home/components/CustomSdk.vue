<template>
  <div class="custom-sdk__container">
    <img :src="ElementIcon3" class="element-icon-3" />
    <BaseBanner :list="CUSTOM_LIST" :showArrow="true" :autoplay="{ delay: 300000 }">
      <template #slide="{ item }">
        <div class="custom-sdk__banner">
          <img :src="bannerData[item.index]" class="banner-img" />
          <div class="custom-sdk__box">
            <p class="custom-sdk-title">{{ item.title }}</p>
            <p class="custom-sdk-desc">{{ item.desc }}</p>
            <a-button
              v-if="item.demoShow"
              value="large"
              type="primary"
              @click="openWindow(item?.url)"
              >DEMO演示</a-button
            >
            <a-tooltip v-if="item.codeShow" placement="bottom" :color="'#fff'">
              <template #title>
                <img :src="MobileDesignCode" />
              </template>
              <a-button value="large">二维码演示</a-button>
            </a-tooltip>
          </div>
        </div>
      </template>
    </BaseBanner>
    <img :src="ElementIcon4" class="element-icon-4" />
  </div>
</template>
<script lang="ts" setup>
  import { openWindow } from '@/utils/util';
  import MobileDesignCode from '@/assets/images/home/mobile-design-code.png';
  import ElementIcon3 from '@/assets/images/home/element_03.png';
  import ElementIcon4 from '@/assets/images/home/element_04.png';
  import FirstImg from '@/assets/images/home/slideshow_img_01.png';
  import SecondImg from '@/assets/images/banner1.png';
  import DefaultBanner from '@/assets/images/home/banner.png';
  import { CUSTOM_LIST } from '../constants';
  import { computed } from 'vue';
  const bannerData = computed(() => {
    const list = [FirstImg, DefaultBanner, SecondImg, DefaultBanner];
    return list;
  });
</script>
<style lang="scss" scoped>
  .custom-sdk__container {
    padding: 86px 0 40px;
    z-index: 10;
  }
  .custom-sdk__banner {
    height: 680px;
  }
  .custom-sdk__box {
    position: absolute;
    top: 245px;
    left: 1030px;
    text-align: left;
    .custom-sdk-title {
      font-size: 42px;
      font-weight: bold;
      color: $title-color;
      line-height: 50px;
      margin-bottom: 10px;
    }
    .custom-sdk-desc {
      font-size: 20px;
      font-weight: 400;
      color: $desc-color;
      line-height: 28px;
      margin-bottom: 60px;
    }
    .ant-btn {
      padding: 30px 60px;
      background: #0453f3;
      text-align: center;
      line-height: 46px;
      box-shadow: 0px 16px 32px 0px rgba(4, 83, 243, 0.24);
      border-radius: 30px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      line-height: 0px;
      border: #0453f3;
    }
  }
  .element-icon-3 {
    width: 204px;
    height: 269px;
    position: absolute;
    top: 0px;
    left: -60px;
    z-index: 11;
  }
  .element-icon-4 {
    width: 180px;
    height: 160px;
    position: absolute;
    top: 745px;
    right: -32px;
    z-index: 11;
  }
</style>
