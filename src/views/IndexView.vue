<!-- 1920 * 1080 -->
<template>
    <div class="index-view">
        <top-bar></top-bar>
        <video class="bg-video" src="../assets/imgs/video.mp4" autoplay loop muted></video>
        <router-view></router-view>
        <foot-bar></foot-bar>
    </div>
</template>

<script>
import topBar from '../components/TopBar.vue'
import footBar from '../components/FootBar.vue'
import { getUserIp } from '@/api/index'

export default {
    data() {

    },
    components: {
        topBar,
        footBar,
    },
    computed: {

    },
    created() {
        this.getUser()
    },
    methods: {
        getUser() {
            getUserIp().then((res) => {
                let user = {
                    id: res.ip
                }
                this.$store.commit('getUser', user)
            })
        }
    },
}
</script>

<style lang="less" scoped>
.index-view {
    .bg-video {
        width: 100%;
        opacity: 0.15;
        position: fixed;
        top: 0;
        z-index: -1;
        // visibility: hidden;
    }
}
</style>