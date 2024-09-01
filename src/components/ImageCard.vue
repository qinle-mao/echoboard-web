<template>
    <div class="image-card">
        <img class="image" :src="baseImgPath + card.imgUrl"/>
        <div class="img-bg" @click="toDetail"></div>
        <div class="img-likes">
            <span class="iconfont icon-heart" :class="{isLiked:card.isLiked[0].COUNT>0}" @click="addLike"></span>
            <span class="value">{{ card.likeCount[0].COUNT }}</span>
        </div>
    </div>
</template>

<script>
import { labels } from '@/utils/data';
import { baseImgPath } from '../utils/env';
import { insertFeedback } from '@/api//index';
export default {
    data() {
        return {
            labels,
            baseImgPath,
            user: this.$store.state.user
        }
    },
    props: {
        message: {
            default: {}
        }
    },
    computed: {
        card() {
            return this.message
        }
    },
    methods: {
        toDetail() {
            this.$emit('toDetail')
        },
        addLike() {
            if(this.card.likeCount[0].COUNT == 0) {
                let data = {
                    cardId: this.card.id,
                    userId: this.user.id,
                    time: new Date(),
                    type: 0
                }
                console.log(data)
                insertFeedback(data).then(() => {
                    this.card.likeCount[0].COUNT += 1
                    this.card.isLiked[0].COUNT += 1
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.image-card {
    position: relative;
    cursor: pointer;

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

        .isLiked {
            color: @liked-color;
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