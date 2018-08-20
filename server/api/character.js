const { Character, Image, Voice } = require('../database/schema')
const { getRandom } = require('./base')

const characterAPI = {
  getCharacterList() {
    return new Promise((resolve, reject) => {
      Character.find({}, (err, res) => {
        if (err) {
          throw new Error()
          return false
        }
        let result = []
        res.forEach((ele) => {
          result.push({
            name: ele.name,
            nickName: ele.nickName,
            from: ele.from,
            avatar: ele.avatar === '#' ? ele.avatarOfficial : ele.avatar,
            firstLetter: ele.spell.substr(0, 1).toLocaleUpperCase(),
            key: ele.key
          })
        })
        resolve(result)
      })
    })
  },
  getCharacterSkin(params) {
    let key = params.key
    return new Promise((resolve, reject) => {
      Image.find({key: key}, (err, res) => {
        if (err) {
          throw new Error()
          return false
        }
        resolve(res)
      })
    })
  },
  getCharacterAvatar(params) {
    let key = params.key
    return new Promise((resolve, reject) => {
      Character.find({key}, (err, res) => {
        if (err) {
          throw new Error()
          return false
        }
        resolve(res)
      })
    })
  },
  getCharacterVoice(params) {
    let key = params.key
    return new Promise((resolve, reject) => {
      Voice.find({key}).lean().exec((err, res) => {
        if (err) {
          throw new Error()
          return false
        }
        characterAPI.getCharacterSkin({key}).then((skins) => {
          const len = skins.length
          res.forEach(ele => {
            const index = getRandom(0, len - 1, 1)[0]
            const skin = skins[index]
            ele.bgimg = (skin.src == '#' ? skin.srcOfficial : skin.src)
            ele.coverimg = (skin.src == '#' ? skin.srcOfficial : skin.src)
          })
          resolve(res)
        })
      })
    })
  }
}

module.exports = characterAPI

/*
  Voice.find({key}, (err, res) => {}) mongoose 查找得到的数据不能修改
解决方式：
  1:
    Voice.find({key}).lean().exec((err, res) => {})
  2: 
    Voice.find({key}, (err, res) => {
      res = res.map(function (ele) {
        return ele.toObject();
      })
    })
*/