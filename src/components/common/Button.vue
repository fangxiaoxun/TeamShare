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
                <li><i class="icon"><svg-icon name="addicon"></svg-icon></i><span>上传文件</span></li>
                <li><i class="icon"><svg-icon name="addicon"></svg-icon></i><span>上传文件</span></li>
                <li><i class="icon"><svg-icon name="addicon"></svg-icon></i><span>上传文件</span></li>
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
                            <svg-icon name="otl" width="32px" height="32px"></svg-icon>
                        </div>
                        <span class="desc">文字</span>
                    </div>
                    <div class="box">
                        <div class="img">
                            <svg-icon name="otl" width="32px" height="32px"></svg-icon>

                        </div>
                        <span class="desc">文字</span>
                    </div>
                    <div class="box">
                        <div class="img">
                            <svg-icon name="otl" width="32px" height="32px"></svg-icon>

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
                            <svg-icon name="otl" width="32px" height="32px"></svg-icon>

                        </div>
                        <span class="desc">文字</span>
                    </div>
                    <div class="box">
                        <div class="img">
                            <svg-icon name="otl" width="32px" height="32px"></svg-icon>

                        </div>
                        <span class="desc">文字</span>
                    </div>
                    <div class="box">
                        <div class="img">
                            <svg-icon name="otl" width="32px" height="32px"></svg-icon>
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
    background: @button-hover-color;
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
    width: 197px;
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
            display: inline-block;
            transform: translateY(2px);
            margin: 5px 5px;
            width: 16px;
            height: 16px;

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
