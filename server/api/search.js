const { Character, Image } = require('../database/schema')
const { getRandom, formatDataSong } = require('./base')
const request = require('request')

const wyyUrl = 'https://api.imjad.cn/cloudmusic/'
const limit = 20
const requestType = [
  { type: 'song', name: '单曲' },
  { type: 'album', name: '专辑' },
  { type: 'artist', name: '歌手' },
  { type: 'playlist', name: '歌单' }
]
const searchType = [
  { type: 1, name: '单曲' },
  { type: 10, name: '专辑' },
  { type: 100, name: '歌手' },
  { type: 1000, name: '歌单' }
]

function ajax(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        throw new Error(err)
      }
      resolve(JSON.parse(body))
    })
  })
}

function formatDataWYY(data) {
  let formatData = {
    result: {
      data: [],
      count: 0
    },
    code: 200
  }
  const songs = data.result.songs || []
  const songLen = data.result.songCount
  formatData.result.count = songLen
  songs.forEach((song) => {
    const songID = song.id
    const songName = song.name
    const singerID = song.ar[0].id
    const singerName = song.ar[0].name
    formatData.result.data.push({
      songID, songName, singerID, singerName
    })
  })
  return formatData
}

const searchAPI = {
  searchByWYY(params) {
    const value = encodeURIComponent(params.value)
    const url = `${wyyUrl}?type=search&s=${value}&search_type=${searchType[0].type}`
    return new Promise((resolve, reject) => {
      ajax(url).then(res => {
        res = formatDataWYY(res)
        resolve(res)
      })
    })
  },
  getSongByIDWYY(params) {
    const id = encodeURIComponent(params.songID)
    const name = decodeURIComponent(params.songName)
    const url = `${wyyUrl}?type=song&id=${id}`
    return new Promise((resolve, reject) => {
      ajax(url).then(res => {
        let result = {
          code: 200,
          data: {}
        }
        res = res.data[0]
        res.songName = name
        result.data = formatDataSong(res, {
          id: 'id', name: 'songName', url: 'url'
        })
        resolve(result)
      })
    })
  },
  search(params) {
    return searchAPI.searchByWYY(params)
  },
  getSong(params) {
    return searchAPI.getSongByIDWYY(params)
  }
}

module.exports = searchAPI