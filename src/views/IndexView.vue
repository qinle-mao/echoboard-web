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
        
    },
    methods: {

    },
}
</script>

<style lang="less" scoped>
.index-view {
    .bg-video {
        width: 100%;
        opacity: 0.25;
        position: fixed;
        top: 0;
        z-index: -1;
    }
}
</style>