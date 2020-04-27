<template>
    <div class="search-result sub-components">
        <detail-header back-url="/search" :title="'搜索 - ' + $route.query.keyword"/>
        <song-list :songs="musicMap(searchResults)"/>
    </div>
</template>

<script>
    import SongList from "../components/SongList";
    import {musicMap} from "../common/utils";
    import {mapState} from "vuex";
    import DetailHeader from "../components/DetailHeader";

    export default {
        name: "SearchResult",
        components: {DetailHeader, SongList},
        data() {
            return {}
        },
        created() {

        },
        methods: {
            musicMap(musics) {
                return musicMap(musics)
            },
        },
        computed: {
            ...mapState(['searchResults']),
        }
    }
</script>

<style scoped lang="stylus">
    @import "../assets/style/common.styl"
</style>