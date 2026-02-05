<script setup lang="ts">
import { computed } from 'vue'
import { useExhibitionStore } from '@/stores'
import { useExhibitionStatus, useClipboard } from '@/composables'

const exhibitionStore = useExhibitionStore()
const { formatDate } = useExhibitionStatus()
const { copyToClipboard } = useClipboard()

const info = computed(() => exhibitionStore.exhibitionInfo)
const lastUpdate = computed(() => exhibitionStore.lastUpdate)
const visitInfo = computed(() => exhibitionStore.visitInfo)

const googleMapUrl = computed(() => {
  if (!info.value) return null
  const coord = info.value.branch_coordinates
  let placeId: string | null = null

  if (coord && typeof coord === 'object' && !Array.isArray(coord)) {
    placeId = coord.google_map_place_id
  } else if (coord && Array.isArray(coord) && coord.length > 0) {
    const firstCoord = coord[0]
    if (firstCoord) {
      placeId = firstCoord.google_map_place_id
    }
  }

  if (placeId) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.value.fullname)}&query_place_id=${placeId}`
  }
  return null
})

function handleShare() {
  const url = `${window.location.origin}${window.location.pathname}?topic=${info.value?.code_name}`
  copyToClipboard(url)
}

const openingHtml = computed(() => {
  if (visitInfo.value?.opening) {
    return visitInfo.value.opening.replace(/\n/g, '<br>')
  }
  return ''
})
</script>

<template>
  <div v-if="info" class="card text-bg-warning">
    <h5 class="card-header">
      《{{ info.fullname }}》
      <a
        v-if="info.external_link"
        class="btn btn-secondary"
        :href="info.external_link"
        target="_blank"
      >
        <strong><i class="bi bi-box-arrow-up-right"></i></strong>
      </a>
      <a
        v-if="googleMapUrl"
        style="margin-left: 10px"
        class="btn btn-secondary"
        :href="googleMapUrl"
        target="_blank"
      >
        <strong><i class="bi bi-pin-map"></i></strong>
      </a>
      <a
        style="margin-left: 10px"
        class="btn btn-secondary"
        @click="handleShare"
        role="button"
      >
        <strong><i class="bi bi-share"></i></strong>
      </a>
    </h5>
    <div v-if="openingHtml" class="card-body" v-html="openingHtml"></div>
    <div v-if="lastUpdate" class="card-footer">
      資料更新時間: {{ formatDate(lastUpdate) }}
    </div>
  </div>
</template>
