<script setup lang="ts">
import { useUIStore } from '@/stores'
import { Icon } from '@iconify/vue'

const uiStore = useUIStore()
</script>

<template>
  <button class="btn shadow" @click="uiStore.toggleTheme">
    <Icon
      :icon="uiStore.isDarkMode ? 'ph:moon-stars-bold' : 'ph:sun-bold'"
      width="24"
      height="24"
    />
  </button>
</template>
