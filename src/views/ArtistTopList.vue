<template>
    <div class="playlist-detail sub-components">
        <detail-header back-url="/artist" :title="'歌手 - ' + name"/>
        <song-list :songs="musicMap(artistTopList)"/>
    </div>
</template>

<script>
    import DetailHeader from "../components/DetailHeader";
    import {getArtistTopList} from '../api'
    import {musicMap} from "../common/utils";
    import {mapState, mapActions} from "vuex";
    import SongList from '../components/SongList'

    export default {
        name: "ArtistTopList",
        components: {DetailHeader, SongList},

        mounted() {
            this.id = this.$route.params.id
            this.cover = this.$route.query.cover
            this.name = this.$route.query.name
            this.load()
        },
        data() {
            return {
                id: '',
                name: ''
            }
        },
        created() {
            this.clearArtistTopList()
        },
        methods: {
            async load() {
                const {songs} = await getArtistTopList(this.id)
                this.setArtistTopList(songs)
            },
            musicMap(musics) {
                return musicMap(musics)
            },
            back() {
                if (window.history.length <= 1) {
                    this.$router.push({path: '/artist'})
                    return false
                } else {
                    this.$router.back()
                }
            },
            ...mapActions(['setArtistTopList', 'clearArtistTopList'])
        },
        computed: {
            ...mapState(['artistTopList']),
        }
    }
</script>

<style scoped lang="stylus">
    @import "../assets/style/common.styl"
</style>