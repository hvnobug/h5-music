const DEFAULT_PAGE_DATA = {
    pageNum: 0,
    pageSize: 20,
    hasNext: false,
    data: []
}
export const DEFAULT_RECOMMEND_PAGE = DEFAULT_PAGE_DATA

export const DEFAULT_ARTIST_PAGE = Object.assign(DEFAULT_PAGE_DATA, {pageSize: 30})

export const DEFAULT_SONG_PAGE = Object.assign(DEFAULT_PAGE_DATA, {pageSize: 30})

export const DEFAULT_SEARCH_RESULT = {...DEFAULT_SONG_PAGE, keywords: ''}