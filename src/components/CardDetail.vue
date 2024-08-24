<template>
    <div class="card-detail">
        <div class="top-buttons">
            <p class="revoke">联系墙主撕掉该标签</p>
            <p class="report">举报</p>
        </div>
        <message-card :message="message" style="width: 100%;"></message-card>
        <div class="new-comment-holder">
            <textarea class="new-comment" placeholder="请输入评论..." maxlength="96" v-model="newComment"></textarea>
            <input class="new-name" placeholder="签名" v-model="newName">
            <board-button class="confirm" size="medium" cat="primary" disabled>提交</board-button>
        </div>
        <p class="comments-title">评论 {{ message.comments }}</p>
        <div class="comment-list" v-for="(e, index) in getComments" :key="index">
            <div class="user-avatar" :style="{backgroundImage:coloredAvatars[e.avatarUrl]}"></div>
            <div class="comment-holder">
                <div class="content-top">
                    <p class="name">{{ e.name }}</p>
                    <p class="date">{{ date_1(e.time) }}</p>
                </div>
                <div class="content">{{ e.content }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import MessageCard from './MessageCard.vue';
import BoardButton from './BoardButton.vue';
import { comments } from '../../mock/index';
import { coloredAvatars } from '@/utils/data';
import { date_1 } from '@/utils/methods';
export default {
    data() {
        return {
            newComment: '',
            newName: '',
            coloredAvatars,
            date_1
        }
    },
    methods: {

    },
    components: {
        MessageCard,
        BoardButton
    },
    props: {
        message: {
            default: {}
        }
    },
    computed: {
        getComments() {
            return comments.data
        }
    }
}
</script>

<style lang="less" scoped>
.card-detail {
    .top-buttons {
        box-sizing: border-box;
        display: flex;
        justify-content: left;

        .revoke {
            margin-right: 15px;
            color: @link-color;
            cursor: pointer;
        }

        .report {
            color: @warning-color;
            cursor: pointer;
        }
    }

    .message-card {
        margin-top: 20px;
    }

    .new-comment-holder {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        row-gap: 12px;

        .new-comment {
            width: 100%;
            height: 150px;
            box-sizing: border-box;
            padding: 12px;
        }

        .new-name {
            width: 50%;
            height: 36px;
            box-sizing: border-box;
            padding: 6px;
        }
    }

    .comments-title {
        font-weight: 600;
        margin-top: 20px;
        display: flex;
        justify-self: left;
    }

    .comment-list {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;

        .user-avatar {
            height: 28px;
            width: 28px;
            border-radius: 50%;
            overflow: hidden;
        }

        .comment-holder {
            margin-bottom: 12px;
            width: 90%;
            display: flex;
            justify-content: left;
            flex-wrap: wrap;
            box-sizing: border-box;
            padding: 0 6px;

            .content-top {
                width: 100%;
                display: flex;

                .name {
                    font-weight: 600;
                    text-align: justify;
                }

                .date {
                    color: @gray-1;
                    font-size: 12px;
                    margin-left: 6px;
                    text-align: justify;
                    box-sizing: border-box;
                    padding-top: 2px;
                }

            }

            .content {
                width: 100%;;
                text-align: justify;
            }
        }
    }
}
</style>