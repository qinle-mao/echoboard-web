<template>
    <div class="image-card">
        <img class="image" :src="require('../../static/' + content.imgUrl + '.jpg')" />
        <div class="img-bg"></div>
        <div class="img-likes">
            <span class="iconfont icon-heart"></span>
            <span class="value">{{ content.likes }}</span>
        </div>
    </div>
</template>

<script>
import { labels } from '@/utils/data';
export default {
    data() {
        return {
            labels,
        }
    },
    props: {
        content: {
            default: {}
        }
    },
}
</script>

<style lang="less" scoped>
.image-card {
    position: relative;

    .image {
        width: 100%;
    }

    .img-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        opacity: 0;
    }

    .img-likes {
        position: absolute;
        left: 8px;
        top: 8px;
        background: @gray-3;
        border-radius: 20px;
        height: 28px;
        box-sizing: border-box;
        padding: 0 8px;
        display: flex;
        align-items: center;
        backdrop-filter: blur(20px);
        opacity: 0;
        transition: @ttime;
        cursor: pointer;

        span {
            color: @gray-2;
        }

        .value {
            margin-left: 6px;
        }

        .icon-heart {
            cursor: pointer;
            transition: @ttime;
            &:hover {
                color: @liked-color;
            }
        }
    }

    &:hover {
        .img-bg {
            opacity: 1.0;
        }

        .img-likes {
            opacity: 1.0;
        }
    }
}
</style>