<template>
  <div class="question-and-answer">
    <img :src="ElementIcon7" class="element-icon-7" />
    <div v-for="(item, index) in QA_LIST" :key="index">
      <p class="question-and-answer-p mb-16px"> Q{{ index + 1 }}. {{ item.problem }}</p>
      <p class="question-and-answer-a"> {{ item.answer }}</p>
    </div>

    <img :src="ElementIcon5" class="element-icon-5" />
  </div>
</template>
<script lang="ts" setup>
  import ElementIcon7 from '@/assets/images/home/element_07.png';
  import { QA_LIST } from '../constants';
  import ElementIcon5 from '@/assets/images/home/element_05.png';
</script>
<style lang="scss" scoped>
  .question-and-answer {
    text-align: left;
    display: grid;
    grid-template-columns: 46% 46%;
    grid-column-gap: 100px;
    grid-row-gap: 44px;
    padding: 60px 19% 120px;
  }
  .question-and-answer-p {
    font-size: 20px;
    font-weight: 500;
    color: #4e5969;
    line-height: 28px;
    margin-bottom: 16px;
  }
  .question-and-answer-a {
    font-size: 14px;
    font-weight: 400;
    color: #86909c;
    line-height: 22px;
  }
  .element-icon-7 {
    width: 169px;
    height: 167px;
    position: absolute;
    top: -10px;
    left: -30px;
  }
  .element-icon-5 {
    width: 124px;
    height: 110px;
    position: absolute;
    top: 520px;
    left: 1630px;
  }
</style>
