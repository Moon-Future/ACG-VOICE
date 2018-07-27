const fs = require('fs')
const path = require('path')
const connect = require('./database/init')
const homeAPI = require('./api/home')
const characterAPI = require('./api/character')
connect()

const api = {
  getHomeSwiper() {
    return homeAPI.getSwiper()
  },
  getHomeHot() {
    return homeAPI.getHomeHot()
  },
  getCharacterList() {
    return characterAPI.getCharacterList()
  },
  getCharacterSkin(params) {
    return characterAPI.getCharacterSkin(params)
  },
  getCharacterAvatar(params) {
    return characterAPI.getCharacterAvatar(params)
  },
  getCharacterSkinAndAvatar(params) {
    let result = {}
    return new Promise((resolve, reject) => {
      api.getCharacterSkin(params).then((res) => {
        result.skin = res
        return api.getCharacterAvatar(params)
      }).then((res) => {
        result.avatar = res
        resolve(result)
      })
    })
  }
}

module.exports = api
