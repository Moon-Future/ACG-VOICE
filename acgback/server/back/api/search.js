const { Character, Image } = require('../database/schema')
const { ajax, getRandom, formatDataSong } = require('./base')
const wyyAPI = require('./wyyAPI')

const searchAPI = {
  search(params) {
    return wyyAPI.search(params)
  },
  getVoice(params) {
    let albumData, voiceData;
    return new Promise((resolve, reject) => {
      wyyAPI.getAlbumByID(params).then(res => {
        albumData = res
        return wyyAPI.getVoiceByID(params)
      }).then(res => {
        voiceData = res
        voiceData.data.coverimg = albumData.blurPicUrl || albumData.picUrl
        resolve(voiceData)
      })
    })
  }
}

module.exports = searchAPI