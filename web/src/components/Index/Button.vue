<template>
    <button>
        <div v-if="props.class === 'enterBtn'">
            <router-link to="/directory" :class="props.class">
                立刻使用
                <svg id="btn-arrow" width="19.500000" height="14.000000" viewBox="0 0 19.5 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path id="矢量 462" d="M12.5 1C12.5 2.875 16.58 7 18.5 7" stroke="currentColor" stroke-width="2.000000"
                        stroke-linecap="round"></path>
                    <path id="矢量 462" d="M12.5 13C12.5 11.125 16.58 7 18.5 7" stroke="currentColor" stroke-width="2.000000"
                        stroke-linecap="round"></path>
                    <path id="矢量 463" d="M1 7L18 7" stroke="currentColor" stroke-width="2.000000" stroke-linecap="round">
                    </path>
                </svg>
            </router-link>
        </div>
        <div v-else>
            <router-link to="/draw" :class="props.class">
                留言墙
            </router-link>
        </div>
    </button>
</template>
          
<script lang="ts" setup>
const props = defineProps<{
    class: string
}>()


</script>
          
<style lang="less" scoped>
button {
    height: 56px;
    width: 214px;
    border-radius: 16px;

    .enterBtn {
        user-select: none;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        background-color: #832fff;
        display: block;
        color: #fff;
        text-align: center;
        line-height: 56px;
        transition: all .3s;
        font-size: 18px;
        font-weight: 600;
        transition: all .3s;
        text-decoration: none;

        #btn-arrow {
            margin-top: -4px;
            margin-left: 10px;
            animation: btnArrowEffect 3s both infinite;
            width: 19.5px;
            height: 14px;
        }
    }

    .messageBtn {
        display: block;
        width: 100%;
        height: 100%;
        user-select: none;
        cursor: pointer;
        border: 1px solid #ccc;
        line-height: 56px;
        border-radius: 16px;
        font-size: 18px;
        font-weight: 600;
        color: #000;
        transition: all .3s;
        background-color: #fff;
        text-decoration: none;
    }
}


@keyframes btnArrowEffect {
    0% {
        transform: translate(0);
    }

    10% {
        transform: translate(4px);
    }

    20% {
        transform: translate(-2px);
    }

    30% {
        transform: translate(4px);
    }

    40% {
        transform: translate(-2px);
    }

    50% {
        transform: translate(0);
    }
}</style>

