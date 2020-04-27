import {get} from './request'

export const getRankList = async () => await get('/toplist/detail', {})

export const getRecommends = async params => await get('/top/playlist', params)

export const getArtists = async params => await get('/top/artists', params)

export const getHostKeywords = async () => await get('/search/hot', {})

export const searchSongByKeyword = async keywords => await get('/search', {keywords})

export const getSongLyric = async id => await get('/lyric', {id})

export const getPlaylistDetail = async id => await get('/playlist/detail', {id})

export const getSongsDetail = async ids => await get('/song/detail', {ids})

export const getSongsUrl = async ids => await get('/song/url', {id: ids})

export const getArtistTopList = async id => await get('/artist/top/song', {id})