<template>
    <h1>测试axios二次封装</h1>
</template>
<script lang='ts' setup>
import request from '@/utils/request';
import { onMounted } from 'vue';

// 发送请求
onMounted(() => {
    request({
        url: 'https://mock.apifox.cn/m1/2733445-0-default/user/info',
        method: 'post',
        data:{
            userId: '111111'
        }
    }).then((res) => {
        console.log(res)
    })
})
</script>
<style scope lang='less' scoped>

</style>