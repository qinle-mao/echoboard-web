<template>
    <div class="message-card" :style="{width:width, background: cardColors[card.imgUrl]}">
        <div class="top">
            <p class="time">{{ date_1(card.time) }}</p>
            <p class="label">{{ labels[card.type][card.label] }}</p>
        </div>
        <p class="content">{{ card.content }}</p>
        <div class="foot">
            <div class="left-bottom">
                <div class="icon-group">
                    <span class="iconfont icon-heart"></span>
                    <span class="value">{{ card.likes }}</span>
                </div>
                <div class="icon-group">
                    <span class="iconfont icon-discussion"></span>
                    <span class="value">{{ card.comments }}</span>
                </div>
            </div>
            <div class="new-name">{{ card.name }}</div>
        </div>
    </div>
</template>

<script>
import { labels, cardColors } from '@/utils/data';
import { date_1 } from '@/utils/methods';
export default {
    data() {
        return {
            labels,
            cardColors,
            date_1
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
            return this.message;
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