<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2025-02-23 15:56:13
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-03-12 14:26:15
 * 
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { invitedCollaborator } from '@/api/files/index'
import Collaboration from '@tiptap/extension-collaboration';
const router = useRouter();
const props = defineProps<{
    spaceList: Array<any>;
}>();


const handleSpaceClick = (spaceId: string, spaceName: string) => {
    router.push({ name: 'space', params: { spaceId }, query: { title: spaceName } })
}

const currentOpenId = ref(null)



const handleGlobalClick = (event: MouseEvent) => {
    // 检查点击位置是否在 folder-item 或 more-list 内
    const target = event.target as Element;
    if (!target.closest('.folder-item') && !target.closest('.more-list')) {
        currentOpenId.value = null;
    }
};

onMounted(() => {
    document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
    document.removeEventListener('click', handleGlobalClick);
});
// 阻止点击菜单内部时触发全局关闭
const preventClose = (event: MouseEvent) => {
    event.stopPropagation();
};

const handleInvite = () => {

    console.log('邀请')
    invitedCollaborator({
        fileId: '9',
        collaboratorEmail: 'gkotta_181@qq.com',
    })
}


</script>
<template>
    <div
        class="folder-list w-full grid gap-3 grid-cols-[repeat(auto-fill,_minmax(268px,_360px))] auto-rows-auto py-1 pt-[20px] ">
        <div class="folder-item bg-white p-[18px]  rounded-md border-1 border-sold border-[#dcdfe6] hover:border-[#6965db] cursor-pointer relative flex justify-center items-center	relative"
            v-for="space in props.spaceList" :key="space.id" @click="handleSpaceClick(space.id, space.name)">
            <div class="folder-icon w-[30px] h-[30px]"></div>
            <div class="folder-name text- align-middle w-[240px]"> {{ space.name }}</div>
            <button
                class="folder-detail w-[24px] h-[24px] absolute right-[20px] rounded hover:bg-[#1F232919] transition-all cursor-pointer"
                @click.stop="currentOpenId = space.id">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z">
                    </path>
                </svg>
            </button>
            <div v-if="currentOpenId === space.id" @click.stop="preventClose"
                class="w-[200px] rounded border-1 border-b-0 border-gray-200 bg-white shadow-sm absolute right-[-180px] top-[40px] z-2 pl-[20px]">
                <div class="flex items-center border-b border-gray-200 leading-10">
                    <div class="icon w-[24px] h-[24px] mr-[10px] bg-white "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(145,150,161,1)"><path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V2.5L23.5 11L13 19.5V14ZM11 12H15V15.3078L20.3214 11L15 6.69224V10H13C10.5795 10 8.41011 11.0749 6.94312 12.7735C8.20873 12.2714 9.58041 12 11 12Z"></path></svg></div>
                    <div @click="handleInvite">分享</div>
                </div>
                <div class="flex items-center border-b border-gray-200 leading-10">
                    <div class="icon w-[24px] h-[24px] mr-[10px] bg-white ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(145,150,161,1)"><path d="M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z"></path></svg>
                    </div>
                    <div>复制链接</div>
                </div>
                <div class="flex items-center border-b border-gray-200 leading-10">
                    <div class="icon w-[24px] h-[24px] mr-[10px] ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(145,150,161,1)"><path d="M16.0503 12.0498L21 16.9996L16.0503 21.9493L14.636 20.5351L17.172 17.9988L4 17.9996V15.9996L17.172 15.9988L14.636 13.464L16.0503 12.0498ZM7.94975 2.0498L9.36396 3.46402L6.828 5.9988L20 5.99955V7.99955L6.828 7.9988L9.36396 10.5351L7.94975 11.9493L3 6.99955L7.94975 2.0498Z"></path></svg>
                    </div>
                    <div>转移所有权</div>
                </div>
                <div class="flex items-center border-b border-gray-200 leading-10">
                    <div class="icon w-[24px] h-[24px] mr-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(145,150,161,1)"><path d="M21 6.75736L19 8.75736V4H10V9H5V20H19V17.2426L21 15.2426V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5501 3 20.9932V8L9.00319 2H19.9978C20.5513 2 21 2.45531 21 2.9918V6.75736ZM21.7782 8.80761L23.1924 10.2218L15.4142 18L13.9979 17.9979L14 16.5858L21.7782 8.80761Z"></path></svg>
                    </div>
                    <div>重命名</div>
                </div>
                <div class="flex items-center border-b border-gray-200 leading-10">
                    <div class="icon w-[24px] h-[24px] mr-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(145,150,161,1)"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
                    </div>
                    <div>删除</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped></style>