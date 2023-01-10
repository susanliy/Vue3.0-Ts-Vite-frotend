<template>
  <div class="home-header">
    <div class="home-header-title mb-16px">
      <span class="banner-header--icon"></span>
      <p>{{ title }}</p>
      <span class="banner-header--icon"></span>
    </div>
    <p v-if="desc" class="home-header-desc">
      {{ desc }}
      <a-button v-if="buttonText" type="link" :href="url" target="_blank" class="flex">
        {{ buttonText }} >
      </a-button>
    </p>
  </div>
</template>
<script lang="ts" setup>
  defineProps<{
    title: string;
    desc?: string;
    buttonText?: string;
    url?: string;
  }>();
</script>
<style lang="scss" scoped>
  .home-header-title {
    font-size: 42px;
    font-weight: 500;
    color: $title-color;
    line-height: 50px;
    @include flex;
  }
  .banner-header--icon {
    width: 8px;
    height: 8px;
    display: block;
    background: #0453f3;
    border-radius: 50%;
    margin: 0 30px;
  }
  .home-header-desc {
    font-weight: 400;
    color: $desc-color;
    line-height: 26px;
    font-size: 18px;
    :deep(.ant-btn-link) {
      padding: 0px 10px;
      font-weight: 400;
      color: #0453f3;
      font-size: 17px;
    }
  }
</style>
