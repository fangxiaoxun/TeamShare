<template>
    <div class="filewrap">
        <div class="filename">
            <div class="checkBox">
                <input type="checkbox" id="checked">
                <label for="checked"></label>
            </div>
            <div class="fileicon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M0 3.75C0 1.67893 1.67893 0 3.75 0H20.25C22.3211 0 24 1.67893 24 3.75V20.25C24 22.3211 22.3211 24 20.25 24H3.75C1.67893 24 0 22.3211 0 20.25V3.75Z"
                        fill="url(#icon-4f060cf7822aa274)"></path>
                    <path
                        d="M5.25 6.75C5.25 6.33579 5.58579 6 6 6H18C18.4142 6 18.75 6.33579 18.75 6.75V7.5C18.75 7.91421 18.4142 8.25 18 8.25H6C5.58579 8.25 5.25 7.91421 5.25 7.5V6.75Z"
                        fill="white"></path>
                    <path
                        d="M5.25 11.625C5.25 11.2108 5.58579 10.875 6 10.875H18C18.4142 10.875 18.75 11.2108 18.75 11.625V12.375C18.75 12.7892 18.4142 13.125 18 13.125H6C5.58579 13.125 5.25 12.7892 5.25 12.375V11.625Z"
                        fill="white"></path>
                    <path
                        d="M5.25 16.5C5.25 16.0858 5.58579 15.75 6 15.75H13.5C13.9142 15.75 14.25 16.0858 14.25 16.5V17.25C14.25 17.6642 13.9142 18 13.5 18H6C5.58579 18 5.25 17.6642 5.25 17.25V16.5Z"
                        fill="white"></path>
                    <defs>
                        <linearGradient id="icon-4f060cf7822aa274" x1="0" y1="0" x2="24" y2="24"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#6EB1FF"></stop>
                            <stop offset="1" stop-color="#7A4BFA"></stop>
                        </linearGradient>
                    </defs>
                </svg></div>
            <span>文件名</span>
            <div class="star"><svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M7.72828 1.38069C7.83612 1.15022 8.16388 1.15022 8.27172 1.38069L10.2249 5.55485L14.8464 6.095C15.1019 6.12486 15.2038 6.44138 15.0137 6.61468L11.6 9.72658L12.5073 14.2277C12.5578 14.4782 12.292 14.6731 12.0683 14.5496L8 12.3049L3.93172 14.5496C3.70799 14.6731 3.44221 14.4782 3.4927 14.2277L4.4 9.72658L0.986285 6.61468C0.796177 6.44138 0.898059 6.12486 1.15356 6.095L5.77508 5.55485L7.72828 1.38069Z"
                        stroke="currentColor" stroke-width="1" stroke-linejoin="miter" vector-effect="non-scaling-stroke">
                    </path>
                </svg></div>
        </div>
        <div class="position"><span>我的文档</span></div>
        <div class="author"><span>我</span></div>
        <div class="latest"><span>1天前</span></div>
    </div>
</template>
<script lang='ts' setup>

</script>
<style scope lang='less' scoped>
span {
    font-size: 14px;
    // line-height: 56px;
    color: rgba(13, 13, 13, .9);
}
.filewrap:hover{
    background-color: rgba(13,13,13,.06);
}
.filewrap {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 10px;
    border-radius: 8px;
}

.filename {
    flex: 4;
    display: flex;
    transform: translateY(2px);
}
.star{
    margin-left: 10px;
}
.position,
.author {
    flex: 1;
}

.latest {
    flex: 2;
}

.fileicon {
    transform: translateY(-4px);
    width: 24px;
    height: 24px;
    margin: 0 15px;
}

input[type=checkbox] {
    visibility: hidden;
}

.checkBox {
    position: relative;
    width: 16px;
    height: 16px;
}

.checkBox label {
    cursor: pointer;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid #c2c2c2;
    border-radius: 2px;
    background-color: #fff;
    // background-color: @button-color;
}

.checkBox label:hover {
    border-color: @button-color;
}

input {
    width: 16px;
    height: 16px;
}

.checkBox label:after {
    opacity: 0;
    display: block;
    content: '';
    width: 3px;
    height: 8px;
    position: absolute;
    left: 6px;
    top: 2px;
    border: 2px solid @button-color;
    border-top: none;
    border-left: none;

    background: transparent;
    transform: rotate(45deg) scaleY(1);
}

.checkBox label:hover::after {
    opacity: 0;
}

.checkBox input[type=checkbox]:checked+label:after {
    opacity: 1;
}
.checkBox input[type=checkbox]:checked+label{
    border-color: @button-color;
}
</style>