<template>
  <div class="business-scene-card__box" :class="{ 'flex-row-reverse': isReverse }">
    <div class="business-scene-card__container">
      <p class="business-scene-card__title">{{ data.title }}</p>
      <div class="business-scene-card__line"></div>
      <p class="business-scene-card__desc">{{ data.desc }}</p>
    </div>
    <img :src="imgList[data.index]" class="business-scene-card__img" />
  </div>
</template>
<script lang="ts" setup>
  import FirstImg from '@/assets/images/home/business_01.png';
  import SecondImg from '@/assets/images/home/business_02.png';
  import ThirdImg from '@/assets/images/home/business_03.png';
  import { computed } from 'vue';
  defineProps<{
    data: {
      title: string;
      desc: string;
      index: number;
    };
    isReverse?: boolean;
  }>();

  const imgList = computed(() => {
    const list = [FirstImg, SecondImg, ThirdImg];
    return list;
  });
</script>
<style scoped lang="scss">
  .business-scene-card__box {
    display: flex;
    justify-content: center;
  }
  .business-scene-card__container {
    justify-content: flex-end;
    text-align: left;
    white-space: pre-line;
    margin-right: 100px;
  }
  .business-scene-card__title {
    font-size: 36px;
    font-weight: 500;
    color: $title-color;
    line-height: 44px;
    margin-bottom: 15px;
    margin-top: 115px;
  }
  .business-scene-card__line {
    width: 80px;
    height: 4px;
    background: #0453f3;
    border-radius: 2px;
    margin-bottom: 15px;
  }
  .business-scene-card__desc {
    font-size: 20px;
    font-weight: 400;
    color: $desc-color;
    line-height: 28px;
    width: 630px;
  }
  .business-scene-card__img {
    width: 630px;
    height: 420px;
    border-radius: 20px;
    border: 5px solid #ffffff;
  }
  .flex-row-reverse {
    .business-scene-card__container {
      justify-content: flex-start;
      margin-left: 100px;
      margin-right: 0px;
    }
  }
</style>
