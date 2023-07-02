<template>
    <div>
        <svg class="svg" :style="{ width: width, height: height }">
            <use :xlink:href="`#icon-${iconName}`" :fill="color"></use>
          
        </svg>
    </div>
</template>
  
<script lang="ts">
//   defineProps({
//     //xlink:href属性值的前缀
//     prefix: {
//       type: String,
//       default: '#icon-'
//     },
//     //svg矢量图的名字
//     name: String,
//     //svg图标的颜色
//     color: {
//       type: String,
//       default: ""
//     },
//     //svg宽度
//     width: {
//       type: String,
//       default: '16px'
//     },
//     //svg高度
//     height: {
//       type: String,
//       default: '16px'
//     }

//   })
import { ref, watch } from 'vue'
export default {
    name: 'SvgIcon',
    props: {
        name: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ""
        },
        //svg宽度
        width: {
            type: String,
            default: '16px'
        },
        //svg高度
        height: {
            type: String,
            default: '16px'
        }
    },
    setup(props) {
        const iconName = ref(props.name)

        // 监听 props.name 的变化，更新 iconName 变量的值
        watch(() => props.name, (newValue) => {
            iconName.value = newValue
        })

        return {
            iconName
        }
    }
}


</script>
<style></style>