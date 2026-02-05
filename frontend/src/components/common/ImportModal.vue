<script setup lang="ts">
import { useUIStore, useAchievementStore } from '@/stores'

const uiStore = useUIStore()
const achievementStore = useAchievementStore()

function handleConfirmImport() {
  if (uiStore.importData) {
    achievementStore.importAchievements(uiStore.importData)
    uiStore.closeImportModal()
    alert('匯入成功！將重新載入頁面。')
    window.location.reload()
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="uiStore.isImportModalOpen"
      class="modal fade show d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">確認匯入</h1>
            <button
              type="button"
              class="btn-close"
              @click="uiStore.closeImportModal"
              aria-label="關閉"
            ></button>
          </div>
          <div class="modal-body">
            你將匯入 <strong>{{ uiStore.importCount }}</strong> 筆成就資料，這將會覆蓋現有成就。確定嗎？
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="uiStore.closeImportModal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="handleConfirmImport"
            >
              確定覆蓋匯入
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
