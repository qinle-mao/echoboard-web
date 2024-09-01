<template>
    <div class="top-bar">
        <div class="logo">
            <img class="logo-img" src="../assets/imgs/icon.svg">
            <p class="logo-text">回声留言墙</p>
        </div>
        <div class="menu">
            <board-button class="message-button" size="medium" :cat="id==0?'cprimary':'csecondary'" @click="switchBoard(0)">{{ boardType[0].name }}</board-button>
            <board-button class="photo-button" size="medium" :cat="id==1?'cprimary':'csecondary'" @click="switchBoard(1)">{{ boardType[1].name }}</board-button>
        </div>
        <div class="user">
            <div class="user-avatar"></div>
        </div>
    </div>
</template>

<script>
import {boardType} from '../utils/data'
import BoardButton from './BoardButton.vue'
export default {
    data() {
        return {
            boardType
        }
    },
    components: {
        BoardButton
    },
    computed: {
        id() {
            return this.$route.query.id
        }
    },
    methods: {
        switchBoard(e) {
            this.$router.push({
                query:{id:e}
            })
        }
    }
}
</script>

<style lang="less" scoped>
.top-bar {
    width: 100%;
    height: @topbar-height;
    background: rgba(255, 255, 255, 0.80);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    box-sizing: border-box;

    .logo {
        display: flex;
        align-items: center;
        width: 300px;
        .logo-img {
            width: 30px;
            height: 30px;
        }
        .logo-text {
            font-size: @font-size-logo;
            font-weight: 600;
            color: @gray-0;
            padding-left: 12px;
        }
    }

    .user {
        width: 300px;
        .user-avatar {
            float: right;
            height: 30px;
            width: 30px;
            border-radius: 50%;
            background-image: linear-gradient(180deg, #d6caf0 2%, @primary-color 100%);
        }
    }
}
.menu {
    .message-button {
        margin-right: 20px;
    }
}
</style>