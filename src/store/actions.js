import * as types from './mutation-types'
import {addHistoryPlayedListIntoStorage, getRandomNum} from '../common/utils'

export const setRecommends = ({commit}, data) => {
    commit(types.SET_RECOMMENDS, data)
}

export const clearRecommends = ({commit}) => {
    commit(types.CLEAR_RECOMMENDS)
}

export const setArtists = ({commit}, data) => {
    commit(types.SET_ARTISTS, data)
}

export const clearArtists = ({commit}) => {
    commit(types.CLEAR_ARTISTS)
}

export const setRankList = ({commit}, data) => {
    commit(types.SET_RANK_LIST, data)
}

export const clearRankList = ({commit}) => {
    commit(types.SET_RANK_LIST, [])
}

export const setHostKeywords = ({commit}, data) => {
    commit(types.SET_HOST_KEYWORDS, data)
}

export const addSearchHistory = ({commit}, data) => {
    commit(types.ADD_SEARCH_HISTORY, data)
}
export const deleteSearchHistory = ({commit}, data) => {
    commit(types.DELETE_SEARCH_HISTORY, data)
}
export const clearSearchHistory = ({commit}) => {
    commit(types.CLEAR_SEARCH_HISTORY)
}
export const setSearchSongs = ({commit}, data) => {
    commit(types.SET_SEARCH_SONGS, data)
}
export const clearSearchSongs = ({commit}) => {
    commit(types.CLEAR_SEARCH_SONGS)
}
const findIndex = (list, data) => list.findIndex((item) => item.id === data.id)


export const playThisMusic = ({commit, state}, data) => {
    let musicList = state.musicList.slice()
    // let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    // 记录当前歌曲
    // let currentMusic = musicList[currentIndex]
    // 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findIndex(musicList, data)
    // 因为是插入歌曲，所以索引+1
    currentIndex++
    // 插入这首歌到当前索引位置
    musicList.splice(currentIndex, 0, data)
    // 如果已经包含了这首歌
    if (fpIndex > -1) {
        // 如果当前插入的序号大于列表中的序号
        if (currentIndex > fpIndex) {
            musicList.splice(fpIndex, 1)
            currentIndex--
        } else {
            musicList.splice(fpIndex + 1, 1)
        }
    }

    // let currentSIndex = findIndex(sequenceList, currentMusic) + 1

    // let fsIndex = findIndex(sequenceList, song)

    // sequenceList.splice(currentSIndex, 0, song)
    //
    // if (fsIndex > -1) {
    //     if (currentSIndex > fsIndex) {
    //         sequenceList.splice(fsIndex, 1)
    //     } else {
    //         sequenceList.splice(fsIndex + 1, 1)
    //     }
    // }
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_MUSIC_LIST, musicList)
    commit(types.SET_IS_PLAYING, true)
    commit(types.SET_MINI_MODE, false)
    commit(types.SET_CURRENT_MUSIC, musicList[currentIndex])

}

export const setPlaylistDetail = ({commit}, data) => {
    commit(types.SET_PLAYLIST_DETAIL, data)
}

export const setArtistTopList = ({commit}, data) => {
    commit(types.SET_ARTIST_TOP_LIST, data)
}


export const clearPlaylistDetail = ({commit}) => {
    commit(types.CLEAR_PLAYLIST_DETAIL)
}

export const clearArtistTopList = ({commit}) => {
    commit(types.CLEAR_ARTIST_TOP_LIST)
}

export const setRankSongDetail = ({commit}, data) => {
    commit(types.SET_RANK_SONG_DETAIL, data)
}

export const clearRankSongDetail = ({commit}) => {
    commit(types.CLEAR_RANK_SONG_DETAIL)
}

export const setIsPlaying = ({commit}, data) => {
    commit(types.SET_IS_PLAYING, data)
}

export const playNextMusic = ({commit, state}) => {
    const {
        musicList,
        currentIndex,
        playMode = 0,//0 顺序，1 随机，2 单曲循环
    } = state
    let index = currentIndex
    if (playMode === 0) {
        index = currentIndex === musicList.length - 1 ? 0 : currentIndex + 1
    } else if (playMode === 1 && musicList.length > 1) {
        let random = getRandomNum()
        while (random === currentIndex) {
            random = getRandomNum()
        }
        index = random
    }
    commit(types.SET_CURRENT_MUSIC, musicList[index])
    commit(types.SET_CURRENT_TIME, 0)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_IS_PLAYING, true)

}
export const playOrPausePlayer = ({commit, state}) => {
    commit(types.SET_IS_PLAYING, !state.isPlaying)
}
export const addPlayedHistory = ({commit}, data) => {
    const historyPlayedList = addHistoryPlayedListIntoStorage(data);
    commit(types.SET_HISTORY_PLAYED_LIST, historyPlayedList)
}
export const setCurrentTime = ({commit}, data) => {
    commit(types.SET_CURRENT_TIME, data)
}
export const setMiniMode = ({commit}, data) => {
    commit(types.SET_MINI_MODE, data)
}

export const setPlayMode = ({commit}, data) => {
    commit(types.SET_PLAY_MODE, data)
}
export const setCurrentIndex = ({commit, state}, data) => {
    commit(types.SET_CURRENT_INDEX, data)
    commit(types.SET_CURRENT_MUSIC, state.musicList[data])
}