<template>
    <!-- 用户 -->
    <div class="user">
        <img src="../../assets/profile.png" class="profile">
        <!-- 用户下拉菜单 -->
        <div class="user-wrapper">
            <div class="user-header">
                <div class="user-profile">
                    <img src="../../assets/profile.png">
                    <span class="wechat">
                        <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill-rule='evenodd'>
                            <path fill='#01bd88'
                                d='M14.143 18H0C.034 12.28 1.613 7.86 4.737 4.737 7.79 1.684 12.08.107 17.612.005L18 0v14.143A3.86 3.86 0 0114.143 18z' />
                            <path fill='#fff'
                                d='M13.408 9.7c1.825 0 3.306 1.213 3.306 2.702 0 .816-.44 1.55-1.138 2.04-.062.048-.098.108-.098.18l.001.036.07.264.088.312.012.085c0 .06-.05.108-.1.108l-.03-.008-.754-.425c-.05-.024-.1-.048-.17-.048-.025 0-.05 0-.07.004l-.028.008a3.89 3.89 0 01-1.078.144c-1.824 0-3.306-1.212-3.306-2.7 0-1.5 1.482-2.702 3.306-2.702zM9.33 6.43c2.003 0 3.677 1.156 4.1 2.7h-.013c-2.126 0-3.885 1.434-3.885 3.275a2.82 2.82 0 00.147.897 3.82 3.82 0 01-.34.013 4.83 4.83 0 01-1.37-.191c-.038-.013-.1-.013-.13-.013a.39.39 0 00-.15.03l-.07.034-.917.522c-.026.013-.052.026-.078.026a.143.143 0 01-.142-.14c0-.026.006-.046.014-.067l.012-.035c.013-.013.13-.434.194-.69l.013-.09a.26.26 0 00-.116-.23c-.88-.624-1.448-1.568-1.448-2.6 0-1.9 1.874-3.442 4.188-3.442zm5.21 4.704a.44.44 0 00-.447.436.44.44 0 00.447.436.44.44 0 00.447-.436.44.44 0 00-.447-.436zm-2.204 0a.44.44 0 00-.447.436.44.44 0 00.447.436.44.44 0 00.447-.436.44.44 0 00-.447-.436zM7.935 8.227a.53.53 0 00-.538.532.53.53 0 00.538.533.53.53 0 00.538-.533.53.53 0 00-.538-.532zm2.792 0a.53.53 0 00-.538.532.53.53 0 00.538.533.53.53 0 00.538-.533.53.53 0 00-.538-.532z' />
                        </svg>
                    </span>
                </div>
                <div>

                    <div class="user-name text-slate-600">
                       用户名： {{ userInfo.getUserName }}
                    </div>
                    <div class="text-sm	text-slate-500	">账号：{{ userInfo.getUserId }}</div>
                </div>
            </div>
            <ul class="user-body">
                <li>意见反馈</li>
                <!-- <li>切换账号</li> -->
                <li @click="handleLoginout">退出登录</li>
            </ul>
        </div>
    </div>
</template>
          
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router/index';
import { useInfo } from '@/store/user';
const userInfo = useInfo()
// 初始化用户信息
userInfo.setUserInfo()




// 退出登录
const handleLoginout = () => {
    // 清除token
    ElMessageBox.confirm(
        '您确定要退出登录吗？',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'info',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '退出登录成功！',
            })
            localStorage.clear()
            router.push('/login')
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消退出',
            })
        })

}
</script>
          
<style lang="less" scoped>
.user {
    position: relative;
    top: 3px;
    width: 30px;
    height: 33px;
    border-radius: 2px;
    z-index: 3;
    cursor: pointer;

    .profile {
        width: 30px;
        height: 30px;
        border-radius: 2px;
    }

    // 用户下拉菜单
    .user-wrapper {
        display: none;
        position: absolute;
        right: 0px;
        top: 34px;
        width: 250px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 12px 2px rgba(68, 73, 77, 0.16);
        border: solid 1px rgba(0, 0, 0, 0.12);
        z-index: 5000;
        padding-bottom: 10px;
        .user-header {
            display: flex;
            align-items: center;
            padding: 20px;

            .user-profile {
                position: relative;
                border-radius: 4px;
                width: 44px;
                height: 44px;
                margin-right: 15px;
                background-color: aquamarine;

                img {
                    width: 100%;
                    height: 100%;
                }

                span.wechat {
                    position: absolute;
                    z-index: 1;
                    right: 2px;
                    bottom: 2px;
                    background-position: 50%;
                    background-size: cover;
                    background-repeat: no-repeat;
                    max-width: 16px;
                    max-height: 16px;
                    height: 50%;
                    width: 50%;
                }

            }
        }

        ul.user-body>li {
            width: 90%;
            box-sizing: content-box;
            font-size: 15px;
            text-align: left;
            color: rgba(0, 0, 0, 0.88);
            line-height: 44px;
            margin: 0 auto;
            border-radius: 6px;
            text-align: center;
            box-sizing: border-box;

            &:hover {
                background-color: rgba(10, 108, 255, .1);
            }
        }

    }

    &:hover .user-wrapper {
        display: block;
    }
}
</style>