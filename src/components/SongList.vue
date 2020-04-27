<template>
    <div class="song-list" :style="{height: height}">
        <div class="song" v-for="(song,index) in songs" :key="song.id" @click="addMusicList(song)">
            <div class="cover-image">
                <div v-lazy-container="{ selector: 'img', loading: 'http://i.loli.net/2020/04/24/Jlm28weX7IgvcBs.png' }">
                    <img :data-src="song.cover ? song.cover : icon(index)" class="music-icon"/>
                </div>
            </div>
            <div class="info">
                <span class="name van-ellipsis">{{song.name}}</span>
                <span class="author van-ellipsis">{{song.artist}}</span>
            </div>
        </div>
    </div>

</template>

<script>

    import {mapActions} from "vuex";
    import {Toast} from 'vant';

    export default {
        name: "SongList",
        props: ['songs', 'rank'],
        methods: {
            beforeLoading() {
                this.loading = true
            },
            afterLoading() {
                this.loading = false
                this.refreshing = false
            },
            icon(index) {
                let iconName
                if (this.rank !== undefined) {
                    iconName = index === 0 ? '1' : index === 1 ? '2' : index === 2 ? '3' : 'music'
                } else {
                    iconName = 'music'
                }
                return require(`../assets/image/${iconName}.png`)
            },
            addMusicList({id, name, artist, cover, url, duration}) {
                this.playThisMusic({id, name, artist, cover, url, duration})
                Toast('成功添加到播放列表');
            },
            ...mapActions([
                'playThisMusic'
            ])
        },
        data() {
            return {
                initialized: false,
                loading: false,
                refreshing: false
            };
        },
        computed: {
            hasData() {
                return this.songs.length > 0
            },
            height() {
                return 'calc(100% - ' + (this.$store.state.currentMusic ? 130 : 60) + 'px)'
            },
        }
    }
</script>

<style scoped lang="stylus">
    .song-list
        overflow scroll

        .song
            display flex
            flex-direction row
            align-items center
            margin-top 10px

            .music-icon
                border-radius 5px
                margin 0 10px
                width 50px
                height 50px

            .info
                display flex
                flex-direction column
                text-align left
                width 100%

            .name
                font-size 14px
                line-height 20px
                width calc(100% - 80px)

            .author
                font-size 12px
                color rgba(255, 255, 255, .6)
                width calc(100% - 80px)
</style>