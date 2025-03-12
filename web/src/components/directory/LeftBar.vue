<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2023-07-13 02:49:58
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-03-10 16:40:17
 * 
-->
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import {
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElMessage,
    ElMessageBox
} from 'element-plus'


import { addFolder, getFolderList } from '@/api/folder/index'
import { useFolderStore } from '@/store/folder'
const folderStore = useFolderStore()
const router = useRouter()

const { spaceId } = router.currentRoute.value?.params

const routes = router
  .getRoutes()
  .filter((route) => route.meta && route.meta.title)


  
const handleNewset = () => {
//   router.push('/docView')
router.push({name: 'docView', query: { spaceId }})
}
const handleAddFolder = async (folderName:string, parentId = null) => {
    try{
        const res = await addFolder({folderName,parentId})
        return res.data
    }catch(err){
        ElMessage.error('新建文件夹失败')
        return null
    }
}

const handleCreate = () => {
    ElMessageBox.prompt('请输入文件夹名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
        inputErrorMessage: '文件夹名称只能包含中文、英文、数字和下划线',
    }).then(async ({ value }) => {
        await handleAddFolder(value)
        // await getFolderList()
        await folderStore.getFolderInfo()
        ElMessage.success('新建文件夹成功')
        
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '取消输入'
        })
    })
}
</script>
<template>
  <div class="w-64 h-full overflow-y-scroll leftBar">
    <!-- 新建按钮 -->
    <div class="mb-8">
      <div
        class="cursor-pointer w-[220px] h-9 rounded-lg mx-auto mb-3 border border-transparent bg-[#6965db] shadow-sm transition-all duration-100 hover:border-gray-700 hover:shadow-none hover:bg-[#5b57d1]">
      <el-dropdown placement="bottom" trigger="click" class="w-[100%] h-[100%] el-dropdown">
        <div class="text-center">
            <span class="leading-9 text-white" >新建</span>
        </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleNewset">新建文档</el-dropdown-item>
              <el-dropdown-item @click="handleCreate">新建文件夹</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div
        class="cursor-pointer w-[220px] h-9 rounded-lg mx-auto mb-3 border border-transparent bg-white text-center shadow-sm transition-all duration-100 hover:border-gray-700 hover:shadow-none hover:bg-gray-200"
      >
        <span class="leading-9 text-gray-700">导入</span>
      </div>
    </div>
    <!-- 引入路由导航 -->
    <div class="page">
      <router-link
        v-for="item in routes"
        :to="item.path"
        active-class="active"
        class="item flex items-center w-[220px] mx-auto my-2 px-2.5 py-0 text-decoration-none rounded-lg hover:bg-gray-100"
      >
        <i
          class="icon flex justify-center items-center w-7 h-7 mr-4 rounded-lg bg-gray-200"
        >
          <svg-icon
            class="tab-icon"
            :name="item.name"
            width="20px"
            height="20px"
          ></svg-icon>
        </i>
        <span class="block leading-[50px] text-sm font-bold text-gray-600">
          {{ item?.meta?.title }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
.menu {
  cursor: pointer;
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 40%;
  width: 150px;
  border-radius: 6px;
  padding: 6px;
  background-color: #fff;
  border: 1px solid rgba(13, 13, 13, 0.12);
  box-shadow: 0px 12px 32px rgba(13, 13, 13, 0.08);

  li {
    padding-left: 20px;
    line-height: 30px;
    border-radius: 3px;
  }

  li.active {
    background-color: @bgColorBase;
  }
}

.leftBar {

    .el-dropdown{
        display: block;
    }

  // 滚动条整体部分
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
  &::-webkit-scrollbar-button {
    display: none;
  }

  // 滚动条的轨道（里面装有Thumb）
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  // 滚动条的轨道（里面装有Thumb）
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }

  // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
  &::-webkit-scrollbar-thumb {
    background: rgba(144, 147, 153, 0.3);
    cursor: pointer;
    border-radius: 4px;
  }

  // 边角，即两个滚动条的交汇处
  &::-webkit-scrollbar-corner {
    display: none;
  }

  // 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
  &::-webkit-resizer {
    display: none;
  }
}

svg {
  width: 20px;
  height: 20px;
  transform: translateY(2px);
}

.btn-box {
  margin-bottom: 30px;
}

.btn {
  span {
    pointer-events: none;
    color: #fff;
  }
}

.white-btn {
  margin-top: 12px;

  span {
    color: @primary-color;
  }
}

// 路由
.item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: @button-size;
  margin: 10px auto;
  padding: 0 10px 0 25px;
  text-decoration: none;
  border-radius: 6px;

  span {
    display: block;
    line-height: 50px;
    color: #9195a1;
    font-size: 14px;
    font-weight: 700;
  }
}

.myDoc .wrapper {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
}

.wrapper {
  i > {
    pointer-events: none;
  }

  > span {
    pointer-events: none;
  }
}

.myDoc {
  display: block;
}

// 折叠面板样式
.demo-collapse {
  width: 100%;
  box-sizing: border-box;
  background-color: transparent;
}

.demo-collapse {
  padding-bottom: 10px;

  .item {
    display: block;
    position: relative;
    width: 100%;
    color: #9195a1;
    margin: 0;
  }
}

.item .li {
  position: relative;

  .folder {
    // 省略号
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    transition: all 0.1s;

    > u {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
      line-height: 23px;
    }

    .delete-btn {
      display: flex;

      .delete {
        opacity: 0;
        width: 20px;
        height: 20px;
        margin-left: 4px;
        border-radius: 4px;
        text-align: center;
        transition: 0.1s all;

        // background-color: #fff;
        .icon {
          transform: translate(-0.5px, 1.5px);
        }
      }
    }

    .delete:hover {
      background-color: rgba(13, 13, 13, 0.06);
    }
  }

  .folder:hover .delete {
    opacity: 1;
  }
}

.item .addFolder {
  display: flex;
  justify-content: center;
  line-height: 18px;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  position: absolute;
  z-index: 3;
  right: 6px;
  top: 6px;
  transition: 0.1s all;
}

.item .addFolder:hover {
  background-color: rgba(13, 13, 13, 0.06);
}

.current {
  color: @primary-color;
}
</style>
<!-- 修改icon样式 -->
<style lang="less">
// 显示白色
.page {
  .active {
    background-color: @primaryLight;

    i.icon {
      background-color: @primary-color;

      .tab-icon {
        svg {
          transform: translateY(-24px);
        }
      }
    }

    span {
      color: @primary-color;
    }
  }
}

// 显示灰色
.item {
  i.icon {
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    flex-wrap: wrap;
    width: 28px;
    height: 28px;
    margin-right: 16px;
    border-radius: 10px;
    background-color: #ebebeb;

    .tab-icon {
      .svg {
        transform: translateY(4x);
        width: 16px;
        height: 16px;
        filter: drop-shadow(0px 24px 0 #fff);
      }
    }
  }
}
</style>
