import {DEFAULT_RECOMMEND_PAGE, DEFAULT_ARTIST_PAGE} from './constant'
import {getSearchHistoryByStorage, getHistoryPlayedListByStorage} from '../common/utils'

const state = {
    rankList: [],
    hostKeywords: [],
    recommends: DEFAULT_ARTIST_PAGE,
    artists: DEFAULT_RECOMMEND_PAGE,
    searchResults: [],
    searchHistory: getSearchHistoryByStorage(),
    playlistDetail: [],
    artistTopList: [],
    rankSongDetail: [],
    isPlaying: false,
    miniMode: true,
    musicList: [],
    currentIndex: -1,
    historyPlayedList: getHistoryPlayedListByStorage(),
    playMode: 0,//0 顺序，1 随机，2 单曲循环
    currentMusic: undefined,
    currentTime: 0
}
export default state