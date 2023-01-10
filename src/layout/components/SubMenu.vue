<template>
  <a-sub-menu :key="path">
    <template #title>{{ name }}</template>
    <template v-for="item in children" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item :key="item.path">
          <router-link :to="item.path">
            {{ item.name }}
          </router-link>
        </a-menu-item>
      </template>
      <template v-else>
        <subMenu
          :key="item.path"
          :name="item.name"
          :path="item.path"
          :menuCode="item.menuCode"
          :children="item.children"
        />
      </template>
    </template>
  </a-sub-menu>
</template>
<script setup lang="ts">
  defineProps<{
    name: string;
    menuCode: string;
    path: string;
    children?: any[];
  }>();
</script>
