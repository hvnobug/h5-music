import {mapActions, mapState} from "vuex";

export const playMixin = {
    data() {
        return {
            name: 'playMixin'
        }
    },
    created() {
        console.log('playMixin...', this.name);
    },
    mounted() {
    },
    computed: {
        ...mapState(['currentMusic', 'isPlaying', 'currentTime', 'musicList', 'playMode','miniMode']),
        percent() {
            return this.currentTime / this.currentMusic.duration
        }
    },
    methods: {
        formatTime(interval) {
            interval = interval | 0
            const minute = interval / 60 | 0
            const pad = (num, n = 2) => {
                let len = num.toString().length
                while (len < n) {
                    num = '0' + num
                    len++
                }
                return num
            }
            const second = pad(interval % 60)
            return `${minute}:${second}`
        },
        ...mapActions(['playOrPausePlayer', 'setMiniMode','playNextMusic']),
        playOrPause() {
            this.playOrPausePlayer()
        },
        onProgressBarChange(percent) {
            this.$emit('percentChange', percent)
        },
    }
}