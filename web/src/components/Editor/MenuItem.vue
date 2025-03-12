<template>

    <div class="bg-white px-3 w-60 border-1 border-slate-100 shadow py-2">
        <div class="flex w-full h-8 rounded hover:bg-[#e3e2fe] cursor-pointer" v-for="item in configList"
            :class="{ 'is-active': item.isActive && item.isActive() }" @click.stop="item.action && item.action()">
            <div class="icon w-8 h-8 mr-4">
                <svg class="remix w-full h-full fill-current">
                    <use :xlink:href="`${iconUrl}#ri-${item.icon}`" />
                </svg>
            </div>
            <div class="title leading-8">{{ item.title }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import { ref } from 'vue'
const iconUrl = ref(remixiconUrl)
defineProps({
    configList: []
})

</script>
