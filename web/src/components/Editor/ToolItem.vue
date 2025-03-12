<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2025-03-02 20:50:25
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-03-05 15:50:54
 * 
-->
<script lang="ts" setup>
// import remixiconUrl from ''
import { ref } from 'vue'
import {
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElTooltip,

} from 'element-plus'
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import { IConfigItem } from './ToolsBar.vue'
// console.log(IConfigItem)

defineProps({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    action: {
        type: Function,
    },
    isActive: {
        type: Function,
        default: null
    },
    childrenList: {
        type: Array as () => IConfigItem[],
        default: () => []
    }
})
const iconUrl = ref(remixiconUrl)
</script>
<template>
    <el-tooltip placement="top" :content="title" effect="dark" v-if="childrenList.length === 0">
        <button
            class="h-9 w-9 text-[#3d3d3d] border-none rounded-md px-1 mr-1 hover:bg-[#f5f5f5] active:bg-[#e3e2fe] bg-transparent cursor-pointer"
            :class="{ 'is-active': isActive ? isActive() : null }" @click="() => action && action()" :title="title"
            >
            <svg class="remix w-full h-full fill-current">
                <use :xlink:href="`${iconUrl}#ri-${icon}`" />
            </svg>
        </button>
    </el-tooltip>

    <el-dropdown placement="bottom" trigger="click" v-else>
        <button
            class="h-9 w-9 text-[#3d3d3d] border-none rounded-md px-1 mr-1 hover:bg-[#f5f5f5] active:bg-[#e3e2fe] bg-transparent cursor-pointer">
            <svg class="remix w-full h-full fill-current">
                <use :xlink:href="`${iconUrl}#ri-${icon}`" />
            </svg>
        </button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="item in childrenList">
                    <!-- <el-divider v-if="item.title === 'divider'"></el-divider> -->
                    <el-tooltip placement="top" effect="dark" :content="item.title">
                    
                        <button
                            class="menu-item h-7 w-7 text-[#454D5A] border-none rounded-md px-1 mr-1 hover:bg-[#f5f5f5] active:bg-[#e3e2fe] bg-transparent cursor-pointer"
                            :class="{ 'is-active':item.isActive && item.isActive()}" @click.stop="item.action && item.action()">
                            <svg class="remix w-full h-full fill-current">
                                <use :xlink:href="`${iconUrl}#ri-${item.icon}`" />
                            </svg>
                        </button>
                    </el-tooltip>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}
</style>