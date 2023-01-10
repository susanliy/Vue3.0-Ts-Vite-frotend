<template>
  <div class="why_to_change_box">
    <img :src="ElementIcon6" class="element-icon-6" />
    <img :src="ElementIcon5" class="element-icon-5" />
    <div v-for="(item, index) in WHY_LIST" :key="index" class="why_to_change_container">
      <div>
        <p class="why_to_change_title">{{ item.title }}</p>
        <p class="why_to_change_desc">{{ item.desc }}</p>
      </div>
      <img :src="imgList[index]" class="why_to_change_img" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import ElementIcon6 from '@/assets/images/home/element_06.png';
  import ElementIcon5 from '@/assets/images/home/element_05.png';
  import FirstImg from '@/assets/images/home/icon_05.png';
  import SecondImg from '@/assets/images/home/icon_06.png';
  import ThirdImg from '@/assets/images/home/icon_07.png';
  import FourImg from '@/assets/images/home/icon_08.png';
  import { WHY_LIST } from '../constants';
  import { computed } from 'vue';

  const imgList = computed(() => {
    const list = [FirstImg, SecondImg, ThirdImg, FourImg];
    return list;
  });
</script>
<style lang="scss" scoped>
  .why_to_change_box {
    padding: 80px 210px 91px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .why_to_change_container {
      width: 734px;
      height: 240px;
      box-shadow: 0px 30px 84px 0px rgba(0, 0, 0, 0.04);
      border-radius: 20px;
      text-align: left;
      @include flex(space-between, center);
      margin: 0px 33px 33px 0px;
      padding: 26px 60px 40px 40px;
      background: #ffffff;
    }
    .why_to_change_img {
      width: 187px;
      height: 187px;
    }
    .why_to_change_title {
      color: $title-color;
      font-size: 24px;
      font-weight: 500;
      color: #1d2129;
      line-height: 32px;
      margin-bottom: 16px;
    }
    .why_to_change_desc {
      font-weight: 400;
      color: $desc-color;
      line-height: 26px;
      font-size: 18px;
      width: 400px;
    }
  }
  .element-icon-5 {
    width: 124px;
    height: 110px;
    position: absolute;
    top: -50px;
    left: 1460px;
  }
  .element-icon-6 {
    width: 205px;
    height: 216px;
    position: absolute;
    top: -70px;
    left: -30px;
  }
</style>
