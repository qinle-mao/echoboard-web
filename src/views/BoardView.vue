<template>
    <div class="message-board">
        <!--  -->
        <p class="title">{{ boardType[id].name }}</p>
        <p class="slogan">{{ boardType[id].slogan }}</p>
        <div class="label-list">
            <p class="label" :class="{labelSelected:labelSelected==-1}" @click="selectLabel(-1)">全部</p>
            <p class="label" v-for="(e, index) in labels[id]" :key="index" :class="{labelSelected:labelSelected==index}" @click="selectLabel(index)">{{ e }}</p>
        </div>
        <!--  -->
        <div class="message-list" v-if="id==0">
            <message-card class="message" v-for="(e, index) in cards" :key="index" :message="e" :class="{cardSelected:cardSelected==index}" @toDetail="selectCard(index)"></message-card>
        </div>
        <div class="image-list" v-if="id==1">
            <image-card class="image" v-for="(e, index) in cards" :key="index" :message="e" @toDetail="selectImage(index)"></image-card>
        </div>
        <div class="empty-page" v-if="status==1">
            <img :src="emptyPage[id].imgUrl"/>
            <p>{{ emptyPage[id].message }}</p>
        </div>
        <div class="loading-page" v-if="status==0">
            <div id="loading_lottie"></div>
        </div>
        <p class="no-more" v-if="status==3">没有更多了...</p>
        <!--  -->
        <div class="add-button" :style="{bottom:addBottomMargin + 'px'}" @click="switchPopUp">
            <span class="iconfont icon-add"></span>
        </div>
        <pop-up :title="title" :isPopUp=isPopUp @close="switchPopUp">
            <div v-if="id==0">
                <create-card @close="switchPopUp" v-if="cardSelected==-1" @cardsubmit="newCard"></create-card>
                <card-detail :message="cards[cardSelected]" v-if="cardSelected!=-1"></card-detail>
            </div>
            <div v-if="id==1">
                <create-photo @close="switchPopUp" v-if="imgSelected==-1" @photosubmit="newPhoto"></create-photo>
                <card-detail :message="cards[imgSelected]" v-if="imgSelected!=-1"></card-detail>
            </div>
        </pop-up>
        <image-viewer :imgsrc="cards[imgSelected].imgUrl" v-if="id==1&&imgSelected!=-1" @left="imgGoLeft" @right="imgGoRight"></image-viewer>
    </div>
</template>
  
<script>
import lottie from 'lottie-web';
import LoadingLottie from '../assets/imgs/loading_lottie.json';
import {boardType, labels, emptyPage} from '../utils/data';
import MessageCard from '../components/MessageCard.vue';
import ImageCard from '../components/ImageCard.vue';
import PopUp from '../components/PopUp.vue';
import CreateCard from '@/components/CreateCard.vue';
import CreatePhoto from '@/components/CreatePhoto.vue'
import CardDetail from '@/components/CardDetail.vue';
import ImageViewer from '@/components/ImageViewer.vue';
import { findCardPage } from '@/api/index';
import { Mutex } from 'async-mutex';
const mutex = new Mutex()
// import { messageCards, photoCards } from '../../mock/index';
export default {
    data() {
        return {
            boardType,
            addBottomMargin: 30,
            labels,
            labelSelected: -1,
            cardSelected: -1,
            imgSelected: -1,
            emptyPage,
            title: '',
            isPopUp: false,
            status: 0, // 0: loading, 1: no data, 2: OK, 3: no more
            page: 0,
            pageSize: 15,
            cards: [],
            // photos: []
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
        user() {
            return this.$store.state.user
        }
    },
    watch: {
        id() {
            this.isPopUp = false
            this.cardSelected = -1
            this.imgSelected = -1
            this.labelSelected = -1
            this.clearPage()
            this.loadPage()
        }
    },
    methods: {
        clearPage() {
            this.status = 0
            this.page = 0
            this.cards = []
        },
        loadPage() {
            if(this.page >= 0) {
                this.status = 0
                let data = {
                    page: this.page,
                    pageSize: this.pageSize,
                    type: this.id,
                    label: this.labelSelected,
                    userId: this.user.id
                }
                console.log(data)
                findCardPage(data).then((res) => {
                    if(res.message.length > 0) {
                        this.page += 1
                        this.cards = this.cards.concat(res.message)
                    } else {
                        this.page = -1
                    }
                    setTimeout(() => {
                        if(this.cards.length > 0) {
                            console.log(this.cards[0].imgUrl)
                            if(this.page == -1) {
                                    this.status = 3
                                } else {
                                    this.status = 2
                                }
                            } else {
                                this.status = 1
                        }
                    }, 100)
                })
            }           
        },
        selectLabel(e) {
            this.labelSelected = e
            this.clearPage()
            this.loadPage()
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
        scroll2LoadMore() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            let clientHeight = document.documentElement.clientHeight
            let scrollHeight = document.documentElement.scrollHeight
            // load new page: mutex is needed
            // https://www.npmjs.com/package/async-mutex
            var wait = (ms) => {
                const start = Date.now();
                let now = start;
                while (now - start < ms) {
                    now = Date.now();
                }
                console.log('timeout:', ms)
            }
            if(scrollTop + clientHeight + 1 > scrollHeight && this.status != 3) {
                mutex.acquire().then(release => {
                    this.loadPage()
                    wait(800)
                    release()
                })
            }
        },
        addLoadingLottie() {
            if(this.status == 0) {
                this.$nextTick(async () => {
                    var param = {
                        container: document.getElementById('loading_lottie'),
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        animationData: LoadingLottie
                    };
                    lottie.loadAnimation(param)
                })
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
            if(this.imgSelected > 0) {
                this.imgSelected -= 1
            } else {
                this.$message({type: 'info', message: '已到第一张!'})
            }
        },
        imgGoRight() {
            if(this.imgSelected < this.cards.length - 1) {
                this.imgSelected += 1
            } else {
                this.$message({type: 'info', message: '已到最后一张!'})

            }
        },
        newCard(e) {
            this.cards.unshift(e)
        },
        newPhoto(e) {
            this.cards.unshift(e)
        }
    },
    mounted() {
        this.addLoadingLottie()
        window.addEventListener('scroll', this.scrollBottom)
        window.addEventListener('scroll', this.scroll2LoadMore)
        let timer = setInterval(() => {
            if(this.user) {
                clearInterval(timer)
                this.loadPage()
                console.log(this.user)
            }
        }, 10)
    },
    unmounted() {
        window.addEventListener('scroll', this.scrollBottom)
        window.addEventListener('scroll', this.scroll2LoadMore)
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
        padding: 60px;
        padding-top: 28px;
        display: grid;
        grid-template-columns: repeat(auto-fill, @card-width);
        justify-content: space-between;
        row-gap: 20px;

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
        }
    }

    .empty-page {
        width: 100%;
        text-align: center;
        position: absolute;
        top: 280px;

        img {
            display: inline;
            width: 600px;
        }

        p {
            font-weight: 700;
            font-size: 24px;
            color: @gray-2;
        }
    }

    .loading-page {
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 20px;
        
        #loading_lottie {
            width: 200px;
        }
    }

    .no-more {
        width: 100%;
        text-align: center;
        color: @gray-2;
        padding-top: 20px;
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