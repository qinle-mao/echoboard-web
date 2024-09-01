<template>
    <div class="create-photo">
        <div class="add-image">
            <input type="file" name="file" id="file" @change="show"/>
            <div class="add-bt">
                <span class="iconfont icon-add"></span>
            </div>
            <div class="img-div"><img :src="tmpUrl" /></div>
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
            <board-button class="confirm" size="large" cat="primary" @click="submit">确定</board-button>
        </div>
    </div>
</template>

<script>
import { cardColors, cardColorsDark, labels } from '../utils/data'
import boardButton from './BoardButton.vue';
import { getObjectUrl } from '@/utils/methods';
import { insertCard, photoUpload } from '@/api/index';
export default {
    data() {
        return {
            cardColors,
            cardColorsDark,
            labels,
            colorSelected: -1,
            labelSelected: 0,
            message: '',
            name: '',
            tmpUrl: '',
            imgUrl: null,
            user: this.$store.state.user
        }
    },
    components: {
        boardButton
    },
    computed: {
        id() {
            return this.$route.query.id
        }
    },
    methods: {
        switchLabel(e) {
            this.labelSelected = e
        },
        closePopUp(data) {
            this.$emit('close', data)
        },
        show() {
            this.tmpUrl  = getObjectUrl(document.getElementById('file').files[0])
        },
        submit() {
            let data = {
                userId: this.user.id,
                time: new Date(),
                content: this.message,
                label: this.labelSelected,
                name: this.name,
                type: this.id,
                color: this.colorSelected,
                imgUrl: this.imgUrl,
                isLiked: [{COUNT: 0}],
                isReported: [{COUNT: 0}],
                isRevoked: [{COUNT: 0}],
                likeCount: [{COUNT: 0}],
                commentCount:  [{COUNT: 0}]
            }
            if(data.name == '') {
                data.name = '匿名'
            }
            // upload photo
            let file = document.getElementById('file')
            if(file.files.length > 0) {
                if(data.content != '') {
                    let formData = new FormData()
                    formData.append('photo', file.files[0])
                    photoUpload(formData).then((res) => {
                        console.log(res)
                        data.imgUrl = res
                    })
                    setTimeout(()=>{
                        insertCard(data).then(() => {
                            this.$emit('photosubmit', data)
                            this.$message({type: 'success', message: '感谢提交!'})
                            this.closePopUp(0)
                        })
                    }, 800)
                } else {
                    this.$message({type: 'error', message: '留言不能为空!'})
                }
            } else {
                this.$message({type: 'error', message: '照片不能为空!'})
            }
        },
    }
}
</script>

<style lang="less" scoped>
.create-photo {
    font-size: @font-size-global;

    .add-image {
        width: 100%;
        height: 200px;
        padding-bottom: 20px;
        position: relative;

        #file {
            position: absolute;
            top: 0;
            left: 0;
            width: 64px;
            height: 64px;
            opacity: 0;
            cursor: pointer;
        }

        .add-bt {
            width: 64px;
            height: 64px;
            border-radius: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid @gray-3;
            background: rgba(212, 212, 212, 0.35);
            cursor: pointer;

            .iconfont {
                font-size: 24px;
                color: @gray-0;
            }
        }

        .img-div {
            max-height: 200px;
            width: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;

            img {
                width: 100%;
            }
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