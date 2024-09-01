<template>
    <div class="card-detail">
        <div class="top-buttons">
            <p class="revoke">联系墙主撕掉该标签</p>
            <p class="report">举报</p>
        </div>
        <message-card :message="card" style="width: 100%;"></message-card>
        <div class="new-comment-holder">
            <textarea class="new-comment" placeholder="请输入评论..." maxlength="96" v-model="newComment"></textarea>
            <input class="new-name" placeholder="签名" v-model="newName">
            <board-button class="confirm" size="medium" cat="primary" @click="submitComment()">提交</board-button>
        </div>
        <p class="comments-title">评论 {{ card.commentCount[0].COUNT }}</p>
        <div class="comment-list" v-for="(e, index) in comments" :key="index">
            <div class="user-avatar" :style="{backgroundImage: coloredAvatars[Number(e.avatarUrl)]}"></div>
            <div class="comment-holder">
                <div class="content-top">
                    <p class="name">{{ e.name }}</p>
                    <p class="date">{{ convertDate(e.time) }}</p>
                </div>
                <div class="content">{{ e.content }}</div>
            </div>
        </div>
        <p class="load-more-button" v-if="page>=0" @click="loadComments">点击加载更多...</p>
    </div>
</template>

<script>
import MessageCard from './MessageCard.vue';
import BoardButton from './BoardButton.vue';
import { coloredAvatars } from '@/utils/data';
import { convertDate } from '@/utils/methods';
import { insertComment, findCommentPage } from '@/api/index';
// import { comments } from '../../mock/index';
export default {
    data() {
        return {
            newComment: '',
            newName: '',
            coloredAvatars,
            convertDate,
            user: this.$store.state.user,
            comments: [],
            page: 0,
            pageSize: 5
        }
    },
    methods: {
        loadComments() {
            if(this.page >= 0) {
                let data = {
                    page: this.page,
                    pageSize: this.pageSize,
                    cardId: this.card.id
                }
                console.log(data)
                findCommentPage(data).then((res) => {
                    if(res.message.length > 0) {
                        this.page += 1
                        this.comments = this.comments.concat(res.message)
                        if(res.message.length < this.pageSize) {
                            this.page = -1
                        }
                    } else {
                        this.page = -1
                    }
                })
            }           
        },
        submitComment() {
            if(this.newComment == '') {
                this.$message({type: 'error', message: '评论不能为空!'})
            } else {
                let data = {
                    id: 0,
                    cardId: this.card.id,
                    userId: this.user.id,
                    time: new Date(),
                    content: this.newComment,
                    name: this.newName,
                    avatarUrl: String(Math.floor(Math.random()*3)),
                }
                if(data.name == '') {
                    data.name = '匿名'
                }
                insertComment(data).then((res) => {
                    data.id = res.message.insertId
                    this.comments.unshift(data)
                    this.card.commentCount[0].COUNT += 1
                    this.$message({type: 'success', message: '评论成功!'})
                    this.newComment = ''
                    this.newName = ''
                })
            }
        },
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
        card() {
            return this.message
        }
    },
    mounted() {
        this.loadComments()
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

    .load-more-button {
        color: @gray-1;
        font-size: 12px;
        text-align: center;
        padding-bottom: 20px;
        cursor: pointer;
    }
}
</style>