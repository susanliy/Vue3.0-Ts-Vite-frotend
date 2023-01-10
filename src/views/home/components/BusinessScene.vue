<template>
  <div class="business-scene">
    <div
      ref="BusinessCardOne"
      :class="{ 'before-scrolling': true, 'after-scrolling': BusinessCardOneShow }"
    >
      <img :src="ElementIcon1" class="element-icon-1" />
      <BusinessSceneCard :data="BUSINESS_LIST[0]" />
      <img :src="ElementIcon5" class="element-icon-5" />
    </div>
    <div
      ref="BusinessCardTwo"
      :class="{ 'before-scrolling': true, 'after-scrolling': BusinessCardTwoShow }"
    >
      <BusinessSceneCard :data="BUSINESS_LIST[1]" :is-reverse="true" />
      <img :src="ElementIcon2" class="element-icon-2" />
    </div>
    <div
      ref="BusinessCardThree"
      :class="{ 'before-scrolling': true, 'after-scrolling': BusinessCardThreeShow }"
    >
      <img :src="ElementIcon5" class="element-icon-6" />
      <BusinessSceneCard :data="BUSINESS_LIST[2]" />
    </div> </div
></template>
<script lang="ts" setup>
  import ElementIcon1 from '@/assets/images/home/element_01.png';
  import ElementIcon2 from '@/assets/images/home/element_02.png';
  import ElementIcon5 from '@/assets/images/home/element_05.png';
  import { BUSINESS_LIST } from '../constants';
  import useEventListener from '@/hooks/common/useEventListener';
  import { ref } from 'vue';

  /***** 滑动向上的动画 *****/
  const BusinessCardOne = ref();
  const BusinessCardTwo = ref();
  const BusinessCardThree = ref();
  let BusinessCardOneShow = ref(false);
  let BusinessCardTwoShow = ref(false);
  let BusinessCardThreeShow = ref(false);

  const handleScroll = () => {
    let $app: any = document.querySelector('#app');
    const currentScroll = $app?.scrollTop;
    const numRidge = [
      0,
      BusinessCardOne.value.getBoundingClientRect().top + 500,
      BusinessCardTwo.value.getBoundingClientRect().top + 500,
      BusinessCardThree.value.getBoundingClientRect().top + 500,
    ];
    const elementFn = [BusinessCardOneShow, BusinessCardTwoShow, BusinessCardThreeShow];
    let test = 0;
    if (currentScroll > 1500) return;
    if (currentScroll <= 1500)
      return (function () {
        for (let i = 0; i < numRidge.length; i++) {
          if (currentScroll > numRidge[i] && currentScroll <= numRidge[i + 1]) {
            elementFn[i].value = true;
            test = i;
          }
        }
      })(test);
  };
  useEventListener('scroll', handleScroll, window, true);
</script>
<style lang="scss" scoped>
  .business-scene {
    position: relative;
    margin-bottom: 124px;
    .business-scene-card__box {
      padding: 60px 280px 0px;
    }
  }
  .after-scrolling {
    transform: translateY(0%) !important; //滚动后的位置
    opacity: 1 !important; //滚动后显现
    transition: all 0.5s ease;
  }
  .before-scrolling {
    transform: translateY(10%); //滚动前的位置
    opacity: 0; //滚动前设置透明隐藏
  }
  .element-icon-1 {
    width: 240px;
    height: 251px;
    position: absolute;
    top: -102px;
    left: -85px;
  }
  .element-icon-2 {
    width: 182px;
    height: 245px;
    position: absolute;
    top: 210px;
    right: -50px;
  }
  .element-icon-5 {
    width: 124px;
    height: 110px;
    position: absolute;
    top: 340px;
    left: 740px;
  }
  .element-icon-6 {
    width: 124px;
    height: 110px;
    position: absolute;
    top: 90px;
    left: 740px;
  }
</style>
