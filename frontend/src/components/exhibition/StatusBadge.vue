<script setup lang="ts">
import { computed } from 'vue'
import { useExhibitionStatus } from '@/composables'

const props = defineProps<{
  date: string | null
  tag?: 'h2' | 'h6' | 'span'
}>()

const { getStatus, getStatusBadgeClass, getStatusTextClass } = useExhibitionStatus()

const status = computed(() => getStatus(props.date))
const badgeClass = computed(() => getStatusBadgeClass(status.value))
const textClass = computed(() => getStatusTextClass(status.value))
</script>

<template>
  <component :is="tag || 'h2'">
    <span class="badge" :class="[badgeClass, textClass]" :style="textClass === 'text-dark' ? { color: '#3c3d30' } : {}">
      {{ status }}
    </span>
  </component>
</template>
