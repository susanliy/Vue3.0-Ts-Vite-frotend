<template>
  <IconFont
    :type="type"
    :style="{ fontSize: fontSize, color: color }"
    :spin="spin"
    :rotate="rotate"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import IconFont from '@/utils/icon';
  type SvgIconProps = {
    prefix?: string;
    name?: string;
    color?: string;
    fontSize?: string;
    spin?: boolean;
    rotate?: number;
  };
  const props = withDefaults(defineProps<SvgIconProps>(), { prefix: 'icon', fontSize: '20px' });
  const type = computed(() => `${props.prefix}-${props.name}`);
</script>

<style scoped></style>
