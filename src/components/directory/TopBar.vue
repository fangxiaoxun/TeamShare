<template>
    <header>
        <div class="logo">
            <img src="../../assets/yksg.svg">
            <h3>共享文档</h3>
        </div>
        <div class="search" v-click-outside="onClickOutside">
            <svg t="1683549413993" class="icon search-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2751" width="200" height="200"><path d="M888.6 851.9L669.1 632.5c44.9-53.3 72-122.1 72-197 0-169-137.5-306.6-306.5-306.6S128 266.4 128 435.4 265.5 742 434.5 742c75.9 0 145.3-27.8 198.9-73.6l219.3 219.3c4.9 4.9 11.4 7.4 17.9 7.4 6.5 0 13-2.5 17.9-7.4 10-9.9 10-25.9 0.1-35.8z m-710-416.5c0-141.1 114.8-255.9 255.9-255.9s255.9 114.8 255.9 255.9c0 141.1-114.8 255.9-255.9 255.9S178.6 576.6 178.6 435.4z" p-id="2752" fill="#6965db"></path></svg>
            <input type="text" class="search-input" placeholder="搜索文件名">
            <!-- 二级导航 -->
            <div class="search-menu">

            </div>
        </div>
        <!-- 菜单 -->
        <div class="menu">
            <!-- 消息 -->
            <div class="message">
                <svg t="1683775348657" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2568" data-spm-anchor-id="a313x.7781069.0.i7" width="200" height="200"><path d="M236.539274 477.852272c17.253966 0 31.233352-13.980409 31.233352-31.233352 0-110.680798 64.816215-197.723224 173.372629-232.82058 14.792914-4.77884 23.811312-19.713994 21.168112-35.026748-0.426719-2.480494-0.64059-4.900613-0.64059-7.197936 0-24.614607 22.683628-44.63457 50.561559-44.63457 27.858488 0 50.53086 20.018939 50.53086 44.63457 0 2.379187-0.203638 4.727675-0.599657 7.005554-2.745531 15.535835 6.537903 30.674627 21.615297 35.290761 110.202914 33.714869 173.402305 118.550023 173.402305 232.748948 0 17.253966 13.980409 31.233352 31.234375 31.233352s31.233352-13.980409 31.233352-31.233352c0-133.414569-72.349795-238.259452-194.876386-284.724717-5.174859-54.537104-53.673433-97.422843-112.541169-97.422843-59.062164 0-107.691721 43.149752-112.623034 97.921193-120.482025 47.999201-194.306404 154.959258-194.306404 284.226367C205.305923 463.871863 219.285309 477.852272 236.539274 477.852272z" fill="#6965db" p-id="2569" data-spm-anchor-id="a313x.7781069.0.i5" class="selected"></path><path d="M819.911812 602.309842l0-55.889915c0-17.253966-13.980409-31.233352-31.233352-31.233352s-31.234375 13.980409-31.234375 31.233352l0 67.988464c0 7.80885 2.928702 15.34243 8.204869 21.097504 40.10951 43.780109 86.381369 99.497085 95.105055 116.89329-0.315178 10.827603-3.345188 13.552667-32.586163 13.552667L196.820668 765.951853c-26.983561 0-31.671327-7.259334-32.484855-13.735839 9.17087-17.701151 55.381331-73.072249 95.449909-116.669186 5.306866-5.765307 8.245801-13.30912 8.245801-21.137413l0-67.988464c0-17.253966-13.980409-31.233352-31.233352-31.233352s-31.233352 13.980409-31.233352 31.233352l0 55.848982C101.69617 716.315362 101.69617 737.829352 101.69617 748.300844c0 38.727023 24.991184 80.117712 95.124498 80.117712l631.347179 0c23.5166 0 95.094822 0 95.094822-80.117712C923.262668 737.788419 923.262668 716.202799 819.911812 602.309842z" fill="#6965db" p-id="2570" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path><path d="M400.99993 366.001835c-17.253966 0-31.233352 13.980409-31.233352 31.234375l0 30.470989c0 17.253966 13.980409 31.234375 31.233352 31.234375s31.234375-13.980409 31.234375-31.234375l0-30.470989C432.234305 379.982244 418.253896 366.001835 400.99993 366.001835z" fill="#6965db" p-id="2571" data-spm-anchor-id="a313x.7781069.0.i8" class="selected"></path><path d="M623.957885 366.001835c-17.253966 0-31.234375 13.980409-31.234375 31.234375l0 30.470989c0 17.253966 13.980409 31.234375 31.234375 31.234375 17.253966 0 31.233352-13.980409 31.233352-31.234375l0-30.470989C655.19226 379.982244 641.21185 366.001835 623.957885 366.001835z" fill="#6965db" p-id="2572" data-spm-anchor-id="a313x.7781069.0.i9" class="selected"></path><path d="M512.170892 598.435605c43.963281 0 75.105558-30.318516 86.574774-48.223305 9.222035-14.396895 5.03262-33.358759-9.242502-42.763966-14.305821-9.405207-33.593096-5.38873-43.159986 8.764618-0.132006 0.193405-13.614066 19.754926-34.172287 19.754926-19.989263 0-32.43369-18.117636-33.267685-19.378349-9.181103-14.407128-28.285207-18.809391-42.834574-9.750061-14.650675 9.099239-19.155269 28.356838-10.044774 43.007513C437.238272 567.892985 467.99374 598.435605 512.170892 598.435605z" fill="#6965db" p-id="2573" data-spm-anchor-id="a313x.7781069.0.i4" class="selected"></path><path d="M601.661066 856.999498c-15.179724-8.225335-34.131355-2.593058-42.346457 12.576433-9.292644 17.142425-27.248597 27.79709-46.871517 27.79709-19.530822 0-37.476543-10.67513-46.830585-27.848255-8.256034-15.149025-27.217898-20.741393-42.366923-12.495592-15.149025 8.256034-20.741393 27.217898-12.495592 42.366923 20.304442 37.283138 59.275012 60.444651 101.6931 60.444651 42.560328 0 81.561597-23.180955 101.794407-60.494793C622.453624 884.176464 616.821347 865.224834 601.661066 856.999498z" fill="#6965db" p-id="2574" data-spm-anchor-id="a313x.7781069.0.i10" class="selected"></path></svg>
                <div class="tooltop">
                    消息
                    <div class="arrow"></div>
                </div>
            </div>
            <!-- 更多 -->
            <div class="more">
                <svg t="1683776195214" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10290" width="200" height="200"><path d="M138.5 261.4h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5zM887.5 470.4h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5zM887.5 760.4h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5z" p-id="10291" fill="#6965db"></path></svg>
                <div class="tooltop">
                    主菜单
                    <div class="arrow"></div>
                </div>
            </div>
            <!-- 用户 -->
            <div class="user">
                <img src="../../assets/profile.png" class="profile">
                <!-- 用户下拉菜单 -->
                <div class="user-wrapper">
                    <div class="user-header">
                        <div class="user-profile">
                            <img src="../assets/profile.png" >
                            <span class="wechat">
                                <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill-rule='evenodd'><path fill='#01bd88' d='M14.143 18H0C.034 12.28 1.613 7.86 4.737 4.737 7.79 1.684 12.08.107 17.612.005L18 0v14.143A3.86 3.86 0 0114.143 18z'/><path fill='#fff' d='M13.408 9.7c1.825 0 3.306 1.213 3.306 2.702 0 .816-.44 1.55-1.138 2.04-.062.048-.098.108-.098.18l.001.036.07.264.088.312.012.085c0 .06-.05.108-.1.108l-.03-.008-.754-.425c-.05-.024-.1-.048-.17-.048-.025 0-.05 0-.07.004l-.028.008a3.89 3.89 0 01-1.078.144c-1.824 0-3.306-1.212-3.306-2.7 0-1.5 1.482-2.702 3.306-2.702zM9.33 6.43c2.003 0 3.677 1.156 4.1 2.7h-.013c-2.126 0-3.885 1.434-3.885 3.275a2.82 2.82 0 00.147.897 3.82 3.82 0 01-.34.013 4.83 4.83 0 01-1.37-.191c-.038-.013-.1-.013-.13-.013a.39.39 0 00-.15.03l-.07.034-.917.522c-.026.013-.052.026-.078.026a.143.143 0 01-.142-.14c0-.026.006-.046.014-.067l.012-.035c.013-.013.13-.434.194-.69l.013-.09a.26.26 0 00-.116-.23c-.88-.624-1.448-1.568-1.448-2.6 0-1.9 1.874-3.442 4.188-3.442zm5.21 4.704a.44.44 0 00-.447.436.44.44 0 00.447.436.44.44 0 00.447-.436.44.44 0 00-.447-.436zm-2.204 0a.44.44 0 00-.447.436.44.44 0 00.447.436.44.44 0 00.447-.436.44.44 0 00-.447-.436zM7.935 8.227a.53.53 0 00-.538.532.53.53 0 00.538.533.53.53 0 00.538-.533.53.53 0 00-.538-.532zm2.792 0a.53.53 0 00-.538.532.53.53 0 00.538.533.53.53 0 00.538-.533.53.53 0 00-.538-.532z'/></svg>
                            </span>
                        </div>
                        <h3 class="user-name">
                            MoonLight
                        </h3>
                    </div>
                    <ul class="user-body">
                        <li>意见反馈</li>
                        <li>切换账号</li>
                        <li>退出登录</li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>
          
<script lang="ts" setup>
import { onClickOutside } from '../../hooks/clickOutside'
   
</script>
          
<style lang="less" scoped>
header {
    width: 100%;
    height: 70px;
    background-color: @bgColorBase;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 3000;
    .logo {
        display: flex;
        align-items: center;

        h3 {
            font-size: 20px;
            padding-left: 10px;
            font-weight: 600;
        }
    }

    .search {
        position: relative;
        height: 40px;
        width: 483px;
        border-radius: 12px;
        padding: 0 40px 0 12px;
        background-color: #fff;
        border: 1.5px solid transparent;

        &:hover,&.active {
            border: 1.5px solid @button-color;
        }

        .search-icon{
            height: 24px;
            width:24px;
            position: absolute;
            left: 10px;
            top: 7.5px;
        }

        .search-input{
            font-size: 15px;
            margin-left: 13px;
            padding: 0 13px;
            width: 100%;
            height: 100%;
            border: none;
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px;
        }

        .search-menu{
            display: none;
            position: absolute;
            left: 0;
            top: 48px;
            width: 100%;
            height: 650px;
            border: 1px solid rgba(8,14,23,.12);
            box-shadow: 0px 12px 32px rgba(13,13,13,0.08);
            border-radius: 8px;
            background-color: rgb(255,255,255);
            z-index: 5000;
        }
        &.active .search-menu{
            display: block;
        }

    }

    .menu{
        width: 10%;
        height: 100%;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .message,.more{
            width: 30px;
            height: 30px;
            border-radius: 6px;
            text-align: center;
            line-height: 43px;
            cursor: pointer;
            &:hover{
                background-color: rgba(13,13,13,0.06);
            }

            &:hover .tooltop{
               opacity: 1;
               pointer-events: all;
            }

            svg{
                width: 25px;
                height: 25px;
            }

            .tooltop{
                position: absolute;
                opacity: 0;
                pointer-events: none;
                transform: translate(-9px,-6px);
                box-shadow: 0 2px 12px 0 rgba(56,56,56,.2)!important;
                border: 1px solid rgba(8,14,23,.12);
                border-radius: 8px;
                background-color: rgb(87,87,87);
                padding: 6px 12px;
                line-height: 20px;
                color: rgb(255,255,255);
                font-size: 12px;
                transition: all .3s;

                .arrow{
                    position: absolute;
                    top: -5px;
                    left: 19.5px;
                    width: 9px;
                    height: 9px;
                    border-radius: 0 3px 0 0;
                    background-color: rgb(87,87,87);
                    transform: rotate(-45deg);
                }
            }
        }

        .more{
            .tooltop{
                transform: translate(-15px,-6px);
                .arrow{
                    left: 25.5px;
                }
            }
        }

        

        .user{
            position: relative;
            top: 3px;
            width: 30px;
            height: 33px;
            border-radius: 2px;
            cursor: pointer;

            .profile{
                width: 30px;
                height: 30px;
                border-radius: 2px;
            }
            
            // 用户下拉菜单
            .user-wrapper{
                display: none;
                position: absolute;
                right: 0px;
                top: 34px;
                width: 250px;
                height: 300px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 12px 2px rgba(68, 73, 77, 0.16);
                border: solid 1px rgba(0, 0, 0, 0.12);
                z-index: 5000;
                .user-header{
                    display: flex;
                    align-items: center;
                    padding: 20px;
                    margin-bottom: 30px;
                    .user-profile{
                        position: relative;
                        border-radius: 4px;
                        width: 44px;
                        height: 44px;
                        margin-right: 15px;
                        background-color: aquamarine;

                        img{
                            width: 100%;
                            height: 100%;
                        }

                        span.wechat{
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

                ul.user-body>li{
                    width: 90%;
                    box-sizing: content-box;
                    font-size: 15px;
                    text-align: left;
                    color: rgba(0, 0, 0, 0.88);
                    height: 52px;
                    line-height: 52px;
                    margin: 0 auto;
                    border-radius: 6px;
                    text-align: center;
                    box-sizing: border-box;

                    &:hover{
                        background-color: rgba(10,108,255,.1);
                    }
                }
                
            }

            &:hover .user-wrapper{
                display: block;
            }
        }
    }
}</style>