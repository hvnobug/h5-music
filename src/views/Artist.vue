<template>
    <div class="content" :style="{height:'calc(100% - ' + (currentMusic ? 130 : 70) + 'px)'}">
        <artist-list/>
        <transition :name="transitionName">
            <router-view class="child-view"/>
        </transition>
    </div>
</template>

<script>

    import ArtistList from "../components/ArtistList";
    import {mapState} from "vuex";

    export default {
        name: "Artist",
        components: {
            ArtistList
        },
        data() {
            return {
                transitionName: ''
            }
        },
        // 接着在父组件内
        // watch $route 决定使用哪种过渡
        watch: {
            '$route'(to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
        computed: {
            ...mapState(['currentMusic']),
        },
    }
</script>

<style scoped lang="stylus">

</style>