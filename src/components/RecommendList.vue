<template>
    <div class="recommend-list">
        <div class="recommend-title">推荐歌单</div>
        <van-pull-refresh v-model="refreshing" @refresh="load" v-if="hasData">
            <van-list
                    v-model="loading"
                    :finished="!recommends.hasNext"
                    finished-text="没有更多了"
                    @load="load">
                <van-row>
                    <van-col v-for="recommend in recommends.data" @click="gotoDetailPage(recommend)"
                             :key="recommend.id" :title="recommend.name" span="12">
                        <div class="item">
                            <div class="cover-image">
                                <img v-lazy="recommend.coverImgUrl"/>
                            </div>
                            <div class="desc van-multi-ellipsis--l2">
                                {{recommend.name}}
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </van-list>
        </van-pull-refresh>


    </div>
</template>

<script>
    import {getRecommends} from '../api'
    import {mapActions, mapState} from "vuex";
    import {List, PullRefresh, Row, Col} from 'vant';
    import {getPageParams} from "../common/utils";

    export default {
        name: "RecommendList",
        created() {
            this.init()
        },
        methods: {
            init() {
                this.recommends.data.length === 0 && this.load()
            },
            async load() {
                this.beforeLoading()
                if (this.refreshing) {
                    this.clearRecommends()
                }
                const nextPage = this.recommends.pageNum + 1
                const pageSize = this.recommends.pageSize
                const {playlists, more} = await getRecommends(getPageParams(nextPage, pageSize))
                this.afterLoading()
                this.setRecommends({
                    pageNum: nextPage,
                    pageSize: pageSize,
                    hasNext: more,
                    data: playlists
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
                'setRecommends', 'clearRecommends'
            ]),
            gotoDetailPage({id, name}) {
                this.$router.push({
                    path: `/recommend/${id}`, query: {name}
                }).catch(error => console.error(error))
            }
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
            [Row.name]: Row,
            [Col.name]: Col
        },
        computed: {
            ...mapState(['recommends']),
            hasData() {
                return this.recommends.data.length > 0
            }
        }

    }
</script>

<style scoped lang="stylus">
    @import "../assets/style/variable.styl"
    .recommend-list
        text-align center

        .recommend-title
            color $color-theme
            height 50px
            font-size 15px
            line-height 50px
            font-weight bolder
            text-align center

        .list
            display flex
            flex-direction row
            justify-content space-between
            align-items center
            flex-wrap nowrap


        .item
            padding 0 5%

            .cover-image
                position relative
                width 100%
                height 0
                padding-top 100%

                img
                    width 100%
                    height 100%
                    top 0
                    left 0
                    position absolute
                    border-radius 10px

            .desc
                font-size 14px
                height 55px
                padding 0 5px
                line-height 25px
                overflow: hidden;
                text-align left

</style>