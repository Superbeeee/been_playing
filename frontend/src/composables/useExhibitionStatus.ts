import type { ExhibitionStatus } from '@/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/zh-tw'

dayjs.extend(relativeTime)
dayjs.extend(timezone)
dayjs.locale('zh-tw')

export function useExhibitionStatus() {
  function getStatus(dateString: string | null): ExhibitionStatus {
    if (dateString == null) {
      return '無法判斷'
    }

    const nowDate = dayjs(new Date().toLocaleDateString('zh-TW'))
    const splitDateString = dateString.split('~')
    const firstPart = splitDateString[0] ?? ''
    const secondPart = splitDateString[1]

    if (splitDateString.length === 1 && (firstPart === '-' || firstPart === '')) {
      return '進行中'
    }

    if (splitDateString.length === 1) {
      const oneDate = dayjs(firstPart.trim())
      if (!oneDate.isValid()) {
        return '無法判斷'
      }
      if (nowDate.isAfter(oneDate)) {
        return '已經結束'
      }
      if (oneDate.isAfter(nowDate)) {
        return '尚未開始'
      }
      return '無法判斷'
    } else if (splitDateString.length === 2) {
      if (secondPart === '' || secondPart === undefined) {
        return '進行中'
      } else {
        const startDate = dayjs(firstPart.trim())
        const endDate = dayjs(secondPart.trim())
        if (startDate.isAfter(nowDate)) {
          return '尚未開始'
        }
        if (nowDate.isAfter(endDate)) {
          return '已經結束'
        }
        return '進行中'
      }
    }

    return '無法判斷'
  }

  function getStatusBadgeClass(status: ExhibitionStatus): string {
    const classes: Record<ExhibitionStatus, string> = {
      '尚未開始': 'bg-warning',
      '進行中': 'bg-success',
      '已經結束': 'bg-danger',
      '無法判斷': 'bg-secondary'
    }
    return classes[status]
  }

  function getStatusTextClass(status: ExhibitionStatus): string {
    // For warning and danger badges, use dark text
    if (status === '尚未開始' || status === '已經結束') {
      return 'text-dark'
    }
    return ''
  }

  function isFinishedAfter5Days(dateString: string | null): boolean {
    if (!dateString) return false

    const nowDate = dayjs(new Date().toLocaleDateString('zh-TW'))
    const splitDateString = dateString.split('~')
    const firstPart = splitDateString[0] ?? ''
    const secondPart = splitDateString[1]

    if (splitDateString.length === 1) {
      const oneDate = dayjs(firstPart.trim())
      return nowDate.isAfter(oneDate.add(5, 'days'))
    }

    if (splitDateString.length === 2 && secondPart) {
      const endDate = dayjs(secondPart.trim())
      return nowDate.isAfter(endDate.add(5, 'days'))
    }

    return false
  }

  function formatDate(dateString: string): string {
    const date = dayjs(dateString)
    return `${date.fromNow()} (${date.format('YYYY-MM-DD HH:mm:ss')})`
  }

  return {
    getStatus,
    getStatusBadgeClass,
    getStatusTextClass,
    isFinishedAfter5Days,
    formatDate
  }
}
