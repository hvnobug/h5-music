export const getPageParams = (pageNum, pageSize) => {
    return {
        limit: pageSize,
        offset: (pageNum - 1) * pageSize
    }
}
const searchHistoryKey = 'music-app-search-history'
const historyPlayedListKey = 'history-played-list'
export const getSearchHistoryByStorage = () => {
    const searchHistories = localStorage.getItem(searchHistoryKey)
    return searchHistories ? JSON.parse(searchHistories) : []
}

export const setSearchHistoryInStorage = data => {
    const searchHistory = getSearchHistoryByStorage();
    const newItem = {
        timestamp: new Date().getTime(), data
    }
    if (searchHistory.length > 0) {
        const index = searchHistory.findIndex(item => item.data === data);
        if (index >= 0) {
            searchHistory[index] = newItem
        } else {
            searchHistory.push(newItem)
        }
    } else {
        searchHistory.push(newItem)
    }
    searchHistory.sort((s1, s2) => s2.timestamp - s1.timestamp)
    localStorage.setItem(searchHistoryKey, JSON.stringify(searchHistory))
    return searchHistory
}

export const deleteSearchHistoryInStorage = data => {
    let searchHistory = getSearchHistoryByStorage();
    const index = searchHistory.findIndex(item => item.data === data)
    if (index >= 0) {
        searchHistory.splice(index, 1)
        localStorage.setItem(searchHistoryKey, JSON.stringify(searchHistory))
    }
    return searchHistory
}

export const getHistoryPlayedListByStorage = () => {
    const historyPlayedList = localStorage.getItem(historyPlayedListKey)
    return historyPlayedList ? JSON.parse(historyPlayedList) : []
}

export const addHistoryPlayedListIntoStorage = data => {
    const historyPlayedList = getHistoryPlayedListByStorage();
    historyPlayedList.unshift(data)
    localStorage.setItem(historyPlayedListKey, JSON.stringify(historyPlayedList))
    return historyPlayedList
}

export const clearSearchHistoryInStorage = () => localStorage.setItem(searchHistoryKey, '[]')

export const getMusicUrlById = id => `http://music.163.com/song/media/outer/url?id=${id}.mp3`

export const musicMap = musics => musics.map(({id, ar, al: {picUrl}, name, dt}) => ({
    name, cover: picUrl, id,
    url: getMusicUrlById(id),
    artist: ar[0].name,
    duration: dt / 1000,
    currentTime: 0
}))

export const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)