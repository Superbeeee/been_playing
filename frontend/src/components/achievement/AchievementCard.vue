<script setup lang="ts">
import type { Achievement } from '@/types'

defineProps<{
  achievement: Achievement
}>()
</script>

<template>
  <div class="card mb-3" :class="`bbp-${achievement.uuid}`" style="max-width: 540px">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          class="img-fluid rounded-start"
          :src="achievement.figure"
          :alt="achievement.title"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ achievement.title }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>
