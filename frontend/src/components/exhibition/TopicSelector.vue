<script setup lang="ts">
import { useExhibitionStore } from '@/stores'
import { allTopics } from '@/config/topics'
import type { TopicConfig } from '@/types'

const exhibitionStore = useExhibitionStore()

function selectTopic(topic: TopicConfig) {
  exhibitionStore.fetchExhibitions(topic.topic)
  // Update URL without reload
  const url = new URL(window.location.href)
  url.searchParams.set('topic', topic.topic)
  window.history.pushState({}, '', url.toString())
}

function getButtonStyle(topic: TopicConfig) {
  return {
    color: topic.buttonStyle.color,
    backgroundColor: topic.buttonStyle.backgroundColor,
    borderColor: topic.buttonStyle.borderColor,
    '--bs-btn-hover-color': topic.buttonStyle.color,
    '--bs-btn-hover-bg': topic.buttonStyle.backgroundColor
  }
}
</script>

<template>
  <div class="dt-buttons">
    <button
      v-for="topic in allTopics"
      :key="topic.topic"
      @click="selectTopic(topic)"
      :style="getButtonStyle(topic)"
      class="btn"
      :class="{ active: exhibitionStore.currentTopic === topic.topic }"
    >
      {{ topic.name }}
    </button>
  </div>
</template>

<style scoped>
.dt-buttons {
  display: flex;
  flex-flow: wrap;
  border: thick double #0d6efd;
}

.dt-buttons > button {
  margin: 8px;
}

.btn:hover {
  color: #fff;
}
</style>
