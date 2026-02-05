# Been Play - Vue 3 前端開發教學

本文件是給**有 HTML/CSS/JS 基礎但沒用過 Vue** 的人看的。
會從環境建置開始，一步步說明這個專案如何運作。

---

## 目錄

1. [環境需求](#1-環境需求)
2. [快速開始](#2-快速開始)
3. [專案結構總覽](#3-專案結構總覽)
4. [Vue 3 核心概念](#4-vue-3-核心概念)
5. [本專案架構詳解](#5-本專案架構詳解)
6. [開發流程](#6-開發流程)
7. [建置與部署](#7-建置與部署)
8. [常見問題](#8-常見問題)

---

## 1. 環境需求

### 必要安裝

| 工具 | 版本 | 說明 |
|------|------|------|
| [Node.js](https://nodejs.org/) | >= 20.x | JavaScript 執行環境 |
| npm | 隨 Node.js 安裝 | 套件管理工具 |
| 編輯器 | 推薦 [VS Code](https://code.visualstudio.com/) | 程式碼編輯 |

### VS Code 推薦安裝的擴充套件

- **Vue - Official** (Vue Language Features) — Vue 語法支援
- **TypeScript Vue Plugin (Volar)** — TypeScript 支援

### 確認安裝成功

```bash
node -v   # 應顯示 v20.x 或更高
npm -v    # 應顯示 10.x 或更高
```

---

## 2. 快速開始

```bash
# 1. 進入前端資料夾
cd frontend

# 2. 安裝所有套件
npm install

# 3. 啟動開發伺服器
npm run dev

# 4. 瀏覽器打開顯示的網址 (通常是 http://localhost:5173)
```

開發伺服器會在你修改程式碼時**自動重新載入**頁面 (Hot Module Replacement)。

---

## 3. 專案結構總覽

```
frontend/
├── public/                 # 靜態檔案 (不經過打包處理)
│   └── icons/              # PWA 用的 icon
│
├── src/                    # 所有原始碼都在這裡
│   ├── main.ts             # 🔑 程式入口點
│   ├── App.vue             # 🔑 根元件 (整個畫面的起點)
│   ├── style.css           # 全域 CSS 樣式
│   │
│   ├── types/              # TypeScript 型別定義
│   │   └── index.ts        # 所有資料介面
│   │
│   ├── config/             # 設定檔
│   │   ├── constants.ts    # 常數 (API URL、localStorage key)
│   │   └── topics.ts       # 52 個展覽/平台的設定
│   │
│   ├── stores/             # 📦 Pinia 狀態管理
│   │   ├── achievementStore.ts  # 成就資料
│   │   ├── exhibitionStore.ts   # 展覽資料
│   │   └── uiStore.ts          # UI 狀態 (主題、Modal)
│   │
│   ├── composables/        # 🔧 可重用邏輯
│   │   ├── useExhibitionStatus.ts  # 日期 → 狀態判斷
│   │   └── useClipboard.ts        # 剪貼簿複製
│   │
│   └── components/         # 🧩 Vue 元件
│       ├── common/         # 通用元件
│       │   ├── AppHeader.vue       # 頂部導覽列
│       │   ├── AppFooter.vue       # 底部聲明
│       │   ├── ThemeToggle.vue     # 深色/淺色切換按鈕
│       │   ├── ToastNotification.vue # 通知提示
│       │   ├── DeleteModal.vue     # 刪除確認對話框
│       │   └── ImportModal.vue     # 匯入確認對話框
│       │
│       ├── exhibition/     # 展覽相關元件
│       │   ├── ExhibitionTable.vue # 展覽列表表格
│       │   ├── TopicSelector.vue   # Topic 按鈕區
│       │   ├── TableCaption.vue    # 展館資訊卡片
│       │   ├── StatusBadge.vue     # 狀態徽章
│       │   └── StatusFilter.vue    # 狀態篩選下拉
│       │
│       └── achievement/    # 成就相關元件
│           ├── AchievementSidebar.vue # 左側成就面板
│           └── AchievementCard.vue    # 成就卡片
│
├── index.html              # HTML 模板
├── package.json            # 套件清單與指令
├── vite.config.ts          # Vite 建置設定
├── tsconfig.json           # TypeScript 設定
└── tsconfig.app.json       # TypeScript 應用程式設定
```

---

## 4. Vue 3 核心概念

### 4.1 Single File Component (SFC)

Vue 把一個元件的 **HTML、JavaScript、CSS** 寫在同一個 `.vue` 檔案中：

```vue
<script setup lang="ts">
// JavaScript / TypeScript 邏輯
import { ref } from 'vue'

const count = ref(0)  // 響應式變數

function increment() {
  count.value++
}
</script>

<template>
  <!-- HTML 模板 -->
  <button @click="increment">
    點擊次數: {{ count }}
  </button>
</template>

<style scoped>
/* CSS 樣式 (scoped = 只影響這個元件) */
button {
  font-size: 1.2rem;
}
</style>
```

### 4.2 響應式資料 (Reactivity)

Vue 3 使用 `ref()` 和 `reactive()` 來建立**響應式資料**——當資料改變時，畫面自動更新。

```ts
import { ref, computed } from 'vue'

// ref: 包裝單一值 (string, number, boolean, array, object)
const name = ref('Hello')
name.value = 'World'  // ⚠️ 在 script 中要用 .value 存取

// computed: 根據其他響應式資料計算的值 (會自動快取)
const greeting = computed(() => `Hi, ${name.value}!`)
```

在 `<template>` 中**不需要** `.value`：

```vue
<template>
  <p>{{ name }}</p>        <!-- 直接用，不需要 .value -->
  <p>{{ greeting }}</p>
</template>
```

### 4.3 指令 (Directives)

| 指令 | 說明 | 範例 |
|------|------|------|
| `v-if` | 條件渲染 | `<p v-if="show">顯示</p>` |
| `v-else` | 搭配 v-if | `<p v-else>不顯示</p>` |
| `v-for` | 迴圈渲染 | `<li v-for="item in list" :key="item.id">` |
| `v-bind` (縮寫 `:`) | 綁定屬性 | `:href="url"` 等同 `v-bind:href="url"` |
| `v-on` (縮寫 `@`) | 綁定事件 | `@click="fn"` 等同 `v-on:click="fn"` |
| `v-model` | 雙向綁定 | `<input v-model="text">` |

### 4.4 Props 與 Emit

**父元件傳資料給子元件** → Props：

```vue
<!-- 父元件 -->
<StatusBadge :date="item.date" tag="h6" />

<!-- 子元件 StatusBadge.vue -->
<script setup lang="ts">
const props = defineProps<{
  date: string | null
  tag?: string
}>()
</script>
```

**子元件通知父元件** → Emit：

```vue
<!-- 子元件 -->
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update', value: string): void
}>()

function handleClick() {
  emit('update', 'new value')
}
</script>

<!-- 父元件 -->
<MyComponent @update="handleUpdate" />
```

### 4.5 生命週期

```ts
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  // 元件掛載到 DOM 後執行 (類似 DOMContentLoaded)
  console.log('元件已顯示在畫面上')
})

onUnmounted(() => {
  // 元件從 DOM 移除時執行 (清理用)
})
```

---

## 5. 本專案架構詳解

### 5.1 程式入口 (`main.ts`)

```ts
import { createApp } from 'vue'       // Vue 核心
import { createPinia } from 'pinia'   // 狀態管理
import App from './App.vue'           // 根元件

import 'bootstrap/dist/css/bootstrap.min.css'  // Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css'                  // 自訂樣式

const app = createApp(App)
app.use(createPinia())  // 安裝 Pinia
app.mount('#app')       // 掛載到 index.html 中的 <div id="app">
```

### 5.2 Pinia 狀態管理

Pinia 是 Vue 3 官方推薦的**全域狀態管理**工具。
把多個元件需要共享的資料放在 Store 中。

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Component A  │     │   Pinia      │     │ Component B  │
│              │────>│   Store      │<────│              │
│ 讀取/修改     │     │  (共享資料)   │     │ 讀取/修改     │
└──────────────┘     └──────────────┘     └──────────────┘
```

本專案有 3 個 Store：

#### `achievementStore` — 成就資料

```ts
// 在任何元件中使用
import { useAchievementStore } from '@/stores'

const store = useAchievementStore()

// 讀取
store.achievements        // 所有成就 [{title, figure, uuid}]
store.achievementCount    // 成就數量
store.isAchieved('xxx')   // 檢查某展覽是否已打卡

// 操作
store.addAchievement(title, figure, uuid)  // 新增成就
store.clearAllAchievements()               // 清空全部
store.exportAchievements()                 // 匯出 JSON 字串
store.importAchievements(data)             // 匯入資料
```

#### `exhibitionStore` — 展覽資料

```ts
const store = useExhibitionStore()

// 讀取
store.exhibitions          // 原始展覽列表
store.filteredExhibitions  // 過濾後的列表 (排除已打卡 + 搜尋 + 狀態篩選)
store.currentTopic         // 目前選擇的 topic
store.exhibitionInfo       // 展館資訊
store.isLoading            // 是否載入中

// 操作
store.fetchExhibitions('HuaShan1914')  // 載入某個 topic 的資料
store.setStatusFilter('進行中')         // 設定狀態篩選
store.setSearchQuery('關鍵字')          // 設定搜尋
```

#### `uiStore` — UI 狀態

```ts
const store = useUIStore()

store.isDarkMode                    // 是否深色模式
store.toggleTheme()                 // 切換主題
store.isAchievementSidebarOpen      // 成就面板是否開啟
store.toggleAchievementSidebar()    // 切換面板
store.showToast('訊息', 'success')  // 顯示通知
```

### 5.3 Composables（可重用邏輯）

Composable 是一個以 `use` 開頭的函式，封裝**可重用的邏輯**：

```ts
// 使用方式
import { useExhibitionStatus } from '@/composables'

const { getStatus, formatDate } = useExhibitionStatus()

const status = getStatus('2025-01-01 ~ 2025-12-31')
// → '進行中'
```

### 5.4 資料流

```
使用者選擇 Topic
       │
       ▼
 TopicSelector.vue
       │ 呼叫 exhibitionStore.fetchExhibitions(topic)
       ▼
 exhibitionStore ──── fetch ────> GitHub Raw JSON API
       │                              │
       │ <──── 回傳展覽資料 ────────────┘
       │
       ▼
 filteredExhibitions (computed)
  ├── 排除已打卡的 (比對 achievementStore)
  ├── 套用狀態篩選
  └── 套用搜尋關鍵字
       │
       ▼
 ExhibitionTable.vue (v-for 渲染每一列)
       │
       ▼
 使用者點擊「去過了?」
       │
       ▼
 achievementStore.addAchievement()
  └── 自動存入 localStorage
       │
       ▼
 filteredExhibitions 自動重新計算
  └── 該展覽從列表消失
```

---

## 6. 開發流程

### 6.1 日常開發

```bash
cd frontend
npm run dev     # 啟動開發伺服器 (http://localhost:5173)
```

修改 `.vue` 或 `.ts` 檔案後瀏覽器會自動更新。

### 6.2 新增元件

1. 在 `src/components/` 對應資料夾建立 `.vue` 檔
2. 在父元件中 `import` 並使用

```vue
<!-- src/components/exhibition/NewComponent.vue -->
<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div>{{ title }}</div>
</template>
```

```vue
<!-- 在父元件中使用 -->
<script setup lang="ts">
import NewComponent from './NewComponent.vue'
</script>

<template>
  <NewComponent title="Hello" />
</template>
```

### 6.3 新增 Topic

如果要新增一個展覽來源，編輯 `src/config/topics.ts`：

```ts
// 在 exhibitionTopics 或 platformTopics 陣列中新增
{
  topic: 'NewMuseum',           // 對應 API JSON 檔名
  name: '新博物館',              // 顯示名稱
  buttonStyle: {
    color: '#fff',              // 文字顏色
    backgroundColor: '#336699', // 背景色
    borderColor: '#336699'      // 邊框色
  }
}
```

### 6.4 TypeScript 型別檢查

```bash
# 只做型別檢查 (不建置)
npx vue-tsc --noEmit
```

---

## 7. 建置與部署

### 7.1 建置

```bash
cd frontend
npm run build
```

建置結果輸出到 `../docs/v3/`，可直接透過 GitHub Pages 部署。

### 7.2 預覽建置結果

```bash
npm run preview
```

### 7.3 建置產出的檔案

```
docs/v3/
├── index.html              # 進入頁面
├── manifest.webmanifest    # PWA 設定
├── registerSW.js           # Service Worker 註冊
├── sw.js                   # Service Worker (離線快取)
├── icons/                  # PWA 圖示
└── assets/
    ├── index-xxxx.js       # 打包後的 JS (含 Vue + Bootstrap)
    └── index-xxxx.css      # 打包後的 CSS
```

---

## 8. 常見問題

### Q: `@/` 路徑是什麼意思？

`@` 是 `src/` 資料夾的別名。例如：
- `@/stores` → `src/stores/`
- `@/components/common/AppHeader.vue` → `src/components/common/AppHeader.vue`

設定在 `vite.config.ts` 和 `tsconfig.app.json` 中。

### Q: `.value` 什麼時候要加？

- **在 `<script>` 中**：`ref` 變數要用 `.value` 存取
- **在 `<template>` 中**：不需要，Vue 自動解包

```ts
const count = ref(0)
count.value++        // script 中要 .value
```

```vue
<template>
  {{ count }}         <!-- template 中不要 .value -->
</template>
```

### Q: Store 裡的 `computed` 和 `ref` 差在哪？

- `ref`：手動設定的值，要直接賦值才會變
- `computed`：**自動計算**的值，當依賴的資料改變時自動更新

```ts
const list = ref([1, 2, 3])              // 手動管理
const total = computed(() => list.value.length)  // 自動計算，list 變就會跟著變
```

### Q: `scoped` CSS 是什麼？

```vue
<style scoped>
/* 加了 scoped，這裡的 CSS 只影響這個元件，不會污染其他元件 */
.title { color: red; }
</style>
```

### Q: 本專案用了哪些套件？

| 套件 | 用途 |
|------|------|
| `vue` | 前端框架 |
| `pinia` | 狀態管理 |
| `bootstrap` | CSS 框架 (與原版一致) |
| `bootstrap-icons` | 圖示字型 |
| `@iconify/vue` | 主題切換的太陽/月亮 icon |
| `dayjs` | 日期處理 (計算展覽狀態) |
| `vite` | 建置工具 |
| `vite-plugin-pwa` | PWA 支援 |
| `typescript` | 型別安全 |

### Q: 資料存在哪裡？

- **展覽資料**：從 GitHub 遠端 JSON 載入 (不存在本地)
  ```
  https://raw.githubusercontent.com/JustIceQAQ/been_playing/auto/data-update/data/v2/{topic}.json
  ```
- **成就記錄**：存在瀏覽器的 `localStorage`，key 是 `been-been-play-achievements`

### Q: 怎麼偵錯？

1. 瀏覽器按 F12 打開開發者工具
2. 安裝 [Vue Devtools](https://devtools.vuejs.org/) 瀏覽器擴充套件
3. 可在 Vue Devtools 中查看元件樹、Pinia Store 狀態

課程進度表
第 1 堂：環境建置 + 第一個 Vue 元件
目標： 能跑起開發伺服器，理解 .vue 檔案結構

時間	內容
0-15 min	安裝 Node.js、VS Code + Vue 擴充套件
15-25 min	cd frontend && npm install && npm run dev，看到畫面跑起來
25-40 min	打開 App.vue，解釋 <script setup> / <template> / <style> 三區塊
40-55 min	動手： 新建一個 HelloWorld.vue 元件，在 App.vue 中引入顯示
55-60 min	預告下堂內容
課後作業： 修改 AppFooter.vue 的文字，確認畫面即時更新

第 2 堂：響應式資料 + 指令
目標： 理解 ref、v-if、v-for、@click

時間	內容
0-10 min	開啟 ThemeToggle.vue，看實際程式碼講解 ref 和 @click
10-25 min	動手： 做一個計數器元件（ref + @click + {{ count }}）
25-40 min	開啟 ExhibitionTable.vue，看 v-for 和 v-if 實際用法
40-55 min	動手： 做一個 todo list 小練習（ref([]) + v-for + v-if 顯示空狀態）
55-60 min	解釋 .value 在 script vs template 的差異
課後作業： 在 todo list 加上刪除功能

第 3 堂：Props + 元件拆分
目標： 會拆元件、會用 defineProps 傳資料

時間	內容
0-10 min	看 StatusBadge.vue 如何接收 date 和 tag props
10-25 min	看 AchievementCard.vue 如何接收整個物件 prop
25-45 min	動手： 把第 2 堂的 todo list 拆成 TodoItem.vue（用 props 傳資料、用 emit 刪除）
45-55 min	講解 computed，看 ExhibitionTable.vue 中 filteredExhibitions
55-60 min	複習元件間的資料流方向：Parent → Child (props)、Child → Parent (emit)
課後作業： 在 TodoItem 加上「完成」狀態切換

第 4 堂：Pinia 狀態管理
目標： 理解為什麼需要 Store、會讀寫 Store

時間	內容
0-15 min	問題引入：多個元件要共用資料怎麼辦？畫 Store 示意圖
15-30 min	帶讀 achievementStore.ts，講解 defineStore、ref、computed、actions
30-45 min	動手： 在 Vue Devtools 中操作 Store，觀察資料變化
45-55 min	動手： 開瀏覽器 Console，用 localStorage 查看成就資料，嘗試手動修改後重新載入
55-60 min	對照 exhibitionStore.ts 看 API 資料如何載入到 Store
課後作業： 讀 uiStore.ts，理解 theme 切換的完整流程

第 5 堂：Composables + 實際功能修改
目標： 理解 composable 模式、能修改實際功能

時間	內容
0-15 min	帶讀 useExhibitionStatus.ts，講解封裝邏輯的好處
15-25 min	帶讀 useClipboard.ts，看如何結合 Store 使用
25-45 min	動手： 實際修改功能——在 topics.ts 新增一個 Topic，驗證整個流程
45-55 min	動手： 修改 StatusBadge.vue 的顏色或新增一個狀態
55-60 min	講解 onMounted 生命週期，看 App.vue 如何初始化
課後作業： 試著在 AchievementSidebar.vue 加上成就數量顯示

第 6 堂：建置部署 + 完整回顧
目標： 會建置、理解整個專案的完整架構

時間	內容
0-10 min	npm run build，觀察 docs/v3/ 產出
10-20 min	講解 vite.config.ts（base path、PWA 設定、build output）
20-35 min	動手： 從零開始加一個完整小功能（例：在表格新增「收藏」按鈕，存到 Store）
35-50 min	繼續實作 + Debug
50-60 min	畫出完整架構圖回顧：入口 → Store → Component → 使用者互動 → Store 更新 → 畫面自動刷新
學習路線圖

第1堂          第2堂          第3堂          第4堂          第5堂          第6堂
環境+SFC  →  ref+指令  →  Props+拆元件 →  Pinia Store →  Composable  →  建置+總複習
                                              ↑
                                          核心轉折點
                                    (從單元件到多元件共享)