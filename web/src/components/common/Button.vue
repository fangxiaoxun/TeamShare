<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2023-07-13 02:49:58
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-02-18 19:45:30
 * 
-->
<script lang="ts" setup>
import { vClickOutside } from '@/hooks/clickOutside'
const show = (element: HTMLElement) => {
  element.classList.contains('active') && element.classList.remove('active')
}
</script>
<template>
  <div class="btn cursor-pointer w-36 h-9 rounded-lg mx-auto border border-transparent bg-white text-center shadow-sm transition-all duration-100 hover:border-gray-700 hover:bg-gray-200 hover:shadow-none" v-click-outside="show">
    <span class="leading-9 text-gray-700">按钮</span>
  </div>
</template>
<style lang="postcss" scoped>
.btn {
  @apply cursor-pointer w-36 h-9 rounded-lg mx-auto border border-transparent bg-white text-center shadow-sm transition-all duration-100;

  span {
    @apply leading-9 text-gray-700;
  }
}

.btn:hover {
  @apply border-gray-700 bg-gray-200 shadow-none;
}

.blue-btn {
  @apply bg-blue-500 border-transparent shadow-none;

  span {
    @apply text-white;
  }
}

.blue-btn:hover {
  @apply bg-blue-600;
}
</style>
