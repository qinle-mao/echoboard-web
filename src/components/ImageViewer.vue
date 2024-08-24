<template>
    <transition name="trans">
    <div class="image-viewer" :style="{width: windowWidth - 360 - 20 + 'px'}">
        <div class="bg"></div>
        <div class="switch" @click="goLeft">
            <span class="iconfont icon-left"></span>
        </div>
        <img :src="require('../../static/' + imgsrc + '.jpg')">
        <div class="switch" @click="goRight">
            <span class="iconfont icon-right"></span>
        </div>
    </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            windowWidth: window.screen.width
        }
    },
    props: {
        imgsrc: {
            default: ''
        },
    },
    methods: {
        goLeft() {
            this.$emit('left')
        },
        goRight() {
            this.$emit('right')
        }
    }
}
</script>

<style lang="less" scoped>
.trans {
    &-enter {
        &-from {
            opacity: 0;
        }
        &-active {
            transition: @ttime;
        }
        &-to {
            opacity: 1;
        }
    }

    &-leave {
        &-from {
            opacity: 1;
        }
        &-active {
            transition: @ttime;
        }
        &-to {
            opacity: 0;
        }
    } 
}

.image-viewer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: @topbar-height;
    left: 0;
    height: 100%;
    z-index: 900;

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: @gray-8;
        z-index: -1;
    }

    .switch {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        cursor: pointer;

        .iconfont {
            width: 50px;
            height: 50px;
            font-size: 20px;
            color: @gray-8;
            background: @gray-3;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;

            &:hover {
                background: @gray-2;
            }
        }
        .icon-left {
            position: absolute;
            left: 30px;
        }
        .icon-right {
            position: absolute;
            right: 30px;
        }
    }

    img {
        width: 800px;
    }
}
</style>