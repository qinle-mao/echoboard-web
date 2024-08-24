<template>
    <div class="message-board">
        <p class="title">{{ boardType[id].name }}</p>
        <p class="slogan">{{ boardType[id].slogan }}</p>
        <div class="label-list">
            <p class="label" :class="{labelSelected:currLabel==-1}" @click="selectLabel(-1)">全部</p>
            <p class="label" v-for="(e, index) in labels[id]" :key="index" :class="{labelSelected:currLabel==index}" @click="selectLabel(index)">{{ e }}</p>
        </div>
        <div class="message-list" v-if="id==0">
            <message-card class="message" v-for="(e, index) in cards" :key="index" :message="e" :class="{cardSelected:cardSelected==index}" @click="selectCard(index)"></message-card>
        </div>
        <div class="image-list" v-if="id==1">
            <image-card class="image" v-for="(e, index) in photos" :key="index" :content="e" @click="selectImage(index)"></image-card>
        </div>
        <div class="add-button" :style="{bottom:addBottomMargin + 'px'}" @click="switchPopUp">
            <span class="iconfont icon-add"></span>
        </div>
        <pop-up :title="title" :isPopUp=isPopUp @close="switchPopUp">
            <div v-if="id==0">
                <create-card @close="switchPopUp" v-if="cardSelected==-1"></create-card>
                <card-detail :message="cards[cardSelected]" v-if="cardSelected!=-1"></card-detail>
            </div>
            <div v-if="id==1">
                <create-photo @close="switchPopUp" v-if="imgSelected==-1"></create-photo>
                <card-detail :message="photos[imgSelected]" v-if="imgSelected!=-1"></card-detail>
            </div>
        </pop-up>
        <image-viewer :imgsrc="photos[imgSelected].imgUrl" v-if="id==1&&imgSelected!=-1" @left="imgGoLeft" @right="imgGoRight"></image-viewer>
    </div>
</template>
  
<script>
import {boardType, labels} from '../utils/data';
import MessageCard from '../components/MessageCard.vue';
import ImageCard from '../components/ImageCard.vue';
import { messageCards, photoCards } from '../../mock/index';
import PopUp from '../components/PopUp.vue';
import CreateCard from '@/components/CreateCard.vue';
import CreatePhoto from '@/components/CreatePhoto.vue'
import CardDetail from '@/components/CardDetail.vue';
import ImageViewer from '@/components/ImageViewer.vue';
export default {
    data() {
        return {
            boardType,
            labels,
            currLabel: -1,
            addBottomMargin: 30,
            title: '',
            isPopUp: false,
            cardSelected: -1,
            imgSelected: -1,
        }
    },
    components: {
        MessageCard,
        ImageCard,
        PopUp,
        CreateCard,
        CreatePhoto,
        CardDetail,
        ImageViewer
    },
    computed: {
        id() {
            return this.$route.query.id
        },
        cards() {
            return messageCards.data
        },
        photos() {
            return photoCards.data
        }
    },
    watch: {
        id() {
            this.isPopUp = false
            this.cardSelected = -1
            this.imgSelected = -1
            this.labelSelected = -1
        }
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
        },
        switchPopUp() {
            if(this.isPopUp) {
                this.cardSelected = -1
                this.imgSelected = -1
            } else if(this.id == 0) {
                if(this.cardSelected == -1) {
                    this.title = '发布留言'
                } else {
                    this.title = '留言详情'
                }
            } else if(this.id == 1) {
                if(this.imgSelected == -1) {
                    this.title = '发布照片'
                } else {
                    this.title = '照片详情'
                }
            }
            this.isPopUp = !this.isPopUp
        },
        selectCard(e) {
            if (e == this.cardSelected) {
                this.cardSelected = -1
            } else {
                this.cardSelected = e
            }
            this.switchPopUp()
        },
        selectImage(e) {
            if (e == this.imgSelected) {
                this.imgSelected = -1
            } else {
                this.imgSelected = e
            }
            this.switchPopUp()
        },
        imgGoLeft() {
            console.log(this.imgSelected)
            if(this.imgSelected > 0) {
                this.imgSelected -= 1
            }
        },
        imgGoRight() {
            console.log(this.imgSelected)
            if(this.imgSelected < this.photos.length - 1) {
                this.imgSelected += 1
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
    font-size: @font-size-global;

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

    .message-list {
        width: 100%;
        box-sizing: border-box;
        padding: 50px;
        padding-top: 28px;
        display: grid;
        grid-template-columns: repeat(auto-fill, @card-width);
        justify-content: space-between;
        row-gap: 20px;

        .message {
            cursor: pointer;
        }

        .cardSelected {
            border: 1px solid @primary-color
        }
    }

    .image-list {
        width: 100%;
        box-sizing: border-box;
        padding: 50px;
        padding-top: 28px;
        columns: 5;
        justify-content: space-between;

        .image {
            margin-bottom: 8px;
            cursor: pointer;
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
        cursor: pointer;

        transition: @ttime;

        .icon-add {
            color: @gray-9;
            font-size: 24px;
        }
    }
}
</style>