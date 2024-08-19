<template>
    <div class="message-board">
        <p class="title">{{ boardType[id].name }}</p>
        <p class="slogan">{{ boardType[id].slogan }}</p>
        <div class="label-list">
            <p class="label" :class="{labelSelected:currLabel==-1}" @click="selectLabel(-1)">全部</p>
            <p class="label" v-for="(e, index) in labels[id]" :key="index" :class="{labelSelected:currLabel==index}" @click="selectLabel(index)">{{ e }}</p>
        </div>
        <div class="card-list">
            <message-card class="card" v-for="(e, index) in cards" :key="index" :message="e"></message-card>
        </div>
        <div class="add-button" :style="{bottom:addBottomMargin + 'px'}">
            <span class="iconfont icon-add"></span>
        </div>
        <pop-up></pop-up>
    </div>
</template>
  
<script>
import {boardType, labels} from '../utils/data';
import messageCard from '../components/MessageCard.vue';
import { messageCards } from '../../mock/index';
import popUp from '../components/PopUp.vue'
export default {
    data() {
        return {
            boardType,
            labels,
            id:0,
            currLabel:-1,
            cards:messageCards.data,
            addBottomMargin:30
        }
    },
    components: {
        messageCard,
        popUp
    },
    methods: {
        selectLabel(e) {
            this.currLabel = e
        },
        scrollBottom() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            let clientHeight = document.documentElement.clientHeight
            let scrollHeight = document.documentElement.scrollHeight
            if(scrollTop + clientHeight + 200 + 30 >= scrollHeight) {
                this.addBottomMargin = scrollTop + clientHeight + 200 + 30 - scrollHeight
            } else {
                this.addBottomMargin = 30
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollBottom)
    },
    unmounted() {
        window.addEventListener('scroll', this.scrollBottom)
    }
}
</script>
  
<style lang="less" scoped>
@import '../assets/fonts/icons/iconfont.css';
.message-board {
    min-height: 1000px;
    padding-top: @topbar-height;
    text-align: center;

    .title {
        font-size: @font-size-title;
        color: @gray-0;
        font-weight: 600;
        padding-top: 48px;
        padding-bottom: 8px;
    }

    .slogan {
        color: @gray-1;
    }

    .label-list {
        display: flex;
        justify-content: center;
        margin-top: 40px;

        .label {
            padding: 0 14px;
            line-height: @board-label-height;
            margin: 4px;
            color: @gray-1;
            cursor: pointer;
        }

        .labelSelected {
            color: @gray-0;
            font-weight: 600;
            border: 1px solid @gray-0;
            border-radius: 16px;
        }
    }

    .card-list {
        width: 100%;
        padding-top: 28px;
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(@card-width, 1fr));
        row-gap: 12px;

        .card {
            place-self: center;
        }
    }

    .add-button {
        width: 56px;
        height: 56px;
        background: @gray-0;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.80);
        border-radius: 28px;
        position: fixed;
        right: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        transition: @ttime;

        .icon-add {
            color: @gray-9;
            font-size: 24px;
        }
    }
}
</style>