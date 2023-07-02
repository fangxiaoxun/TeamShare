<script lang="ts" setup>
import { onMounted } from 'vue';
import { ref } from 'vue'
const handleChange = (val: any) => {
    console.log(val);
}
const activeNames = ['1']
const LEFTNAV = ref<HTMLElement>(document.createElement('div'))
const foldBtn = ref<HTMLElement>(document.createElement('div'))
const unfoldBtn = ref<HTMLElement>(document.createElement('div'))

console.log(LEFTNAV.value)
onMounted(() => {
    console.log(LEFTNAV.value)
    foldBtn.value.addEventListener('click', () => {
        LEFTNAV.value.classList.add('active')
        unfoldBtn.value.style.display = 'block'
    })
    unfoldBtn.value.addEventListener('click', () => {
        LEFTNAV.value.classList.remove('active')
        unfoldBtn.value.style.display = 'none'

    })

})


// 树形空间data
interface Tree {
    label: string
    children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
    console.log(data)
}

const data: Tree[] = [
    {
        label: 'Level one 1',
        children: [
            {
                label: '文件1',
            },
            {
                label: '文件2',
            },
            {
                label: '文件3',
            },
        ],
    },
]

const defaultProps = {
    children: 'children',
    label: 'label',
}
</script>
<template>
    <main>
        <nav class="leftBar" ref="LEFTNAV">
            <div class="title">
                <h2 class="folderName">文件名</h2>
                <div class="fold-btn" ref="foldBtn"><svg-icon name="fold" width="28px" height="28px"></svg-icon></div>
            </div>
            <el-collapse v-model="activeNames" @change="handleChange" class="collapse">
                <el-collapse-item title="目录" name="1" class="el-collapse-item">
                    <div class="file">文件1</div>
                    <div class="file">文件2</div>
                </el-collapse-item>
            </el-collapse>



            <!-- 树形控件 -->
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
        </nav>
        <div class="unfold-btn" ref="unfoldBtn"><svg-icon name="fold" width="28px" height="28px"></svg-icon></div>
        <div class="display">

        </div>
    </main>
</template>
<style lang="less" scoped>
.leftBar {
    // position: absolute;
    // left: 0;
    width: @leftBar-size;
    height: 100vh;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 1px 4px rgba(13, 13, 13, 0.1);
    transition: .3s all ease-in;
}

.leftBar.active {
    margin-left: -@leftBar-size;
}

.title {
    display: flex;
    align-content: center;
    justify-content: space-between;
    margin-bottom: 30px;
}

.fold-btn,
.unfold-btn {
    cursor: pointer;
    width: 30px;
    height: 30px;
    transition: .2s all;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-content: center;
}

.fold-btn:hover {
    background-color: @hover-gray;
}
.unfold-btn:hover{
    background-color: #e5e5e5;
}

.unfold-btn {
    display: none;
    position: absolute;
    top: 20px;
    left: 40px;
    transform: rotate(180deg);
}

.file {
    cursor: pointer;
    padding-left: 30px;
    line-height: 35px;
    border-radius: 5px;
    transition: all .2s;
}

.file:hover {
    background-color: @hover-gray;
}

// 编辑器内页
main{
    background-color: @bgPrimary;
}
.display {
    width: 100%;
    height: 100vh;
    background-color: @bgPrimary;
}</style>