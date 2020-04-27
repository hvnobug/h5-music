<template>
    <div class="mini-player">
        <img class="cover" :src="currentMusic.cover"
             :class="[isPlaying?'playing':'pausing']"
             @click="setMiniMode(false)"/>
        <div class="progressbar-container">
            {{formatTime(currentTime || 0)}}
            <progressbar @percentChange="onProgressBarChange" class="progressbar" :percent="percent"/>
            {{formatTime(currentMusic.duration || 0)}}
        </div>
        <svg class="icon" aria-hidden="true" @click="playOrPause">
            <use xlink:href="#icon-pause" v-if="isPlaying"></use>
            <use xlink:href="#icon-play" v-else></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-list"></use>
        </svg>
    </div>
</template>

<script>
    import Progressbar from "../Progressbar";
    import {playMixin} from '../../common/mixin'

    export default {
        mixins: [playMixin],
        name: "MiniPlayer",
        components: {Progressbar},
    }
</script>

<style scoped lang="stylus">
    @import "../../assets/style/variable.styl"
    .mini-player
        .icon
            margin-right 5px

        .progressbar-container
            flex 1
            margin 0 10px
            display flex
            flex-direction row
            justify-content center
            align-items center

            .progressbar
                flex 1
                width 100%
                margin 0 5px
        position fixed
        z-index 100
        bottom 0
        left 0
        height 60px
        width 100%
        background-color rgba($color-background, 80%)
        display flex
        flex-direction row
        justify-content space-around
        align-items center

        .cover
            &.playing
                animation: rotate 6s linear infinite

            &.pausing
                animation-play-state: paused
            width 45px
            height 45px
            border-radius 50%
            margin 0 10px
</style>