/*
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2023-07-09 23:38:39
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-02-18 18:34:12
 * 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/')],
            symbolId: 'icon-[dir]-[name]'
        }),
        tailwindcss()
    ],
    resolve:{
        alias: [
            {
                find:'@',
                replacement:path.resolve("./src")
            },
        ]
    },
    css: {
        preprocessorOptions: {
            less: {
                math: "always",
                charset: false,
                additionalData: '@import "./src/styles/commons.less";',
            }
        }
    }
})
