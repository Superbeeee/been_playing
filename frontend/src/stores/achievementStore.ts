import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Achievement } from '@/types'
import { STORAGE_KEYS } from '@/config/constants'

export const useAchievementStore = defineStore('achievement', () => {
  // State
  const achievements = ref<Achievement[]>([])

  // Initialize from localStorage
  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)
      achievements.value = raw ? JSON.parse(raw) : []
    } catch {
      achievements.value = []
    }
  }

  // Persist to localStorage
  function saveToStorage() {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements.value))
  }

  // Watch for changes and auto-save
  watch(achievements, saveToStorage, { deep: true })

  // Getters
  const achievementUUIDs = computed(() =>
    new Set(achievements.value.map(a => a.uuid))
  )

  const achievementCount = computed(() => achievements.value.length)

  // Actions
  function addAchievement(title: string, figure: string, uuid: string) {
    if (!achievementUUIDs.value.has(uuid)) {
      achievements.value.push({ title, figure, uuid })
    }
  }

  function removeAchievement(uuid: string) {
    achievements.value = achievements.value.filter(a => a.uuid !== uuid)
  }

  function clearAllAchievements() {
    achievements.value = []
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS)
  }

  function exportAchievements(): string {
    return JSON.stringify(achievements.value, null, 2)
  }

  function importAchievements(data: Achievement[]) {
    // Validate data structure
    if (!Array.isArray(data)) {
      throw new Error('格式錯誤：應為陣列！')
    }

    const isValid = data.every(item =>
      typeof item.title === 'string' &&
      typeof item.figure === 'string' &&
      typeof item.uuid === 'string'
    )

    if (!isValid) {
      throw new Error('格式錯誤：缺少必要欄位 (title, figure, uuid)')
    }

    achievements.value = data
  }

  function isAchieved(uuid: string): boolean {
    return achievementUUIDs.value.has(uuid)
  }

  // Initialize
  loadFromStorage()

  return {
    achievements,
    achievementUUIDs,
    achievementCount,
    addAchievement,
    removeAchievement,
    clearAllAchievements,
    exportAchievements,
    importAchievements,
    isAchieved,
    loadFromStorage
  }
})
