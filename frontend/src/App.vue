<script setup lang="ts">
import { onMounted } from 'vue'
import { useUIStore, useExhibitionStore } from '@/stores'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import ToastNotification from '@/components/common/ToastNotification.vue'
import DeleteModal from '@/components/common/DeleteModal.vue'
import ImportModal from '@/components/common/ImportModal.vue'
import TopicSelector from '@/components/exhibition/TopicSelector.vue'
import TableCaption from '@/components/exhibition/TableCaption.vue'
import ExhibitionTable from '@/components/exhibition/ExhibitionTable.vue'
import AchievementSidebar from '@/components/achievement/AchievementSidebar.vue'

const uiStore = useUIStore()
const exhibitionStore = useExhibitionStore()

onMounted(() => {
  // Initialize theme
  uiStore.initTheme()

  // Load initial topic
  const initTopic = exhibitionStore.getInitTopic()
  exhibitionStore.fetchExhibitions(initTopic)
})
</script>

<template>
  <br />

  <!-- Modals -->
  <DeleteModal />
  <ImportModal />

  <!-- Achievement Sidebar -->
  <AchievementSidebar />

  <!-- Toast Notifications -->
  <ToastNotification />

  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <AppHeader />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <!-- Caption Card -->
        <TableCaption />

        <!-- Topic Buttons -->
        <TopicSelector />

        <!-- Exhibition Table -->
        <ExhibitionTable />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <AppFooter />
      </div>
    </div>
  </div>
</template>
