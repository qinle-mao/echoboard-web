<template>
    <div class="create-photo">
        <div class="add-image">
            <span class="iconfont icon-add"></span>
            <div class="bg"></div>
        </div>
        <div class="create-card-body" :style="{background: cardColors[5]}">
            <textarea class="message-holder" placeholder="我的留言..." maxlength="96" v-model="message"></textarea>
            <input class="name-holder" type="text" placeholder="签名" v-model="name"/>
        </div>
        <div class="select-label">
            <p class="label-title">选择标签</p>
            <div class="labels-holder">
                <p class="label" v-for="(e, index) in labels[1]" :key="index" :class="{labelSelected:index==labelSelected}" @click="switchLabel(index)">{{ e }}</p>
            </div>
        </div>
        <div class="foot-bar">
            <board-button class="discard" size="large" cat="secondary" @click="closePopUp(0)">放弃</board-button>
            <board-button class="confirm" size="large" cat="primary">确定</board-button>
        </div>
    </div>
</template>

<script>
import { cardColors, cardColorsDark, labels } from '../utils/data'
import boardButton from './BoardButton.vue';
export default {
    data() {
        return {
            cardColors,
            cardColorsDark,
            labels,
            colorSelected: 0,
            labelSelected: 0,
            message: '',
            name: '',
            imgUrl: ''
        }
    },
    components: {
        boardButton
    },
    methods: {
        switchLabel(e) {
            this.labelSelected = e
        },
        closePopUp(data) {
            this.$emit('close', data)
        },
    }
}
</script>

<style lang="less" scoped>
.create-photo {
    font-size: @font-size-global;

    .add-image {
        width: 100%;
        height: 150px;
        border: 1px solid @gray-3;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .iconfont {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: @gray-3;
            font-size: 25px;
            color: @gray-9;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

        .bg {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-image: none;
            z-index: -1;
        }
    }

    .create-card-body {
        width: 100%;
        height: 300px;
        margin-top: 12px;
        box-sizing: border-box;
        padding: 12px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .message-holder {
            background: none;
            border: none;
            resize: none;
            width: 100%;
            height: 200px;
        }

        .name-holder {
            width: 100%;
            box-sizing: border-box;
            padding: 8px;
            background: none;
            border: 1px solid @gray-9;
            height: 36px;
            line-height: 20px;
        }
    }

    .select-label {
        width: 100%;
        height: 100px;
        box-sizing: border-box;
        padding: 12px 0;
        
        .label-title {
            color: @gray-0;
            font-weight: 600;
            display: flex;
            justify-self: left;
        }

        .labels-holder {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fill, 50px);
            justify-content: space-between;

            .label {
                color: @gray-2;
                margin-top: 12px;
                cursor: pointer;
            }

            .labelSelected {
                border-color: none;
                border-radius: 14px;
                color: @gray-0;
                font-weight: 600;
                background: @gray-3;
            }

        }
    }

    .foot-bar {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        position: fixed;
        bottom: @pop-up-foot-height;
        right: 0;
        padding: 20px;

        .discard {
            width: (@pop-up-width / 4);
        }

        .confirm {
            width: (@pop-up-width / 2);
        }

    }
}

</style>