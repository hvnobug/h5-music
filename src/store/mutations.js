import * as types from './mutation-types'
import {DEFAULT_ARTIST_PAGE, DEFAULT_RECOMMEND_PAGE} from "./constant";
import {
    setSearchHistoryInStorage,
    deleteSearchHistoryInStorage,
    clearSearchHistoryInStorage,
} from '../common/utils'

const mutations = {
    [types.CLEAR_MUSIC_LIST](state, musicList) {
        state.musicList = musicList
    },
    [types.SET_PLAYLIST_DETAIL](state, playlistDetail) {
        state.playlistDetail = playlistDetail
    },
    [types.CLEAR_PLAYLIST_DETAIL](state) {
        state.playlistDetail = []
    },

    [types.SET_ARTIST_TOP_LIST](state, artistTopList) {
        state.artistTopList = artistTopList
    },

    [types.CLEAR_ARTIST_TOP_LIST](state) {
        state.artistTopList = []
    },
    [types.SET_RANK_SONG_DETAIL](state, rankSongDetail) {
        state.rankSongDetail = rankSongDetail
    },
    [types.CLEAR_RANK_SONG_DETAIL](state) {
        state.rankSongDetail = []
    },

    [types.SET_HOST_KEYWORDS](state, hostKeywords) {
        state.hostKeywords = hostKeywords
    },
    [types.SET_RANK_LIST](state, rankList) {
        state.rankList = rankList
    },
    [types.SET_RECOMMENDS](state, {
        pageNum, pageSize, hasNext, data
    }) {
        state.recommends = {
            pageNum, pageSize, hasNext, data: state.recommends.data.concat(data)
        }
    },
    [types.CLEAR_RECOMMENDS](state) {
        state.recommends = DEFAULT_RECOMMEND_PAGE
    },

    [types.SET_ARTISTS](state, {
        pageNum, pageSize, hasNext, data
    }) {
        state.artists = {
            pageNum, pageSize, hasNext, data: state.artists.data.concat(data)
        }
    },

    [types.CLEAR_ARTISTS](state) {
        state.artists = DEFAULT_ARTIST_PAGE
    },
    [types.SET_SEARCH_SONGS](state, searchResults) {
        state.searchResults = searchResults
    },
    [types.CLEAR_SEARCH_SONGS](state) {
        state.searchResults = []
    },

    [types.ADD_SEARCH_HISTORY](state, data) {
        state.searchHistory = setSearchHistoryInStorage(data)
    },
    [types.DELETE_SEARCH_HISTORY](state, data) {
        state.searchHistory = deleteSearchHistoryInStorage(data)
    },

    [types.CLEAR_SEARCH_HISTORY](state, data) {
        clearSearchHistoryInStorage(data)
        state.searchHistory = []
    },

    [types.SET_IS_PLAYING](state, data) {
        state.isPlaying = data
    },

    [types.SET_MINI_MODE](state, data) {
        state.miniMode = data
    },

    [types.SET_MUSIC_LIST](state, data) {
        state.musicList = data
    },
    [types.SET_CURRENT_INDEX](state, data) {
        state.currentIndex = data
    },
    [types.SET_HISTORY_PLAYED_LIST](state, data) {
        state.historyPlayedList = data
    },
    [types.SET_PLAY_MODE](state, data) {
        state.playMode = data
    },
    [types.SET_CURRENT_MUSIC](state, data) {
        state.currentMusic = data
    },
    [types.SET_CURRENT_TIME](state, data) {
        state.currentTime = data
    },


}

export default mutations