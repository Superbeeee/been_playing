export const API_BASE_URL = 'https://raw.githubusercontent.com/JustIceQAQ/been_playing/auto/data-update/data/v2/'

export const STORAGE_KEYS = {
  ACHIEVEMENTS: 'been-been-play-achievements',
  THEME: 'theme'
} as const

export const STATUS_OPTIONS = [
  { value: '', label: '全部顯示' },
  { value: '尚未開始', label: '尚未開始' },
  { value: '進行中', label: '進行中' },
  { value: '已經結束', label: '已經結束' },
  { value: '無法判斷', label: '無法判斷' },
] as const

export const DEFAULT_TOPIC = 'HuaShan1914'

export const CLUSTERS_MAP_URL = 'https://justiceqaq.github.io/been_playing/been_play_clusters_map.html'
