<template>
    <div class="content" :style="{height:'calc(100% - ' + (currentMusic ? 130 : 70) + 'px)'}">
        <div class="search-content">
            <van-search
                    @search="search"
                    v-model="keyword"
                    shape="round"
                    background="#09f"
                    placeholder="搜索歌曲"
            />
            <div class="search-block">
                <div class="popular-keyword" v-show="hostKeywords.length > 0">
                    <div class="search-title">
                        热门搜索
                    </div>
                    <div class="tags">
                        <div class="tag" v-for="(item,index) in hostKeywords"
                             :key="index" @click="search(item)">{{item}}
                        </div>
                    </div>
                </div>
                <div class="keyword-history" v-show="searchHistory.length > 0">
                    <div class="search-title">
                        搜索历史
                        <img src="../assets/image/clear.png" class="clear" @click="clearSearchHistory"/>
                    </div>
                    <div class="tags">
                        <div class="tag tag-removable" v-for="(item,index) in searchHistory" :key="index">
                            <span @click="search(item.data)">{{item.data}}</span>
                            <img src="../assets/image/close.png" class="close" @click="deleteHistory(item.data)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition :name="transitionName">
            <router-view class="child-view"/>
        </transition>
    </div>
</template>

<script>
    import {Search as VanSearch} from 'vant'
    import {getHostKeywords, getSongsDetail, searchSongByKeyword} from '../api/index'
    import {mapActions, mapState} from "vuex"

    export default {
        name: "Search",
        mounted() {
            this.init()
        },
        components: {
            VanSearch
        },
        methods: {
            init() {
                this.hostKeywords.length === 0 && this.load()
            },
            async load() {
                const {result} = await getHostKeywords()
                this.setHostKeywords(result['hots'].map(hot => hot.first))
            },
            search(keyword) {
                this.$router.push(
                    {
                        path: '/search/details',
                        query: {
                            keyword
                        }
                    })
                this.clearSearchSongs()
                this.searchSongs(keyword)
                this.addSearchHistory(keyword)
            },
            async searchSongs(keywords) {
                this.clearSearchSongs()
                const {result: {songs}} = await searchSongByKeyword(keywords)
                const details = await getSongsDetail(songs.map(songs => songs.id).join(','))
                this.setSearchSongs(details.songs)
            },
            deleteHistory(searchHistory) {
                this.deleteSearchHistory(searchHistory)
            },

            ...mapActions([
                'setHostKeywords', 'addSearchHistory', 'deleteSearchHistory',
                'clearSearchHistory', 'setSearchSongs', 'clearSearchSongs'
            ])
        },
        data() {
            return {
                keyword: '',
                searched: false,
                transitionName: ''
            }
        },
        computed: {
            ...mapState(['hostKeywords', 'searchHistory','currentMusic']),
        },
        // 接着在父组件内
        // watch $route 决定使用哪种过渡
        watch: {
            '$route'(to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import "../assets/style/variable.styl"
    .search-title
        margin-top 15px
        height 30px
        line-height 30px
        position relative
        text-align center

        .clear
            width 16px
            height 16px
            position absolute
            right 20px
            bottom 6px

    .tags
        text-align center
        display flex
        flex-direction row
        padding 15px 0
        flex-wrap wrap
        font-size 13px

        .tag
            margin: 10px 0 0 10px
            display flex
            flex-direction row
            align-items center
            background-color #ecf5ff
            height 32px
            padding 0 5px
            font-size 13px
            color #409eff
            border 1px solid #d9ecff
            border-radius 4px
            box-sizing: border-box
            white-space: nowrap

            span
                height 32px
                padding 0 10px
                line-height 32px

            .close
                padding 8px
                width 16px
                height 16px


</style>