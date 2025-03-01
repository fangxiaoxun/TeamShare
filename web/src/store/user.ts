/*
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2023-08-03 18:39:54
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-02-22 18:24:44
 * 
 */
import { defineStore } from "pinia";
import { reqUserInfo } from '@/api/user/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

interface State {
    username:string
    userId:string
    userAccount:string
    currContent:any
}

export const useInfo = defineStore('user', {
    persist: true,
    state: () => ({
        username: '',
        userId: '',
        userAccount: '',
        // currContent: ''
    }),
    getters: {
        getUsername: (state) => {
            return state.username
        }
    },
    actions: {
        async setUserInfo() {
            const response = await reqUserInfo()
            this.username = response.username
            this.userId = response.userId


        },
        // async setCurrConten(conten:any){
        //     this.currContent = conten
        // }
    }
})