<template>
    <div class="full-screen-player animated" :class="[ miniMode ? 'fadeOutDownBig': 'fadeInDownBig']" v-if="currentMusic">
        <div class="detail-header">
            <div class="title">
                <img class="back" @click="setMiniMode(true)" src="../../assets/image/down.png"/>
                <span class="text van-ellipsis">{{showTitle}}</span>
            </div>
        </div>
        <div class="background">
            <img :src="currentMusic.cover"/>
        </div>
        <div class="player-content">
            <div class="cover-img">
                <div class="img-container">
                    <img :src="currentMusic.cover" :class="[isPlaying?'playing':'pausing']"/>
                </div>
            </div>
            <div class="bottom-container">
                <div class="progressbar-container">
                    {{formatTime(currentTime || 0)}}
                    <progressbar @percentChange="onProgressBarChange" class="progressbar" :percent="percent"/>
                    {{formatTime(currentMusic.duration || 0)}}
                </div>
                <div class="icon-list">
                    <i class="icon" :class="playModeIcon" @click="switchMode"></i>
                    <i class="icon icon-prev"></i>
                    <i @click="playOrPause" :class="[isPlaying ? 'icon-pause' : 'icon-play']"
                       class=" icon-big icon"></i>
                    <i @click="playNextMusic" class="icon icon-next"></i>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-refresh"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {playMixin} from "../../common/mixin";
    import Progressbar from "../Progressbar";
    import {mapActions} from 'vuex'
    import {Toast} from "vant";

    export default {
        name: "FullScreenPlayer",
        mixins: [playMixin],
        data() {
            return {
                animated: ''
            }
        },
        components: {Progressbar},
        methods: {
            ...mapActions(['setPlayMode']),
            switchMode() {
                const newMode = (this.playMode + 1) % 3
                Toast(`${newMode === 0 ? '列表循环' : newMode === 1 ? '随机播放' : '单曲循环'}模式`);
                this.setPlayMode(newMode)
            }
        },
        computed: {
            showTitle() {
                return this.currentMusic.name || '' + (this.currentMusic.artist ? ('-' + this.currentMusic.artist) : '')
            },
            playModeIcon() {
                return this.playMode === 0 ? 'icon-sequence' : this.playMode === 1 ? 'icon-random' : 'icon-loop'
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../assets/style/variable.styl"
    @import "../../assets/style/icon.styl"

    .full-screen-player
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        z-index: 101
        background #323233

        .title
            z-index 101

        .background
            position absolute
            width 100%
            height calc(100% - 55px)
            opacity .6
            -webkit-filter blur(20px)
            filter blur(20px)
            z-index -1

            & > img
                width 100%
                height 100%

        .player-content
            z-index 101
            display flex
            flex-direction column
            justify-content space-between
            align-items center
            height calc(100% - 55px)

            .cover-img
                padding-top: 5vh
                width 80%
                position relative
                margin 0 auto

                .img-container
                    position relative
                    width 100%
                    height 0
                    padding-top 100%

                    img
                        position: absolute
                        left: 0
                        top: 0
                        width: 100%
                        height: 100%
                        -webkit-box-sizing border-box
                        box-sizing border-box
                        border-radius 50%
                        border 10px solid hsla(0, 0%, 100%, .1)

                        &.playing
                            animation rotate 30s linear infinite

                        &.pausing
                            animation-play-state paused

        .bottom-container
            width 90vw
            margin-bottom 5vh

            .progressbar-container
                display flex
                flex-direction row
                align-items center
                margin-bottom 5vh

                .progressbar
                    flex 1
                    margin 0 10px

            .icon-list
                display flex
                flex-direction row
                align-items center
                justify-content space-around

                .icon
                    color darken($color-theme, 10%)
                    font-size 30px

                    &.icon-big
                        font-size 35px
                        height 35px
                        width 35px

</style>

