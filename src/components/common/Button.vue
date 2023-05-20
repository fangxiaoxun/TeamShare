<script lang='ts' setup>
import { vClickOutside } from '@/hooks/clickOutside';
const show = (element: HTMLElement) => {
    element.classList.contains('active') && element.classList.remove('active')
}

</script>
<template>
    <div class="btn" v-click-outside="show">
        <div class="wrap">
            <ul>
                <li><i class="icon"><svg width="16px" height="16px" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M10.25 5.99966H5.75M13.25 5.12102V12.7497C13.25 13.5781 12.5784 14.2497 11.75 14.2497H4.25C3.42157 14.2497 2.75 13.5781 2.75 12.7497V3.24969C2.75 2.42127 3.42157 1.74969 4.25 1.74969H9.87868C10.2765 1.74969 10.658 1.90773 10.9393 2.18903L12.8107 4.06035C13.092 4.34166 13.25 4.72319 13.25 5.12102Z"
                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="miter"
                                vector-effect="non-scaling-stroke"></path>
                        </svg></i><span>上传文件</span></li>
                <li><i class="icon"><svg width="16px" height="16px" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M10.25 5.99966H5.75M13.25 5.12102V12.7497C13.25 13.5781 12.5784 14.2497 11.75 14.2497H4.25C3.42157 14.2497 2.75 13.5781 2.75 12.7497V3.24969C2.75 2.42127 3.42157 1.74969 4.25 1.74969H9.87868C10.2765 1.74969 10.658 1.90773 10.9393 2.18903L12.8107 4.06035C13.092 4.34166 13.25 4.72319 13.25 5.12102Z"
                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="miter"
                                vector-effect="non-scaling-stroke"></path>
                        </svg></i><span>上传文件</span></li>
                <li><i class="icon"><svg width="16px" height="16px" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M10.25 5.99966H5.75M13.25 5.12102V12.7497C13.25 13.5781 12.5784 14.2497 11.75 14.2497H4.25C3.42157 14.2497 2.75 13.5781 2.75 12.7497V3.24969C2.75 2.42127 3.42157 1.74969 4.25 1.74969H9.87868C10.2765 1.74969 10.658 1.90773 10.9393 2.18903L12.8107 4.06035C13.092 4.34166 13.25 4.72319 13.25 5.12102Z"
                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="miter"
                                vector-effect="non-scaling-stroke"></path>
                        </svg></i><span>上传文件</span></li>
            </ul>
        </div>
        <div class="wrapper">
            <div class="title">
                <h2>新建</h2>
            </div>
            <div class="ducList">
                <h5>文档格式</h5>
                <div class="list">
                    <div class="box">
                        <div class="img">
                            <img src="../assets/images/otl.svg" alt="">
                        </div>
                        <span class="desc">文字</span>
                    </div>
                    <div class="box">
                        <div class="img">
                            <img src="../assets/images/otl.svg" alt="">
                        </div>
                        <span class="desc">文字</span>
                    </div>
                    <div class="box">
                        <div class="img">
                            <img src="../assets/images/otl.svg" alt="">
                        </div>
                        <span class="desc">文字</span>
                    </div>
                </div>
            </div>
            <div class="ducList">
                <h5>文档格式</h5>
                <div class="list">
                    <div class="box">
                        <div class="img">
                            <img src="../assets/images/otl.svg" alt="">
                        </div>
                        <span class="desc">文字</span>
                    </div>
                    <div class="box">
                        <div class="img">
                            <img src="../assets/images/otl.svg" alt="">
                        </div>
                        <span class="desc">文字</span>
                    </div>
                    <div class="box">
                        <div class="img">
                            <img src="../assets/images/otl.svg" alt="">
                        </div>
                        <span class="desc">文字</span>
                    </div>
                </div>
            </div>
        </div>
        <span>
            <slot></slot>
        </span>
    </div>
</template>
<style scope lang='less' scoped>
.btn {
    cursor: pointer;
    width: @button-size;
    height: 36px;
    border-radius: 6px;
    margin: 0 auto;
    border: 1px solid transparent;
    background-color: #fff;
    text-align: center;
    box-shadow: 0px 0px 0px 1px rgba(13, 13, 13, 0.1), 0px 1px 0px rgba(13, 13, 13, 0.14);
    transform: all .1s;

    span {
        line-height: 34px;
        color: @button-color;
    }
}

.btn:hover {
    border-color: @button-color;
    background-color: rgb(242, 242, 242);
    box-shadow: none;
}

.blue-btn {
    background-color: @button-color;
    border-color: transparent;
    box-shadow: none;

    span {
        span {
            color: #fff;
        }
    }
}

.blue-btn:hover {
    background: rgb(59, 137, 255; );
}

#newsetBtn.active .wrapper,
#addBtn.active .wrap {
    display: block;
}

.wrap {
    display: none;
    left: 17px;
    top: 152px;
    position: absolute;
    z-index: 2;
    transform: translateY(8px);
    background-color: #fff;
    width: 220px;
    padding: 8px 12px;
    margin: 0 auto;
    border-radius: 8px;
    border: 1px solid rgba(13, 13, 13, .06);
    box-shadow: 0 12px 32px rgba(13, 13, 13, .08);

    li {
        cursor: pointer;
        margin: 4px 0;
        width: 100%;
        border-radius: 4px;

        .icon {
            margin: 5px 5px;

            svg {
                width: 16px;
                height: 16px;
            }
        }

        span {
            font-size: 14px;
            line-height: 32px;
            color: #606266;
        }
    }

    li:hover {
        background-color: rgba(13, 13, 13, .06);
    }
}


.wrapper {
    display: none;
    padding: 28px 36px;
    background-color: #fff;
    position: absolute;
    left: calc(~"@{leftBar-size} - 20px");
    z-index: 2;
    border-radius: 12px;
    border: 1px solid rgba(13, 13, 13, .12);
    box-shadow: 0px 12px 32px rgba(13, 13, 13, .08);

    h5 {
        margin-top: 20px;
    }

    .list {
        width: 100%;
        display: flex;

        .box {
            text-align: center;
            width: 80px;
            height: 80px;
            margin-top: 18px;

            .img {
                width: 36px;
                height: 36px;
                margin: 0 auto;

                img {
                    width: 32px;
                    height: 32px;
                }
            }

            .desc {
                margin: 8px 0 auto;
                font-size: 12px;
            }
        }
    }
}
</style>
