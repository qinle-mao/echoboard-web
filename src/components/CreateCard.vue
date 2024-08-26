<template>
    <div class="create-card">
        <div class="colors">
            <p class="color-block" v-for="(e, index) in cardColorsDark" :key="index" :style="{background: e}" :class="{colorSelected:index==colorSelected}" @click="switchColor(index)"></p>
        </div>
        <div class="create-card-body" :style="{background: cardColors[colorSelected]}">
            <textarea class="message-holder" placeholder="我的留言..." maxlength="96" v-model="message"></textarea>
            <input class="name-holder" type="text" placeholder="签名" v-model="name"/>
        </div>
        <div class="select-label">
            <p class="label-title">选择标签</p>
            <div class="labels-holder">
                <p class="label" v-for="(e, index) in labels[0]" :key="index" :class="{labelSelected:index==labelSelected}" @click="switchLabel(index)">{{ e }}</p>
            </div>
        </div>
        <div class="foot-bar">
            <board-button class="discard" size="large" cat="secondary" @click="closePopUp(0)">放弃</board-button>
            <board-button class="confirm" size="large" cat="primary" @click="apiTestInsertCard">确定</board-button>
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
        }
    },
    components: {
        boardButton
    },
    methods: {
        switchColor(e) {
            this.colorSelected = e
        },
        switchLabel(e) {
            this.labelSelected = e
        },
        closePopUp(data) {
            this.$emit('close', data)
        },
        apiTestInsertCard() {
            let data={
                userId: '001',
                time: new Date(), 
                content: 'this is a message from web', 
                label: 2, 
                name: 'pangpang', 
                type: 0, 
                color: 1, 
                imgUrl: 'www.xxx.com'
            }
            this.axios
                .post('http://localhost:3000/insertcard', data)
                .then((res) => {
                    console.log(res)
                })
        }
    }
}
</script>

<style lang="less" scoped>
.create-card {
    font-size: @font-size-global;

    .colors {
        display: flex;
        justify-content: left;
        align-items: center;

        .color-block {
            width: 24px;
            height: 24px;
            margin-right: 8px;
            cursor: pointer;
        }

        .colorSelected {
            border: 1px solid @primary-color;
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