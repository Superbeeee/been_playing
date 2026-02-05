<script setup lang="ts">
import { useUIStore } from '@/stores'

const uiStore = useUIStore()
</script>

<template>
  <div
    v-for="toast in uiStore.toasts"
    :key="toast.id"
    class="toast align-items-center show"
    style="position: fixed; bottom: 1rem; right: 1rem; z-index: 1080"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body">{{ toast.message }}</div>
      <button
        type="button"
        class="btn-close me-2 m-auto"
        @click="uiStore.removeToast(toast.id)"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>
