<template>
  <div class="settled-platform-card-box">
    <p class="settled-platform-card-title">{{ data.title }}</p>
    <p class="settled-platform-card-desc">{{ data.desc }}</p>
    <slot name="action"></slot> </div
></template>
<script lang="ts" setup>
  defineProps<{
    data: {
      title: string;
      desc: string;
    };
  }>();
</script>
<style lang="scss" scoped>
  .settled-platform-card-box {
    text-align: center;
    white-space: pre-line;
  }
  .settled-platform-card-title {
    font-weight: 500;
    color: $title-color;
    line-height: 32px;
    font-size: 24px;
    margin-bottom: 10px;
  }
  .settled-platform-card-desc {
    font-weight: 400;
    color: $desc-color;
    line-height: 22px;
    font-size: 14px;
    padding-bottom: 30px;
    height: 74px;
  }
</style>
