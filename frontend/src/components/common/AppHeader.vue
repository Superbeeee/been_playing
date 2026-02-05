<script setup lang="ts">
import { useUIStore } from '@/stores'
import ThemeToggle from './ThemeToggle.vue'
import { CLUSTERS_MAP_URL } from '@/config/constants'

const uiStore = useUIStore()

function openClustersMap() {
  window.open(CLUSTERS_MAP_URL, '_blank')
}
</script>

<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand"></a>
      <button
        class="btn btn-warning shadow"
        type="button"
        @click="uiStore.toggleAchievementSidebar"
        aria-controls="offcanvasButton"
      >
        <i class="bi bi-star-fill"></i>
      </button>

      <button
        class="btn btn-primary"
        type="button"
        @click="openClustersMap"
      >
        <i class="bi bi-flask"></i>
      </button>

      <ThemeToggle />
    </div>
  </nav>
</template>
