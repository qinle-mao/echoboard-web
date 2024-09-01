<template>
    <div class="message-card" :style="{width:width, background: card.type==0?cardColors[card.color]:cardColors[5]}">
        <div class="top">
            <p class="time">{{ convertDate(card.time) }}</p>
            <p class="label">{{ labels[card.type][card.label] }}</p>
        </div>
        <p class="content" @click="toDetail">{{ card.content }}</p>
        <div class="foot">
            <div class="left-bottom">
                <div class="icon-group">
                    <span class="iconfont icon-heart" :class="{isLiked:card.isLiked[0].COUNT>0}" @click="addLike"></span>
                    <span class="value">{{ card.likeCount[0].COUNT }}</span>
                </div>
                <div class="icon-group">
                    <span class="iconfont icon-discussion"></span>
                    <span class="value">{{ card.commentCount[0].COUNT }}</span>
                </div>
            </div>
            <div class="new-name">{{ card.name }}</div>
        </div>
    </div>
</template>

<script>
import { labels, cardColors } from '@/utils/data';
import { convertDate } from '@/utils/methods';
import { insertFeedback } from '@/api/index';
export default {
    data() {
        return {
            labels,
            cardColors,
            convertDate,
            user: this.$store.state.user
        }
    },
    props: {
        width: {
            default: "300px"
        },
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
@import '../assets/fonts/icons/iconfont.css';
@font-face {
    font-family: message-font;
    src: url('../assets/fonts/MiaoZi-GuoZhiTi-2.ttf');
}
.message-card {
    height: @card-height;
    padding: 10px 20px;
    box-sizing: border-box;
    position: relative;

    .top {
        display: flex;
        justify-content: space-between;
        padding-bottom: 16px;
        color: @gray-2;
        font-size: 12px;
    }

    .content {
        height: 140px;
        font-family: message-font;
        // font-size: 20px;
        color: @gray-0;
        text-align: justify;
        cursor: pointer;
    }

    .foot {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 16px;
        left: 0;
        padding: 0 20px;
        box-sizing: border-box;
        width: 100%;

        .left-bottom {
            display: flex;

            .icon-group {
                padding-right: 8px;
                display: flex;
                align-items: center;
                color: @gray-2;

                .value {
                    line-height: 16px;
                    padding-left: 4px;
                }

                .iconfont {
                    font-size: 16px;
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
        }

        .new-name {
            font-family: message-font;
            // font-size: 20px;
            color: @gray-2;
        }
    }
}
</style>