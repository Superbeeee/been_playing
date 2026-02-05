<script setup lang="ts">
import { computed } from 'vue'
import { useExhibitionStore, useAchievementStore } from '@/stores'
import StatusBadge from './StatusBadge.vue'
import StatusFilter from './StatusFilter.vue'

const exhibitionStore = useExhibitionStore()
const achievementStore = useAchievementStore()

const exhibitions = computed(() => exhibitionStore.filteredExhibitions)

function handleMarkAchieved(item: typeof exhibitions.value[0]) {
  achievementStore.addAchievement(item.title, item.figure, item.UUID)
}

function isBugRow(item: typeof exhibitions.value[0]) {
  return item.systematics === 'BUG'
}
</script>

<template>
  <div class="table-responsive">
    <table
      id="exhibition"
      class="table align-middle caption-top"
      style="width: 100%"
    >
      <thead>
        <tr>
          <th class="col-title">展覽名稱</th>
          <th class="col-figure">圖片</th>
          <th class="col-date">日期</th>
          <th class="col-address">地點</th>
          <th class="col-status">狀態</th>
          <th class="col-action">去過了?</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="exhibitionStore.isLoading">
          <td colspan="6" class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>

        <tr v-else-if="exhibitionStore.error">
          <td colspan="6" class="text-center text-danger">
            {{ exhibitionStore.error }}
          </td>
        </tr>

        <tr v-else-if="exhibitions.length === 0">
          <td colspan="6" class="text-center">
            沒有找到展覽資料
          </td>
        </tr>

        <template v-else>
          <tr
            v-for="item in exhibitions"
            :key="item.UUID"
            :class="{ 'table-danger': isBugRow(item) }"
          >
            <!-- BUG row -->
            <template v-if="isBugRow(item)">
              <td colspan="5" style="text-align: center; font-size: 1.5rem;">
                <a target="_blank" :href="item.source_url">
                  <div style="white-space: normal; word-break: break-all;">
                    {{ item.title }}
                    <StatusBadge :date="item.date" tag="h6" />
                  </div>
                </a>
              </td>
              <td class="col-action">
                <button
                  class="btn btn-info btn-mark-achieved"
                  @click="handleMarkAchieved(item)"
                >
                  <i class="bi bi-check-lg"></i>
                </button>
              </td>
            </template>

            <!-- Normal row -->
            <template v-else>
              <td class="col-title">
                <a target="_blank" :href="item.source_url">
                  <div class="cell-title">
                    {{ item.title }}
                    <StatusBadge :date="item.date" tag="h6" />
                  </div>
                </a>
              </td>
              <td class="col-figure">
                <template v-if="item.figure === '-'">-</template>
                <img v-else :src="item.figure" loading="lazy" :alt="item.title" />
              </td>
              <td class="col-date">{{ item.date || '-' }}</td>
              <td class="col-address">
                <div class="cell-address">
                  {{ item.address || '-' }}
                </div>
              </td>
              <td class="col-status">
                <StatusBadge :date="item.date" tag="h2" />
              </td>
              <td class="col-action">
                <button
                  class="btn btn-info btn-mark-achieved"
                  @click="handleMarkAchieved(item)"
                >
                  <i class="bi bi-check-lg"></i>
                </button>
              </td>
            </template>
          </tr>
        </template>
      </tbody>

      <tfoot>
        <tr>
          <th class="col-title">展覽名稱</th>
          <th class="col-figure">圖片</th>
          <th class="col-date">日期</th>
          <th class="col-address">地點</th>
          <th class="col-status">
            <StatusFilter />
          </th>
          <th class="col-action">去過了?</th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
img {
  max-width: 300px;
  height: auto;
  image-rendering: crisp-edges;
}

td {
  word-wrap: break-word;
}

.cell-title {
  width: 18rem;
  white-space: normal;
  word-break: break-all;
}

.cell-address {
  width: 14rem;
  white-space: normal;
  word-break: break-all;
}

/*
 * Responsive column hiding - matches original DataTables responsivePriority:
 *   title:   priority 1 (always visible)
 *   figure:  priority 10002 (hidden first)
 *   date:    priority 1 (always visible)
 *   address: priority 2
 *   status:  priority 2
 *   action:  priority 2
 */

/* < 768px: hide figure, address, status */
@media (max-width: 767.98px) {
  .col-figure {
    display: none;
  }

  .col-address {
    display: none;
  }

  .col-status {
    display: none;
  }

  .cell-title {
    width: auto;
    max-width: 60vw;
  }

  img {
    max-width: 150px;
  }
}

/* < 576px: also hide date, keep only title + action */
@media (max-width: 575.98px) {
  .col-date {
    display: none;
  }

  .cell-title {
    max-width: 70vw;
  }
}
</style>
