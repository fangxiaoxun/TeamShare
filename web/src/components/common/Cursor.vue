<script lang="ts" setup>
import { computed, watch, onMounted } from 'vue';
const props = defineProps({
  userName: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  position: {
    type: Object,
    default: () => ({ left: 0, top: 0 }),
  },
  visible: {
    type: Boolean,
    default: false,
  },
//   parentElement: {
//     type: Element || null,
//     default: null
//   }
})

const cursorStyle = computed(() => {
    // const fontSize = parseFloat(window.getComputedStyle(props.parentElement).fontSize)
    const left = props.position.left < 0 ? 0 : props.position.left
    const top = props.position.top 
    return {
        left: `${left}px`,
        top: `${top}px`,
        backgroundColor: props.color,
    }
})
</script>
<template>
  <div v-if="props.visible" class="absolute h-6	pointer-events-none	w-[1px]" :style="cursorStyle">
    <div class="cursor-tooltip absolute top-[-20px] left-[2px] bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap" >
      {{ props.userName }}
    </div>
  </div>
</template>
<style scoped lang="less"></style>