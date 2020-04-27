<template>
    <div class="playlist-detail sub-components">
        <detail-header back-url="/recommend" :title="name"/>
        <song-list :songs="musicMap(playlistDetail)"/>
    </div>
</template>

<script>
    import DetailHeader from "../components/DetailHeader";
    import {getPlaylistDetail, getSongsDetail} from '../api'
    import {mapState, mapActions} from "vuex";
    import SongList from '../components/SongList'
    import {musicMap} from '../common/utils'

    export default {
        name: "PlaylistDetail",
        components: {DetailHeader, SongList},
        created() {
            this.clearPlaylistDetail()
        },
        mounted() {
            this.id = this.$route.params.id
            this.name = this.$route.query.name
            this.load()
        },
        data() {
            return {
                id: '',
                name: '',
            }
        },
        methods: {
            musicMap(musics) {
                return musicMap(musics)
            },
            async load() {
                const {playlist: {trackIds}} = await getPlaylistDetail(this.id)
                const {songs} = await getSongsDetail(trackIds.map(trackId => trackId.id).join(','))
                this.setPlaylistDetail(songs)
            },

            back() {
                if (window.history.length <= 1) {
                    this.$router.push({path: '/recommend'})
                    return false
                } else {
                    this.$router.back()
                }
            },
            ...mapActions(['setPlaylistDetail', 'clearPlaylistDetail'])
        },
        computed: {
            ...mapState(['playlistDetail']),
        },
    }
</script>

<style scoped lang="stylus">
    @import "../assets/style/common.styl"
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>