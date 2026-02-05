<script setup lang="ts">
import { ref } from 'vue'
import { useUIStore, useAchievementStore } from '@/stores'
import AchievementCard from './AchievementCard.vue'

const uiStore = useUIStore()
const achievementStore = useAchievementStore()
const fileInput = ref<HTMLInputElement | null>(null)

function handleExport() {
  const data = achievementStore.exportAchievements()
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'achievements_backup.json'
  a.click()

  URL.revokeObjectURL(url)
}

function handleImportClick() {
  fileInput.value?.click()
}

async function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  try {
    const text = await file.text()
    const data = JSON.parse(text)

    if (!Array.isArray(data)) {
      alert('格式錯誤：應為陣列！')
      return
    }

    const isValid = data.every(
      (item: any) =>
        typeof item.title === 'string' &&
        typeof item.figure === 'string' &&
        typeof item.uuid === 'string'
    )

    if (!isValid) {
      alert('格式錯誤：缺少必要欄位 (title, figure, uuid)')
      return
    }

    uiStore.openImportModal(data)
  } catch (err) {
    console.error(err)
    alert('匯入失敗：JSON 格式錯誤')
  }

  // Reset file input
  if (fileInput.value) fileInput.value.value = ''
}

function handleDeleteAll() {
  uiStore.openDeleteModal()
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div
      v-if="uiStore.isAchievementSidebarOpen"
      class="offcanvas-backdrop fade show"
      @click="uiStore.closeAchievementSidebar"
    ></div>

    <!-- Sidebar -->
    <div
      class="offcanvas offcanvas-start"
      :class="{ show: uiStore.isAchievementSidebarOpen }"
      :style="{ visibility: uiStore.isAchievementSidebarOpen ? 'visible' : 'hidden' }"
      tabindex="-1"
      id="offcanvasAchievement"
      aria-labelledby="offcanvasAchievementLabel"
    >
      <div class="offcanvas-header d-flex align-items-center gap-2 flex-wrap">
        <h5 class="offcanvas-title" id="offcanvasAchievementLabel">成就列表</h5>
        <button class="btn btn-success" @click="handleExport">
          <i class="bi bi-cloud-download-fill"></i>
        </button>

        <button class="btn btn-primary" @click="handleImportClick">
          <i class="bi bi-cloud-upload-fill"></i>
        </button>

        <input
          ref="fileInput"
          type="file"
          accept=".json"
          style="display: none"
          @change="handleFileChange"
        />

        <button
          class="btn btn-danger"
          @click="handleDeleteAll"
          aria-label="成就列表"
        >
          <i class="bi bi-trash"></i>
        </button>
        <button
          type="button"
          class="btn-close"
          @click="uiStore.closeAchievementSidebar"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body" id="achievementList">
        <AchievementCard
          v-for="achievement in achievementStore.achievements"
          :key="achievement.uuid"
          :achievement="achievement"
        />
        <p v-if="achievementStore.achievements.length === 0" class="text-muted">
          尚無成就記錄
        </p>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.offcanvas {
  transition: transform 0.3s ease-in-out;
}

.offcanvas.show {
  transform: none;
}

.offcanvas:not(.show) {
  transform: translateX(-100%);
}
</style>
