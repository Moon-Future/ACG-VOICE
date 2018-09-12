const { Character, Image } = require('../database/schema')
const { ajax, getRandom, formatDataSong } = require('./base')

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

function formatDataWYY(data) {
  let formatData = {
    result: {
      data: [],
      count: 0
    },
    code: 200
  }
  const voices = data.result.songs || []
  const voiceLen = data.result.songCount
  formatData.result.count = voiceLen
  voices.forEach((voice) => {
    const voiceID = voice.id
    const voiceName = voice.name
    const characterID = voice.ar[0].id
    const characterName = voice.ar[0].name
    const album = voice.al.id
    formatData.result.data.push({
      voiceID, voiceName, characterID, characterName, album: album
    })
  })
  return formatData
}

const wyyAPI = {
  search(params) {
    const value = encodeURIComponent(params.value)
    const url = `${wyyUrl}?type=search&s=${value}&search_type=${searchType[0].type}`
    return new Promise((resolve, reject) => {
      ajax(url).then(res => {
        res = formatDataWYY(res)
        resolve(res)
      })
    })
  },
  getVoiceByID(params) {
    const id = encodeURIComponent(params.voiceID)
    const name = decodeURIComponent(params.voiceName)
    const url = `${wyyUrl}?type=song&id=${id}`
    return new Promise((resolve, reject) => {
      ajax(url).then(res => {
        let result = {
          code: 200,
          data: {}
        }
        res = res.data[0]
        res.voiceName = name
        res.characterName = params.characterName
        res.characterID = params.characterID
        result.data = formatDataSong(res, {
          id: 'id', name: 'voiceName', src: 'url', character: 'characterName', characterID: 'characterID'
        })
        resolve(result)
      })
    })
  },
  getCharacterByID(params) {
    const id = encodeURIComponent(params.characterID)
    const url = `${wyyUrl}?type=artist&id=${id}`
    return new Promise((resolve, reject) => {
      ajax(url).then(res => {
        resolve(res)
      })
    })
  },
  getAlbumByID(params) {
    const id = encodeURIComponent(params.album)
    const url = `${wyyUrl}?type=album&id=${id}`
    return new Promise((resolve, reject) => {
      ajax(url).then(res => {
        resolve(res.album)
      })
    })
  }
}

module.exports = wyyAPI