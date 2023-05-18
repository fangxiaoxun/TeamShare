<script lang='ts' setup>
import Button from './Button.vue';
</script>
<template>
    <div class="leftBar">
        <!-- 新建按钮 -->
        <div class="btn-box">
            <Button class="blue-btn btn" id="newsetBtn">
                <span>
                    <svg t="1683629730582" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="11333" width="128" height="128">
                        <path
                            d="M962.56 180.992H236.544c-30.72 0-55.808 25.088-55.808 55.808v726.016c0 30.72 25.088 55.808 55.808 55.808H962.56c30.72 0 55.808-25.088 55.808-55.808V237.056c0-30.72-25.088-56.064-55.808-56.064z m-139.52 474.88H655.36v167.424h-111.616v-167.424H376.32v-111.616h167.424v-167.424H655.36v167.424h167.424v111.616z"
                            fill="#ffffff" p-id="11334"></path>
                        <path
                            d="M739.84 5.12H69.888C34.304 5.12 5.632 34.048 5.632 69.376v669.952c0 35.328 28.928 64.256 64.256 64.256h49.92c1.536 0.256 3.072 0.256 4.352 0.256 20.224 0 36.352-16.384 36.352-36.352 0-16.128-11.008-30.72-26.368-35.072v-1.536H78.336V77.824h653.312v42.24c-0.256 1.28-0.256 2.56-0.256 3.84 0 20.224 16.384 36.352 36.352 36.352 16.384 0 30.72-11.008 35.072-26.624h1.28V69.376C804.096 34.048 775.424 5.12 739.84 5.12z"
                            fill="#ffffff" p-id="11335"></path>
                    </svg>
                    新建
                </span>
            </Button>
            <Button class="white-btn btn" id="addBtn">
                <span>
                    <svg t="1683629445618" class="icon" viewBox="0 0 1097 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1502" width="128" height="128">
                        <path
                            d="M1024 438.857143H542.72l18.285714-18.285714a73.142857 73.142857 0 1 0-103.862857-103.131429L365.714286 408.137143a146.285714 146.285714 0 0 0 0 204.8l91.428571 90.697143a73.142857 73.142857 0 0 0 51.931429 21.942857 73.142857 73.142857 0 0 0 51.931428-124.342857L545.645714 585.142857H1024a73.142857 73.142857 0 0 0 0-146.285714z"
                            fill="#3b73f0" p-id="1503"></path>
                        <path
                            d="M804.571429 653.897143a73.142857 73.142857 0 0 0-73.142858 73.142857V804.571429a73.142857 73.142857 0 0 1-73.142857 73.142857H219.428571a73.142857 73.142857 0 0 1-73.142857-73.142857V219.428571a73.142857 73.142857 0 0 1 73.142857-73.142857h438.857143a73.142857 73.142857 0 0 1 73.142857 73.142857v73.142858a73.142857 73.142857 0 0 0 146.285715 0V219.428571a219.428571 219.428571 0 0 0-219.428572-219.428571H219.428571a219.428571 219.428571 0 0 0-219.428571 219.428571v585.142858a219.428571 219.428571 0 0 0 219.428571 219.428571h438.857143a219.428571 219.428571 0 0 0 219.428572-219.428571V727.04a73.142857 73.142857 0 0 0-73.142857-73.142857z"
                            fill="#3b73f0" p-id="1504"></path>
                    </svg>
                    导入
                </span>
            </Button>
        </div>
        <!-- 引入路由导航 -->

        <div class="router-list">
            <router-link class="deskTop item" active-class="active" to="/desktop">
                <i class="icon"><svg t="1683792096585" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="42732" width="128" height="128">
                        <path
                            d="M950.3 489.4L533.8 73c-12-12-31.5-12-43.5 0L73.9 489.4c-19.4 19.4-5.7 52.5 21.7 52.5h66.8v353.7c0 35.3 28.7 64 64 64H384V831.8c0-35.3 28.7-64 64-64h128c35.3 0 64 28.7 64 64v127.8h156.6c35.3 0 64-28.7 64-64V541.9h67.8c27.5 0 41.2-33.2 21.9-52.5z"
                            fill="#9196a1" p-id="42733"></path>
                    </svg></i>
                <span>桌面</span>
            </router-link>
            <router-link class="myDoc item" active-class="active" to="/mydoc">
                <i class="icon"><svg t="1683789895685" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="40400" width="16" height="16">
                        <path
                            d="M855.04 385.024q19.456 2.048 38.912 10.24t33.792 23.04 21.504 37.376 2.048 54.272q-2.048 8.192-8.192 40.448t-14.336 74.24-18.432 86.528-19.456 76.288q-5.12 18.432-14.848 37.888t-25.088 35.328-36.864 26.112-51.2 10.24l-567.296 0q-21.504 0-44.544-9.216t-42.496-26.112-31.744-40.96-12.288-53.76l0-439.296q0-62.464 33.792-97.792t95.232-35.328l503.808 0q22.528 0 46.592 8.704t43.52 24.064 31.744 35.84 12.288 44.032l0 11.264-53.248 0q-40.96 0-95.744-0.512t-116.736-0.512-115.712-0.512-92.672-0.512l-47.104 0q-26.624 0-41.472 16.896t-23.04 44.544q-8.192 29.696-18.432 62.976t-18.432 61.952q-10.24 33.792-20.48 65.536-2.048 8.192-2.048 13.312 0 17.408 11.776 29.184t29.184 11.776q31.744 0 43.008-39.936l54.272-198.656q133.12 1.024 243.712 1.024l286.72 0z"
                            p-id="40401" fill="#9196a1"></path>
                    </svg></i>
                <span>我的文档</span>
            </router-link>
            <router-link class="trash item" active-class="active" to="/trash">
                <i class="icon"><svg t="1683792244745" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="44327" width="16" height="16">
                        <path
                            d="M238.08 846.848c0 54.272 48.64 98.816 108.032 98.816h331.776c59.904 0 108.032-44.032 108.032-98.816l50.688-516.096H186.88l51.2 516.096z m463.36-672.256h-71.68v-70.656c0-13.824-11.264-25.088-25.088-25.088H419.328c-13.824 0-25.088 11.264-25.088 25.088v70.656H133.12v98.816h757.76v-98.816H701.44zM465.92 140.8h92.16v33.28h-92.16V140.8z"
                            p-id="44328" fill="#9196a1"></path>
                    </svg></i>
                <span>回收站</span>
            </router-link>
        </div>
    </div>
</template>
<style scope lang='less' scoped>
.leftBar {
    width: 260px;
    height: 100%;
}

svg {
    width: 20px;
    height: 20px;
    transform: translateY(2px);
}

.btn-box {
    margin-bottom: 30px;
}

.btn {
    span {
        pointer-events: none;
        color: #fff;
    }
}

.white-btn {
    margin-top: 12px;

    span {
        color: @button-color;
    }
}

.newset {
    top: 0;
    left: 250px;
}

.newset,
.add {
    display: none;
}

.newset.active,
.add.active {
    display: block;
}

// 路由
.item {
    display: flex;
    align-items: center;
    width: @button-size;
    margin: 10px auto;
    padding: 0 25px;
    text-decoration: none;
    border-radius: 6px;

    i.icon {
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        align-content: space-around;
        flex-wrap: wrap;
        width: 28px;
        height: 28px;
        margin-right: 16px;
        border-radius: 10px;
        background-color: #ebebeb;

        svg {
            transform: translateY(0px);
            width: 16px;
            height: 16px;
            filter: drop-shadow(0px 22px 0 #fff);

        }
    }

    span {
        display: block;
        line-height: 50px;
        color: #9195a1;
        font-size: 14px;
        font-weight: 700;
    }
}

.item:hover {
    // background-color: rgba(13,13,13,.06);
}

.router-list {
    .active {
        background-color: rgba(10, 108, 255, .1);

        i {
            background-color: @button-color;

            svg {
                transform: translateY(-22px);
            }
        }

        span {
            color: rgb(10, 108, 255);
        }

    }
}</style>