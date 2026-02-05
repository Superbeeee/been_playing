<script setup lang="ts">
import { useUIStore, useAchievementStore } from '@/stores'

const uiStore = useUIStore()
const achievementStore = useAchievementStore()

function handleConfirmDelete() {
  achievementStore.clearAllAchievements()
  uiStore.closeDeleteModal()
  uiStore.closeAchievementSidebar()
  // Reload to refresh the table
  window.location.reload()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="uiStore.isDeleteModalOpen"
      class="modal fade show d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">刪除成就列表</h1>
            <button
              type="button"
              class="btn-close"
              @click="uiStore.closeDeleteModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">你確定真的要刪除所有已記錄的成就?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="uiStore.closeDeleteModal"
            >
              返回
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="handleConfirmDelete"
            >
              我很確定!!
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
