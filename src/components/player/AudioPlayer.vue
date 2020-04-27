<template>
    <div class="audio-player" v-if="currentMusic">
        <div class="audio-container">
            <audio :src="currentMusic.url || ''" ref="audio"
                   v-show="currentMusic"
                   @play="play" @error="error"
                   @timeupdate="updateTime"
                   @ended="end"/>
        </div>
        <mini-player @percentChange="onProgressBarChange"/>
        <full-screen-player @percentChange="onProgressBarChange"/>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex"
    import MiniPlayer from "./MiniPlayer"
    import FullScreenPlayer from "./FullScreenPlayer"
    import {Notify} from 'vant'
    import {getRandomNum} from "../../common/utils";

    export default {
        name: "AudioPlayer",
        methods: {
            play() {
                //加载歌词相关
                // this.setIsPlaying(true)
                console.info('play')
            },
            error() {
                Notify({type: 'danger', message: `"${this.currentMusic.name}" \t无法播放`});
                this.playNextMusic()
            },
            playNextMusic() {
                let index = (this.currentIndex === this.musicList.length - 1) ? 0 : (this.currentIndex + 1)
                if (this.playMode === 1 && this.musicList.length > 1) {
                    let random = getRandomNum()
                    while (random === this.currentIndex) {
                        random = getRandomNum()
                    }
                    index = random
                }
                this.setCurrentIndex(index)
                if (!this.isPlaying) {
                    this.gotoPlay()
                }
            },
            end() {
                if (this.playMode === 2 || this.musicList.length === 1) {
                    this.$refs.audio.currentTime = 0
                    this.$refs.audio.play()
                    this.setIsPlaying(true)
                    // if (this.currentLyric) {
                    //     this.currentLyric.seek(0)
                    // }
                } else {
                    this.playNextMusic()
                }
            },
            gotoPlay() {
                this.setIsPlaying(!this.isPlaying)
                // if (this.currentLyric) {
                //     this.currentLyric.togglePlay()
                // }
            },
            updateTime(e) {
                this.setCurrentTime(e.target.currentTime)
            },
            onProgressBarChange(percent) {
                this.$refs.audio.currentTime = this.currentMusic.duration * percent
                if (!this.isPlaying) {
                    // this.togglePlaying()
                }
                // if (this.currentLyric) {
                //     this.currentLyric.seek(currentTime * 1000)
                // }
            },
            ...mapActions(['setIsPlaying', 'addPlayedHistory', 'setCurrentIndex', 'setCurrentTime',])
        },
        data() {
            return {}
        },
        components: {
            MiniPlayer, FullScreenPlayer
        },
        computed: {
            ...mapState(['currentMusic', 'isPlaying', 'musicList', 'currentTime', 'miniMode', 'currentIndex', 'playMode']),

        },
        watch: {
            currentMusic(newMusic, oldMusic) {
                if (!newMusic) {
                    return
                }
                if (oldMusic && newMusic.id === oldMusic.id) {
                    this.$refs.audio.currentTime = 0
                }
                // if (this.currentLyric) {
                //     this.currentLyric.stop()
                //     this.currentTime = 0
                //     this.playingLyric = ''
                //     this.currentLineNum = 0
                // }

                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.$refs.audio.play()
                    // this.getLyric()
                }, 1000)
            },
            isPlaying(value) {
                const audio = this.$refs.audio
                audio && this.$nextTick(() => value ? audio.play() : audio.pause())
            },
        },
    }
</script>

<style scoped lang="stylus">
    .audio-player
        z-index 1001
</style>