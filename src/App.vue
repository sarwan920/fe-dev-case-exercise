<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from '@/components/Layout/Navigation.vue'
</script>

<template>
  <main>
    <Navigation />
    <RouterView />
  </main>
</template>

<style scoped>
main {
  display: flex;
  height: 100vh;
  max-height: 100vh;
}
</style>
