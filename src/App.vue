<script setup lang="ts">
import BaseSide from '~/layouts/BaseSide.vue'
import BaseHeader from '~/layouts/BaseHeader.vue'
</script>

<template>
  <div>
    <BaseHeader />
    <div class="flex main-container">
      <BaseSide />
      <div w="full" py="4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
</style>
