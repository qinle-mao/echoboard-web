<template>
    <transition name="down">
    <div class="pop-up-message" v-if="isShow">
        <div class="message-holder">
            <span class="iconfont" :class="style[type].icon"></span>
            <span class="text">{{ message }}</span>
        </div>
    </div>
    </transition>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
    name: 'globalMessage',
    props: {
        message: {
            default: ''
        },
        type: {
            default: 'info'
        }
    },
    setup() {
        const style = {
            info: {
                icon: 'icon-info-fill'
            },
            error: {
                icon: 'icon-error-fill'
            },
            success: {
                icon: 'icon-success-fill'
            }
        }
        const isShow = ref(false)
        onMounted(() => {
            isShow.value = true
            setTimeout(() => {
                isShow.value = false
            }, 3000)
        })
        return {style, isShow}
    }
}
</script>

<style lang="less" scoped>
.down {
    &-enter {
        &-from {
            transform: translateY(-30px);
            opacity: 0;
        }

        &-active {
            transition: @ttime;
        }

        &-to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    &-leave {
        &-from {
            transform: translateY(0);
            opacity: 1;
        }

        &-active {
            transition: @ttime;
        }

        &-to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
}

.pop-up-message {
    width: 100%;
    height: 40px;
    position: fixed;
    z-index: 9999;
    top: 20px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    .message-holder {
        padding: 0 20px;
        border-radius: 4px;
        color: @gray-0;
        background: @gray-9;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

        .iconfont {
            font-size: 16px;
            margin-right: 6px;
            vertical-align: middle;
        }

        .text {
            font-size: 14px;
            vertical-align: middle;
        }

        .icon-success-fill {
            color: @success-color;
        }

        .icon-info-fill {
            color: @link-color;
        }

        .icon-error-fill {
            color: @error-color;
        }
    }

}
</style>