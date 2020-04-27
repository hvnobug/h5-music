<template>
    <div class="content" :style="{height:'calc(100% - ' + (currentMusic ? 130 : 70) + 'px)'}">
        <!--        <van-swipe :autoplay="3000">-->
        <!--            <van-swipe-item v-for="(image, index) in $store.state.imageList" :key="index">-->
        <!--                <img v-lazy="image"/>-->
        <!--            </van-swipe-item>-->
        <!--        </van-swipe>-->
        <recommend-list/>
        <transition :name="transitionName">
            <router-view class="child-view"/>
        </transition>
    </div>
</template>

<script>
    import {Swipe, SwipeItem} from 'vant'
    import RecommendList from "../components/RecommendList";
    import {mapState} from "vuex";

    export default {
        name: "Index",
        components: {
            RecommendList,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem
        },
        data(){
            return {
                transitionName:''
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
    img
        width 100%
        height 250px

</style>