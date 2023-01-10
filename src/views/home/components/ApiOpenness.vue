<template>
  <div class="api-openness_box">
    <div
      v-for="(item, index) in API_LIST"
      :key="index"
      class="api-openness_container"
      :style="{
        backgroundImage: `url(${isHover === index ? bgList[index] : ''})`,
      }"
      @mouseover="enterHover(index)"
      @mouseout="removeHover"
      @click="openWindow(item.url)"
    >
      <p class="api-openness_title">{{ item.title }}</p>
      <p class="api-openness_desc">{{ item.desc }}</p>
      <div class="api-openness-tag">
        <div v-for="(it, i) in item.list" :key="i" class="api-openness-tag-it">{{ it }} </div></div
      >
      <img :src="imgList[index]" class="api-openness_img" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import Bg1 from '@/assets/images/home/icon_01_bg.png';
  import Bg2 from '@/assets/images/home/icon_02_bg.png';
  import Bg3 from '@/assets/images/home/icon_03_bg.png';
  import Bg4 from '@/assets/images/home/icon_04_bg.png';
  import FirstImg from '@/assets/images/home/icon_01.png';
  import SecondImg from '@/assets/images/home/icon_02.png';
  import ThirdImg from '@/assets/images/home/icon_03.png';
  import FourImg from '@/assets/images/home/icon_04.png';
  import { API_LIST } from '../constants';
  import { openWindow } from '@/utils/util';
  import { computed, ref } from 'vue';

  const imgList = computed(() => {
    const list = [FirstImg, SecondImg, ThirdImg, FourImg];
    return list;
  });

  const bgList = computed(() => {
    const list = [Bg1, Bg2, Bg3, Bg4];
    return list;
  });

  let isHover = ref(-1);
  const enterHover = (index: number) => {
    isHover.value = index;
  };
  const removeHover = () => {
    isHover.value = -1;
  };
</script>
<style lang="scss" scoped>
  .api-openness_box {
    @include flex(space-around, flex-start);
    margin-top: 80px;
    .api-openness_container {
      width: 350px;
      height: 346px;
      box-shadow: 0px 69px 84px 0px rgba(0, 0, 0, 0.04);
      border-radius: 20px;
      border: 2px solid #ffffff;
      cursor: pointer;
      text-align: left;
      padding: 40px 30px;
      background: #fff;
      transition: transform 0.35s;
    }
    .api-openness_img {
      width: 48px;
      height: 49px;
    }
    .api-openness_title {
      line-height: 32px;
      font-weight: 500;
      font-size: 24px;
      color: $title-color;
      margin-bottom: 10px;
    }
    .api-openness_desc {
      font-size: 14px;
      font-weight: 400;
      color: $desc-color;
      line-height: 22px;
      margin-bottom: 42px;
    }
    .api-openness-tag {
      @include flex(flex-start);
      flex-wrap: wrap;
      margin-bottom: 46px;
    }
    .api-openness-tag-it {
      background: #f2f3f5;
      border-radius: 5px;
      padding: 3px 10px;
      margin: 0 10px 10px 0;
    }

    .api-openness_container:hover {
      border: 2px solid #80b7ff;
      background: linear-gradient(164deg, #ffffff 0%, #f2f4fd 100%);
      transform: translate(0px, -10px) rotate(0deg);
      .api-openness_title {
        color: $theme-color;
      }
    }
  }
</style>
