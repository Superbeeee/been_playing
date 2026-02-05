import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Toast, Achievement } from '@/types'

export const useUIStore = defineStore('ui', () => {
  // Theme
  const isDarkMode = ref(false)

  // Sidebar
  const isAchievementSidebarOpen = ref(false)

  // Modals
  const isDeleteModalOpen = ref(false)
  const isImportModalOpen = ref(false)
  const importData = ref<Achievement[] | null>(null)
  const importCount = ref(0)

  // Toast
  const toasts = ref<Toast[]>([])
  let toastId = 0

  // Theme actions
  function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDarkMode.value = prefersDark
    applyTheme()
  }

  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
    applyTheme()
  }

  function applyTheme() {
    if (isDarkMode.value) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light')
    }
  }

  // Sidebar actions
  function openAchievementSidebar() {
    isAchievementSidebarOpen.value = true
  }

  function closeAchievementSidebar() {
    isAchievementSidebarOpen.value = false
  }

  function toggleAchievementSidebar() {
    isAchievementSidebarOpen.value = !isAchievementSidebarOpen.value
  }

  // Modal actions
  function openDeleteModal() {
    isDeleteModalOpen.value = true
  }

  function closeDeleteModal() {
    isDeleteModalOpen.value = false
  }

  function openImportModal(data: Achievement[]) {
    importData.value = data
    importCount.value = data.length
    isImportModalOpen.value = true
  }

  function closeImportModal() {
    isImportModalOpen.value = false
    importData.value = null
    importCount.value = 0
  }

  // Toast actions
  function showToast(message: string, type: Toast['type'] = 'info') {
    const id = toastId++
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3000)
  }

  function removeToast(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    isDarkMode,
    isAchievementSidebarOpen,
    isDeleteModalOpen,
    isImportModalOpen,
    importData,
    importCount,
    toasts,
    initTheme,
    toggleTheme,
    applyTheme,
    openAchievementSidebar,
    closeAchievementSidebar,
    toggleAchievementSidebar,
    openDeleteModal,
    closeDeleteModal,
    openImportModal,
    closeImportModal,
    showToast,
    removeToast
  }
})
