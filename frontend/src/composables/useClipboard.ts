import { useUIStore } from '@/stores'

export function useClipboard() {
  const uiStore = useUIStore()

  async function copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text)
      uiStore.showToast('分享網址已複製於剪貼簿', 'success')
      return true
    } catch (err) {
      uiStore.showToast('複製失敗', 'error')
      return false
    }
  }

  return {
    copyToClipboard
  }
}
