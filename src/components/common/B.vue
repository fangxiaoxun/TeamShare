<script lang='ts'>
import A from '@/components/common/A.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'B',
  extends: A,
  props: {
    message: {
      type: String,
      default: '这是继承的子组件'
    }
  },
  emits: ['method'], // 声明 method 事件
  methods: {
    onClick() {
      this.$emit('method')
    }
  }
})
</script>
<template>
   <p>{{ message }}</p>
    <button @click="onClick">点击</button>
</template>
<style lang='less' scope></style>