<template>
    <transition name="trans">
    <div class="pop-up" v-if="isPopUp">
        <div class="pop-up-head">
            <p class="pop-up-name">{{ title }}</p>
            <span class="iconfont icon-close" @click="closePopUp"></span>
        </div>
        <div class="pop-up-body">
            <slot></slot>
        </div>
    </div>
    </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    title: {
        default: 'title'
    },
    isPopUp: {
        default: false,
    }
})
props
const emit = defineEmits(['close'])
function closePopUp() {
    emit('close')
}
</script>

<style lang="less" scoped>
@import '../assets/fonts/icons/iconfont.css';
.trans {
    &-enter {
        &-from {
            transform: translateX(@pop-up-width);
        }
        &-active {
            transition: @ttime;
        }
        &-to {
            transform: translateX(0);
        }
    }

    &-leave {
        &-from {
            transform: translateX(0);
        }
        &-active {
            transition: @ttime;
        }
        &-to {
            transform: translateX(@pop-up-width);
        }
    } 
}

.pop-up {
    width: @pop-up-width;
    height: 100%;
    background: rgba(255, 255, 255, 0.80);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(20px);
    position: fixed;
    top: @topbar-height;
    right: 0;
    z-index: 1000;

    .pop-up-head {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 20px;
        height: @pop-up-head-height;

        .pop-up-name {
            font-size: 16px;
            color: @gray-0;
            font-weight: 600;
        }

        .icon-close {
            font-size: 18px;
            color: @gray-1;
            cursor: pointer;
        }
    }

    .pop-up-body {
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 20px;
        padding-bottom: @topbar-height + @pop-up-head-height;

        .pop-up-body::-webkit-scrollbar {
            width: 4px;
        }

        .pop-up-body::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background: rgba(0, 0, 0, 0.20);
        }

        .pop-up-body::-webkit-scrollbar-track {
            border-radius: 4px;
            background: rgba(0, 0, 0, 0);
        }
    }
}
</style>