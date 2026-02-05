<script setup lang="ts">
import { useExhibitionStore } from '@/stores'
import { STATUS_OPTIONS } from '@/config/constants'

const exhibitionStore = useExhibitionStore()

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  exhibitionStore.setStatusFilter(target.value)
}
</script>

<template>
  <select class="form-select" @change="handleChange" :value="exhibitionStore.statusFilter">
    <option v-for="option in STATUS_OPTIONS" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
