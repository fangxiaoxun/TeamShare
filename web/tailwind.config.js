/*
 * Author: fangxiaoxun 1272449367@qq.com
 * Date: 2025-02-18 16:31:57
 * LastEditors: fangxiaoxun 1272449367@qq.com
 * LastEditTime: 2025-02-21 20:58:13
 * 
 */
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bgColorBase': '#F5F6F7',
                'bgPrimary': '#f5faff',
                'primaryLight': '#e3e2fe',
                'primary': '#6965db',
                'button-hover-color': '#5b57d1',
                'hover-color': '#f5f5f5',
                'success': '#00D68F',
                'warning': '#FFA900',
                'error': '#F93154',

            },
            borderColor: {
                'primary': '#6965db',
                'primaryLight': '#e3e2fe',
                'primaryDark': '#3b3b3b',
                'button-hover-color': '#5b57d1',
                'hover-color': '#f5f5f5',
                'success': '#00D68F',
                'warning': '#FFA900',
                'error': '#F93154',
            },
        },
    },
    plugins: {
    }
}