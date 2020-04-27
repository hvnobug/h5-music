<template>
    <div class="rank-list">
        <van-pull-refresh v-model="refreshing" @refresh="load" v-if="hasData">
            <van-list
                    v-model="loading"
                    finished
                    @load="load">
                <van-row>
                    <van-col v-for="rank in rankList" :key="rank.id" :title="rank.name" span="24" @click="gotoDetailPage(rank)">
                        <div class="item">
                            <div v-lazy-container="{ selector: 'img', loading: 'http://i.loli.net/2020/04/24/tsSKuCe8fFyp3l4.jpg' }">
                                <img :data-src="rank.coverImgUrl" class="cover"/>
                            </div>
                            <div class="details">
                                <div class="name">{{rank.name}}-{{rank.updateFrequency}}</div>
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import {getRankList} from "../api";
    import {mapActions, mapState} from "vuex";
    import {Cell, Col, List, PullRefresh, Row} from "vant";

    export default {
        name: "RankList",
        created() {
            this.init()
        },
        methods: {
            gotoDetailPage({id, name}) {
                this.$router.push({
                    path: `/rank/${id}`, query: {name}
                }).catch(error => console.error(error))
            },
            init() {
                this.rankList.length === 0 && this.load()
            },
            async load() {
                this.beforeLoading()
                if (this.refreshing) {
                    this.clearRankList()
                }
                const {list} = await getRankList()
                this.afterLoading()
                this.setRankList(list)
            },
            beforeLoading() {
                this.loading = true
            },
            afterLoading() {
                this.loading = false
                this.refreshing = false
            },
            ...mapActions([
                'setRankList', 'clearRankList'
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
            ...mapState(['rankList']),
            hasData() {
                return this.rankList.length > 0
            }
        }
    }
</script>

<style scoped lang="stylus">
    .rank-list
        position relative

        .item
            display flex
            flex-direction row
            padding 20px 0 0 20px


            .cover
                width 50px
                height 50px
                border 10px

            .details
                font-size 14px
                margin-left 10px
                display flex
                flex-direction column
                justify-content space-around
                text-align left

</style>