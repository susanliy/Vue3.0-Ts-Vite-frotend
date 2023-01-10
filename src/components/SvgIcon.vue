<template>
  <svg aria-hidden="true" :style="{ width: width, height: height }">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
  import { computed, withDefaults } from 'vue';
  type SvgIconProps = {
    prefix?: string;
    name: string;
    color?: string;
    width?: string;
    height?: string;
  };

  const props = withDefaults(defineProps<SvgIconProps>(), {
    prefix: 'icon',
    color: '#333',
    width: '20px',
    height: '20px',
  });
  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style scoped></style>
