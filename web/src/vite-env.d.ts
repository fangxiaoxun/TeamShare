/*
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2023-07-13 02:49:58
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-03-10 21:34:51
 * 
 */
/// <reference types="vite/client" />

declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}
