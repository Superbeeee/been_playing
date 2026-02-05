import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Exhibition, ExhibitionResponse, ExhibitionInformation } from '@/types'
import { API_BASE_URL, DEFAULT_TOPIC } from '@/config/constants'
import { isValidTopic } from '@/config/topics'
import { useAchievementStore } from './achievementStore'

export const useExhibitionStore = defineStore('exhibition', () => {
  // State
  const exhibitions = ref<Exhibition[]>([])
  const currentTopic = ref<string>(DEFAULT_TOPIC)
  const exhibitionInfo = ref<ExhibitionInformation | null>(null)
  const lastUpdate = ref<string | null>(null)
  const visitInfo = ref<{ opening?: string } | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const statusFilter = ref<string>('')

  // Get achievement store
  const achievementStore = useAchievementStore()

  // Getters
  const filteredExhibitions = computed(() => {
    // Filter out achieved exhibitions
    let result = exhibitions.value.filter(
      e => !achievementStore.isAchieved(e.UUID)
    )

    // Filter by status if set
    if (statusFilter.value) {
      result = result.filter(e => {
        const status = getExhibitionStatus(e.date)
        return status === statusFilter.value
      })
    }

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(e =>
        e.title.toLowerCase().includes(query) ||
        (e.address && e.address.toLowerCase().includes(query))
      )
    }

    return result
  })

  // Actions
  async function fetchExhibitions(topic: string) {
    if (!isValidTopic(topic)) {
      topic = DEFAULT_TOPIC
    }

    isLoading.value = true
    error.value = null
    currentTopic.value = topic

    try {
      const url = `${API_BASE_URL}${topic}.json`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ExhibitionResponse = await response.json()

      exhibitions.value = data.items
      exhibitionInfo.value = data.information
      lastUpdate.value = data.last_update
      visitInfo.value = data.visit || null
    } catch (e) {
      error.value = '載入資料失敗'
      console.error('Failed to fetch exhibitions:', e)
    } finally {
      isLoading.value = false
    }
  }

  function setStatusFilter(status: string) {
    statusFilter.value = status
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function getInitTopic(): string {
    const params = new URLSearchParams(window.location.search)
    const topic = params.get('topic')
    if (topic && isValidTopic(topic)) {
      return topic
    }
    return DEFAULT_TOPIC
  }

  return {
    exhibitions,
    currentTopic,
    exhibitionInfo,
    lastUpdate,
    visitInfo,
    isLoading,
    error,
    searchQuery,
    statusFilter,
    filteredExhibitions,
    fetchExhibitions,
    setStatusFilter,
    setSearchQuery,
    getInitTopic
  }
})

// Helper function for status calculation (also used in composable)
export function getExhibitionStatus(dateString: string | null): string {
  if (dateString == null) {
    return '無法判斷'
  }

  const now = new Date()
  const nowDate = new Date(now.toLocaleDateString('zh-TW'))
  const splitDateString = dateString.split('~')
  const firstPart = splitDateString[0] ?? ''
  const secondPart = splitDateString[1]

  if (splitDateString.length === 1 && (firstPart === '-' || firstPart === '')) {
    return '進行中'
  }

  if (splitDateString.length === 1) {
    const oneDate = new Date(firstPart.trim())
    if (isNaN(oneDate.getTime())) {
      return '無法判斷'
    }
    if (nowDate > oneDate) {
      return '已經結束'
    }
    if (oneDate > nowDate) {
      return '尚未開始'
    }
    return '無法判斷'
  } else if (splitDateString.length === 2) {
    if (secondPart === '' || secondPart === undefined) {
      return '進行中'
    } else {
      const startDate = new Date(firstPart.trim())
      const endDate = new Date(secondPart.trim())
      if (startDate > nowDate) {
        return '尚未開始'
      }
      if (nowDate > endDate) {
        return '已經結束'
      }
      return '進行中'
    }
  }

  return '無法判斷'
}
