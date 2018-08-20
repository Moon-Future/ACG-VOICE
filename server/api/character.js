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
      Voice.find({key}, (err, res) => {
        if (err) {
          throw new Error()
          return false
        }
        
        res.forEach(ele => {
          ele.bgimg = '222'
          ele.coverimg = '333'
          ele['aaaaa'] = '666'
        })

        console.log(res)

        resolve(res)
        // characterAPI.getCharacterSkin({key}).then((skins) => {
        //   const len = skins.length
        //   res.forEach(ele => {
        //     const index = getRandom(0, len - 1, 1)[0]
        //     const skin = skins[index]
        //     ele.bgimg = (skin.src == '#' ? skin.srcOfficial : skin.src)
        //     ele.coverimg = (skin.src == '#' ? skin.srcOfficial : skin.src)
        //   })
        //   resolve(res)
        // })
      })
    })
  }
}

module.exports = characterAPI