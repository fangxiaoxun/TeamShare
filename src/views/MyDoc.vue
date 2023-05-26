<script lang='ts'>
import A from '@/components/common/A.vue';
import B from '@/components/common/B.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Parent',
    components: {
        B
    },
    methods: {
        onMethod() {
            console.log('点击了组件 B 中的按钮')
        }
    }
})

</script>
<template>
    <B @method="onMethod" :message="'这里是B组件的message'" ></B>
</template>
<style lang='less' scope></style>