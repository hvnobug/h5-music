<template>
    <div id="app">
        <div class="bg"/>
        <div class="tabs">
            <router-link tag="div" to="/recommend" class="tab">推荐</router-link>
            <router-link tag="div" to="/artist" class="tab">歌手</router-link>
            <router-link tag="div" to="/rank" class="tab">排行</router-link>
            <router-link tag="div" to="/search" class="tab">搜索</router-link>
        </div>
        <audio-player/>
        <router-view/>
    </div>
</template>
<script>
    import {Tabs, Tab} from 'vant'
    import AudioPlayer from "./components/player/AudioPlayer";


    export default {
        name: 'App',
        components: {
            AudioPlayer,
            [Tabs.name]: Tabs,
            [Tab.name]: Tab,
        },
        data() {
            return {};
        },
    }
</script>
<style lang="stylus">
@import "./assets/style/common.styl"
body
    color $color-text
    margin 0
    font-family Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    min-height 100vh
    padding-bottom 0

.content
    position fixed
    top 55px
    margin-bottom 65px
    width 100%
    height calc(100% - 130px)
    overflow scroll

#app
    margin 0

/*背景模糊*/
.bg
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background-image url('//i.loli.net/2020/04/26/xwUIMdfov8a4py2.jpg')
    background-repeat no-repeat
    background-size cover
    padding 1px
    box-sizing border-box
    z-index -1

.bg:after
    content ""
    width 100%
    height 100%
    position absolute
    left 0
    top 0
    background inherit
    filter blur(1px)
    z-index: 2


.tabs
    display flex
    flex-direction row
    justify-content center
    align-items center
    text-align center

    .tab
        height 45px
        line-height 45px
        flex 1

        &.router-link-active
            font-weight bolder
            color: $color-theme
            position relative

            &::after
                content ''
                position absolute
                left 25%
                bottom 0
                width 50%
                border 1px solid $color-theme

</style>
