<template>
    <div class="playlist-detail sub-components">
        <detail-header back-url="/rank" :title="'排行榜 - ' + name"/>
        <song-list :songs="musicMap(rankSongDetail)"/>
    </div>
</template>

<script>
    import DetailHeader from "../components/DetailHeader";
    import {getPlaylistDetail, getSongsDetail} from '../api'
    import {mapState, mapActions} from "vuex";
    import SongList from '../components/SongList'
    import {musicMap} from '../common/utils'

    export default {
        name: "RankSongDetail",
        components: {DetailHeader, SongList},
        created() {
            this.clearRankSongDetail()
        },
        mounted() {
            this.id = this.$route.params.id
            this.name = this.$route.query.name
            this.load()
        },
        data() {
            return {
                id: '',
                name: ''
            }
        },
        methods: {
            musicMap(musics) {
                return musicMap(musics)
            },
            async load() {
                const {playlist: {trackIds}} = await getPlaylistDetail(this.id)
                const {songs} = await getSongsDetail(trackIds.map(trackId => trackId.id).join(','))
                this.setRankSongDetail(songs)
            },

            back() {
                if (window.history.length <= 1) {
                    this.$router.push({path: '/rank'})
                    return false
                } else {
                    this.$router.back()
                }
            },
            ...mapActions(['setRankSongDetail', 'clearRankSongDetail'])
        },
        computed: {
            ...mapState(['rankSongDetail']),
        }
    }
</script>

<style scoped lang="stylus">
    @import "../assets/style/common.styl"
</style>
