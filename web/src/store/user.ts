/*
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2023-08-03 18:39:54
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-03-04 16:06:23
 * 
 */
import { defineStore } from "pinia";
import { reqUserInfo } from '@/api/user/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

interface State {
    userName:string
    userId:string
    userAccount:string
    currContent:any
}

export const useInfo = defineStore('user', {
    persist: true,
    state: () => ({
        userName: '',
        userId: '',
        userAccount: '',
        // currContent: ''
    }),
    getters: {
        getUserName: (state) => {
            return state.userName
        },
        getUserId:(state) => state.userId
    },
    actions: {
        async setUserInfo() {
            const response = await reqUserInfo()
            this.userName = response.userName
            this.userId = response.userId


        },
        // async setCurrConten(conten:any){
        //     this.currContent = conten
        // }
    }
})