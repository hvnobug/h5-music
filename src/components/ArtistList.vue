<template>
    <div class="artist-list">
        <van-pull-refresh v-model="refreshing" @refresh="load" v-if="hasData">
            <van-list
                    v-model="loading"
                    :finished="!artists.hasNext"
                    finished-text="没有更多了"
                    @load="load">
                <van-row>
                    <van-col v-for="artist in artists.data" @click="gotoTopPage(artist)"
                             :key="artist.id" :title="artist.name" span="12">
                        <div class="item">
                            <div v-lazy-container="{ selector: 'img', loading: 'http://i.loli.net/2020/04/24/uxWB4b2dc9zlpOa.jpg' }">
                                <img :data-src="artist.picUrl" class="avatar"/>
                            </div>
                            <span class="name">{{artist.name}}</span>
                        </div>
                    </van-col>
                </van-row>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import {getArtists} from "../api";
    import {getPageParams} from "../common/utils";
    import {mapActions, mapState} from "vuex";
    import {Cell, Col, List, PullRefresh, Row} from "vant";

    export default {
        name: "ArtistList",
        created() {
            this.init()
        },
        methods: {
            gotoTopPage(artist) {
                const {id, name} = artist
                this.$router.push({
                    path: `/artist/${id}`, query: {name}
                }).catch(error => console.error(error))
            },
            init() {
                this.artists.data.length === 0 && this.load()
            },
            async load() {
                this.beforeLoading()
                if (this.refreshing) {
                    this.clearArtists()
                }
                const nextPage = this.artists.pageNum + 1
                const pageSize = this.artists.pageSize
                const {
                    artists, more
                } = await getArtists(getPageParams(nextPage, pageSize))
                this.afterLoading()
                this.setArtists({
                    pageNum: nextPage,
                    pageSize: pageSize,
                    hasNext: more,
                    data: artists
                })
            },
            beforeLoading() {
                this.loading = true
            },
            afterLoading() {
                this.loading = false
                this.refreshing = false
            },
            ...mapActions([
                'setArtists', 'clearArtists'
            ])
        },
        data() {
            return {
                initialized: false,
                loading: false,
                refreshing: false
            };
        },
        components: {
            [List.name]: List,
            [PullRefresh.name]: PullRefresh,
            [Cell.name]: Cell,
            [Row.name]: Row,
            [Col.name]: Col
        },
        computed: {
            ...mapState(['artists']),
            hasData() {
                return this.artists.data.length > 0
            }
        }
    }
</script>

<style scoped lang="stylus">
    .artist-list
        position relative

        .item
            display flex
            flex-direction row
            align-items center
            padding 20px 0 0 10px

            .avatar
                width 60px
                height 60px
                border-radius 50%

            .name
                margin-left: 15px
                font-size 13px
</style>